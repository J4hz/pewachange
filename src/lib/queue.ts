import { leadsEndpoint, contactEndpoint } from "@/config/site";
import { postSubmission } from "@/lib/submit";

/**
 * Offline/misconfiguration safety net for form submissions.
 *
 * When a submission can't be delivered — the endpoint isn't configured yet,
 * the visitor is offline, the request fails — it is parked in localStorage
 * instead of being dropped. `flushQueuedSubmissions()` runs on every app
 * load and re-sends anything still parked, so a submission made before the
 * endpoint went live is delivered the next time that visitor opens the site.
 *
 * Re-sending is safe: every payload carries an `id` (see lib/submit.ts) and
 * the receiving Apps Script ignores ids it has already written.
 */

export const LEAD_QUEUE_KEY = "ombaka_lead_queue";
export const CONTACT_QUEUE_KEY = "ombaka_contact_queue";

/**
 * Upper bound on parked submissions per queue. This only ever matters on a
 * shared or kiosk device where many people submit while the endpoint is
 * down; the cap stops localStorage filling up (a quota error there would
 * throw on every later write). We keep the newest and drop the oldest.
 */
const MAX_QUEUED = 50;

function readQueue(key: string): unknown[] {
  try {
    const raw = localStorage.getItem(key);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Unavailable or corrupt — treat as empty rather than breaking the form.
    return [];
  }
}

function writeQueue(key: string, items: unknown[]) {
  try {
    if (items.length === 0) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // localStorage unavailable — nothing more we can do client-side.
  }
}

/** Parks one undeliverable submission for a later flush. */
export function queueSubmission(key: string, payload: unknown) {
  const items = readQueue(key);
  items.push(payload);
  writeQueue(key, items.slice(-MAX_QUEUED));
}

async function flushQueue(key: string, endpoint: string) {
  if (!endpoint) return;

  const pending = readQueue(key);
  if (pending.length === 0) return;

  // Clear first, then re-park only what still fails. Doing it this way means
  // a submission sent while the flush is in flight can't be wiped by our
  // write-back at the end.
  writeQueue(key, []);

  const stillFailing: unknown[] = [];
  for (const item of pending) {
    try {
      await postSubmission(endpoint, item);
    } catch {
      stillFailing.push(item);
    }
  }

  if (stillFailing.length > 0) {
    writeQueue(key, [...stillFailing, ...readQueue(key)].slice(-MAX_QUEUED));
  }
}

/**
 * Re-sends anything parked by an earlier visit. Called once on app load
 * (see App.tsx); failures stay queued for the next visit, and nothing here
 * is allowed to surface an error to the visitor.
 */
export async function flushQueuedSubmissions(): Promise<void> {
  await flushQueue(LEAD_QUEUE_KEY, leadsEndpoint);
  await flushQueue(CONTACT_QUEUE_KEY, contactEndpoint);
}
