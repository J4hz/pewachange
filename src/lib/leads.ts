import { leadsEndpoint } from "@/config/site";
import { postSubmission, submissionId } from "@/lib/submit";
import { queueSubmission, LEAD_QUEUE_KEY } from "@/lib/queue";
import type { LeadFormValues } from "@/lib/validation";
import type { UtmParams } from "@/hooks/useUtm";

export interface LeadPayload extends LeadFormValues {
  /** De-duplication key, so a queued re-send can't create a second row. */
  id: string;
  /** Lets one endpoint receive both forms and route them to the right sheet. */
  form: "lead";
  utm: UtmParams;
  submittedAt: string;
  page: string;
}

/**
 * Submits a lead to VITE_LEADS_ENDPOINT (the Google Apps Script Web App
 * described in the README, a Formspree endpoint, or the campaign's own
 * backend/CRM webhook — see .env.example).
 *
 * Never blocks the "success" UX on network failure: if the endpoint isn't
 * configured yet or the request fails, the lead is queued (see lib/queue.ts)
 * and re-sent on a later visit, and we still report success so the visitor
 * proceeds to the WhatsApp reveal step.
 */
export async function submitLead(
  values: LeadFormValues,
  utm: UtmParams
): Promise<{ ok: boolean; queued: boolean }> {
  const payload: LeadPayload = {
    ...values,
    id: submissionId(),
    form: "lead",
    utm,
    submittedAt: new Date().toISOString(),
    page: window.location.pathname,
  };

  if (!leadsEndpoint) {
    queueSubmission(LEAD_QUEUE_KEY, payload);
    return { ok: true, queued: true };
  }

  try {
    await postSubmission(leadsEndpoint, payload);
    return { ok: true, queued: false };
  } catch {
    queueSubmission(LEAD_QUEUE_KEY, payload);
    return { ok: true, queued: true };
  }
}
