import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, MessageCircle, Loader2 } from "lucide-react";
import { leadSchema, helpOptions, type LeadFormValues } from "@/lib/validation";
import { submitLead } from "@/lib/leads";
import { useUtm } from "@/hooks/useUtm";
import { wards, wardBySlug, type WardSlug } from "@/data/wards";

interface LeadCaptureFormProps {
  /** Pre-select a ward, e.g. from the homepage ward selector. */
  defaultWard?: WardSlug;
  /** Visual variant: "light" for cream/white surfaces, "on-dark" for the berry CTA band. */
  variant?: "light" | "on-dark";
  className?: string;
}

export function LeadCaptureForm({
  defaultWard,
  variant = "light",
  className = "",
}: LeadCaptureFormProps) {
  const utm = useUtm();
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [selectedWard, setSelectedWard] = useState<WardSlug | undefined>(
    defaultWard
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      ward: defaultWard,
      email: "",
    },
  });

  const onSubmit = async (values: LeadFormValues) => {
    setStatus("submitting");
    setSelectedWard(values.ward);
    await submitLead(values, utm);
    // Always resolve to success: submitLead never lets a lead disappear —
    // it queues locally if the real endpoint isn't reachable yet.
    setStatus("success");
  };

  const isOnDark = variant === "on-dark";
  const labelClass = isOnDark ? "field-label-on-dark" : "field-label";
  const inputClass = isOnDark ? "field-on-dark" : "field";
  const errorClass = isOnDark ? "field-error-on-dark" : "field-error";

  if (status === "success") {
    const ward = selectedWard ? wardBySlug(selectedWard) : undefined;
    return (
      <div
        role="status"
        className={`text-center ${isOnDark ? "text-paper" : "text-ink"} ${className}`}
      >
        <CheckCircle2
          className={`mx-auto mb-3 h-10 w-10 ${
            isOnDark ? "text-paper" : "text-berry"
          }`}
          aria-hidden="true"
        />
        <p className="heading text-2xl" style={isOnDark ? { color: "inherit" } : undefined}>
          You&rsquo;re on the list.
        </p>
        <p className="mx-auto mt-2 max-w-sm opacity-85">
          Thank you. A member of the campaign team will be in touch.{" "}
          {ward?.whatsappLink
            ? "Join the ward WhatsApp community now to get updates first."
            : "We'll text you the ward WhatsApp link the moment it's live."}
        </p>
        {ward?.whatsappLink && (
          <a
            href={ward.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={isOnDark ? "btn-on-dark mt-4" : "btn-primary mt-4"}
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Join {ward.name} on WhatsApp
          </a>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`space-y-5 ${className}`}
    >
      <div>
        <label htmlFor={`${uid}-name`} className={labelClass}>
          Full name
        </label>
        <input
          id={`${uid}-name`}
          type="text"
          autoComplete="name"
          className={inputClass}
          {...register("name")}
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor={`${uid}-phone`} className={labelClass}>
          Phone number
        </label>
        <input
          id={`${uid}-phone`}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="07XX XXX XXX"
          className={inputClass}
          {...register("phone")}
        />
        {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor={`${uid}-ward`} className={labelClass}>
          Your ward
        </label>
        <select
          id={`${uid}-ward`}
          className={inputClass}
          defaultValue={defaultWard ?? ""}
          {...register("ward")}
        >
          <option value="" disabled>
            Select your ward
          </option>
          {wards.map((w) => (
            <option key={w.slug} value={w.slug}>
              {w.name}
            </option>
          ))}
        </select>
        {errors.ward && <p className={errorClass}>{errors.ward.message}</p>}
      </div>

      <div>
        <label htmlFor={`${uid}-email`} className={labelClass}>
          Email <span className="font-normal opacity-60">(optional)</span>
        </label>
        <input
          id={`${uid}-email`}
          type="email"
          autoComplete="email"
          className={inputClass}
          {...register("email")}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor={`${uid}-help`} className={labelClass}>
          How do you want to help?
        </label>
        <select
          id={`${uid}-help`}
          className={inputClass}
          defaultValue=""
          {...register("helpType")}
        >
          <option value="" disabled>
            Select one
          </option>
          {helpOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.helpType && (
          <p className={errorClass}>{errors.helpType.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`w-full ${isOnDark ? "btn-on-dark" : "btn-primary"}`}
      >
        {status === "submitting" && (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        )}
        Get campaign updates
      </button>
      <p
        className={`text-[0.8125rem] leading-relaxed ${isOnDark ? "text-paper/70" : "text-ink/60"}`}
      >
        We'll text and email you campaign updates. No spam. Reply STOP or{" "}
        <Link to="/unsubscribe" className="underline">
          unsubscribe here
        </Link>{" "}
        anytime. See our{" "}
        <Link to="/privacy" className="underline">
          privacy notice
        </Link>
        .
      </p>
    </form>
  );
}
