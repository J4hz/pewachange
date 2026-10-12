import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { unsubscribeSchema, type UnsubscribeFormValues } from "@/lib/validation";
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
  } = useForm<UnsubscribeFormValues>({ resolver: zodResolver(unsubscribeSchema) });

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

      <section className="bg-cream-soft py-16 sm:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-berry">
            Unsubscribe
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-ink">
            Stop campaign updates
          </h1>
          <p className="mt-4 text-ink/80">
            Enter the phone number you signed up with and we'll stop sending
            you campaign SMS and email. You can also reply <strong>STOP</strong>{" "}
            to any of our texts, or email{" "}
            <a href={`mailto:${contact.email}`} className="text-berry underline">
              {contact.email}
            </a>
            . To leave a ward WhatsApp group, just exit the group in WhatsApp.
          </p>

          {status === "success" ? (
            <div className="mt-8 flex items-start gap-3 border-2 border-ink bg-paper p-6 shadow-stamp-sm">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-berry" aria-hidden="true" />
              <p className="text-ink/80">
                Done. That number won't receive any more campaign updates. It
                can take up to 48 hours for messages already scheduled to stop.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-4">
              <div>
                <label
                  htmlFor="unsubscribe-phone"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink/70"
                >
                  Phone number
                </label>
                <input
                  id="unsubscribe-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="07XX XXX XXX"
                  className="w-full border-2 border-ink/20 bg-white px-4 py-3 text-base text-ink placeholder-ink/40 focus:outline-none focus:ring-2 focus:ring-berry focus:ring-offset-2 focus:ring-offset-paper"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-berry">{errors.phone.message}</p>
                )}
              </div>

              {status === "error" && (
                <p className="flex items-start gap-2 text-sm text-berry">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  We couldn't process that just now. Please reply STOP to any of
                  our texts or email {contact.email} and we'll remove you.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary w-full"
              >
                {status === "submitting" && (
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                )}
                Unsubscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
