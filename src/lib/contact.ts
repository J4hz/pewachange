import { contactEndpoint } from "@/config/site";
import type { ContactFormValues } from "@/lib/validation";

const QUEUE_KEY = "ombaka_contact_queue";

export interface ContactPayload extends ContactFormValues {
  submittedAt: string;
}

function queueLocally(payload: ContactPayload) {
  try {
    const existing: ContactPayload[] = JSON.parse(
      localStorage.getItem(QUEUE_KEY) ?? "[]"
    );
    existing.push(payload);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(existing));
  } catch {
    // localStorage unavailable — nothing more we can do client-side.
  }
}

/**
 * Submits the Get Involved contact form to VITE_CONTACT_ENDPOINT, which
 * should ultimately deliver to the campaign inbox (see contact.email in
 * config/site.ts). Unlike submitLead, this never claims success it can't
 * back up: if the endpoint isn't
 * configured or the request fails, the message is still queued locally
 * (key: "ombaka_contact_queue") so it isn't lost, but the caller is told the
 * send failed so the UI can show a real error and the phone/email fallback.
 */
export async function submitContactMessage(
  values: ContactFormValues
): Promise<{ ok: boolean }> {
  const payload: ContactPayload = {
    ...values,
    submittedAt: new Date().toISOString(),
  };

  if (!contactEndpoint) {
    queueLocally(payload);
    return { ok: false };
  }

  try {
    const res = await fetch(contactEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Contact endpoint responded ${res.status}`);
    return { ok: true };
  } catch {
    queueLocally(payload);
    return { ok: false };
  }
}
