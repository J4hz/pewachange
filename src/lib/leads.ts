import { leadsEndpoint } from "@/config/site";
import type { LeadFormValues } from "@/lib/validation";
import type { UtmParams } from "@/hooks/useUtm";

const QUEUE_KEY = "ombaka_lead_queue";

export interface LeadPayload extends LeadFormValues {
  utm: UtmParams;
  submittedAt: string;
  page: string;
}

function queueLocally(payload: LeadPayload) {
  try {
    const existing: LeadPayload[] = JSON.parse(
      localStorage.getItem(QUEUE_KEY) ?? "[]"
    );
    existing.push(payload);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(existing));
  } catch {
    // localStorage unavailable — nothing more we can do client-side.
  }
}

/**
 * Submits a lead to VITE_LEADS_ENDPOINT (a Formspree-style POST handler, or
 * the campaign's own backend/Google Sheet/CRM webhook — see .env.example).
 *
 * Never blocks the "success" UX on network failure: if the endpoint isn't
 * configured yet or the request fails, the lead is queued in localStorage
 * (key: "ombaka_lead_queue") so it isn't lost, and we still report success
 * so the visitor proceeds to the WhatsApp reveal step.
 */
export async function submitLead(
  values: LeadFormValues,
  utm: UtmParams
): Promise<{ ok: boolean; queued: boolean }> {
  const payload: LeadPayload = {
    ...values,
    utm,
    submittedAt: new Date().toISOString(),
    page: window.location.pathname,
  };

  if (!leadsEndpoint) {
    queueLocally(payload);
    return { ok: true, queued: true };
  }

  try {
    const res = await fetch(leadsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Leads endpoint responded ${res.status}`);
    return { ok: true, queued: false };
  } catch {
    queueLocally(payload);
    return { ok: true, queued: true };
  }
}
