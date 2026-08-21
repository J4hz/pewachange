/**
 * Shared POST plumbing for the two forms on the site (lead capture and the
 * Get Involved contact form). Both send the same shape of thing — a JSON
 * payload to a configured endpoint — so the transport lives here and the
 * per-form modules keep only their own success/failure semantics.
 */

/**
 * Stable per-submission id, used to de-duplicate on the receiving end.
 *
 * This matters because of the retry queue (see lib/queue.ts): a request can
 * reach the endpoint and write a row, then fail on the way back (a dropped
 * connection, a CORS response we can't read). The submission gets queued and
 * re-sent later, and without an id the campaign would see the same person
 * twice. The Apps Script in scripts/leads-apps-script.gs skips any id it has
 * already recorded, which makes re-sending safe.
 */
export function submissionId(): string {
  // randomUUID needs a secure context; localhost and the live https site both
  // qualify, but fall back rather than throw anywhere that doesn't.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Google Apps Script Web Apps do not answer the CORS preflight (OPTIONS)
 * request that a `Content-Type: application/json` POST triggers, so a JSON
 * POST to one fails in the browser before it is ever delivered. Sending
 * `text/plain` keeps the request a CORS "simple request", which skips the
 * preflight entirely — the body is still JSON, and the script parses
 * `e.postData.contents` itself.
 *
 * Any other endpoint (Formspree, a campaign backend) gets a normal JSON
 * content type, so switching providers needs no code change here.
 */
function contentTypeFor(endpoint: string): string {
  try {
    const { hostname } = new URL(endpoint);
    if (hostname === "script.google.com" || hostname.endsWith(".script.google.com")) {
      return "text/plain;charset=utf-8";
    }
  } catch {
    // Not a parseable absolute URL (e.g. a same-origin path) — treat as JSON.
  }
  return "application/json";
}

/**
 * POSTs `payload` as JSON. Throws if the submission wasn't accepted, which is
 * the caller's signal to queue it for a later retry.
 *
 * Checking the HTTP status alone isn't enough: an Apps Script Web App answers
 * 200 even when it refuses the write (it can't get the script lock, or it
 * threw), reporting the real outcome as `{"ok": false}` in the body. Treating
 * that as success would silently drop the submission. A body we can't read or
 * parse is not treated as failure — plenty of endpoints return an empty or
 * non-JSON 200 — so only an explicit `ok: false` counts against it.
 */
export async function postSubmission(
  endpoint: string,
  payload: unknown
): Promise<void> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": contentTypeFor(endpoint),
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Endpoint responded ${res.status}`);

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    return; // Empty or non-JSON 200 — take the status at its word.
  }

  if (body && typeof body === "object" && (body as { ok?: unknown }).ok === false) {
    const { error } = body as { error?: unknown };
    throw new Error(`Endpoint rejected submission${error ? `: ${error}` : ""}`);
  }
}
