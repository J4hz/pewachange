import { contactEndpoint } from "@/config/site";
import { postSubmission, submissionId } from "@/lib/submit";
import { queueSubmission, CONTACT_QUEUE_KEY } from "@/lib/queue";
import type { ContactFormValues } from "@/lib/validation";

export interface ContactPayload extends ContactFormValues {
  /** De-duplication key, so a queued re-send can't create a second row. */
  id: string;
  /** Lets one endpoint receive both forms and route them to the right sheet. */
  form: "contact";
  submittedAt: string;
}

/**
 * Submits the Get Involved contact form to VITE_CONTACT_ENDPOINT, which
 * should ultimately deliver to the campaign inbox (see contact.email in
 * config/site.ts). Unlike submitLead, this never claims success it can't
 * back up: if the endpoint isn't configured or the request fails, the
 * message is still queued for a later retry (see lib/queue.ts) so it isn't
 * lost, but the caller is told the send failed so the UI can show a real
 * error and the phone/email fallback.
 */
export async function submitContactMessage(
  values: ContactFormValues
): Promise<{ ok: boolean }> {
  const payload: ContactPayload = {
    ...values,
    id: submissionId(),
    form: "contact",
    submittedAt: new Date().toISOString(),
  };

  if (!contactEndpoint) {
    queueSubmission(CONTACT_QUEUE_KEY, payload);
    return { ok: false };
  }

  try {
    await postSubmission(contactEndpoint, payload);
    return { ok: true };
  } catch {
    queueSubmission(CONTACT_QUEUE_KEY, payload);
    return { ok: false };
  }
}
