import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import {
  unsubscribeSchema,
  type UnsubscribeFormValues,
} from "@/lib/validation";
import { postSubmission, submissionId } from "@/lib/submit";
import { contact, leadsEndpoint } from "@/config/site";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Self-service opt-out backing the "Unsubscribe anytime" promise on the lead
 * form. Posts the phone number to the same Apps Script as signups, which
 * marks that number's rows Unsubscribed. Unlike signups this is not queued
 * for retry: someone opting out needs to know whether it worked, so a failure
 * is shown with the email/SMS fallback instead.
 */
export default function Unsubscribe() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UnsubscribeFormValues>({
    resolver: zodResolver(unsubscribeSchema),
  });

  const onSubmit = async (values: UnsubscribeFormValues) => {
    setStatus("submitting");
    try {
      if (!leadsEndpoint) throw new Error("No endpoint configured");
      await postSubmission(leadsEndpoint, {
        form: "unsubscribe",
        id: submissionId(),
        phone: values.phone,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <SEO
        title="Unsubscribe"
        description="Stop receiving campaign updates by SMS and email."
        path="/unsubscribe"
      />

      <section className="bg-paper pb-24 pt-12 sm:pt-20">
        <div className="shell">
          <div className="max-w-xl">
            <h1 className="heading text-5xl">Stop campaign updates</h1>
            <p className="mt-5 text-lg text-ink/80">
              Enter the phone number you signed up with and we'll stop sending
              you campaign SMS and email. You can also reply{" "}
              <strong>STOP</strong> to any of our texts, or email{" "}
              <a href={`mailto:${contact.email}`} className="link">
                {contact.email}
              </a>
              . To leave a ward WhatsApp group, just exit the group in WhatsApp.
            </p>

            {status === "success" ? (
              <div
                role="status"
                className="mt-10 flex items-start gap-3 rounded-sheet bg-cream p-6"
              >
                <CheckCircle2
                  className="mt-0.5 h-6 w-6 shrink-0 text-berry"
                  aria-hidden="true"
                />
                <p className="text-ink/80">
                  Done. That number won't receive any more campaign updates. It
                  can take up to 48 hours for messages already scheduled to
                  stop.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-10 space-y-5 rounded-sheet bg-cream p-6 sm:p-8"
              >
                <div>
                  <label htmlFor="unsubscribe-phone" className="field-label">
                    Phone number
                  </label>
                  <input
                    id="unsubscribe-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="07XX XXX XXX"
                    className="field"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="field-error">{errors.phone.message}</p>
                  )}
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="flex items-start gap-2 text-sm font-medium text-berry"
                  >
                    <AlertTriangle
                      className="mt-0.5 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    We couldn't process that just now. Please reply STOP to any
                    of our texts or email {contact.email} and we'll remove you.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary w-full"
                >
                  {status === "submitting" && (
                    <Loader2
                      className="h-5 w-5 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Unsubscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
