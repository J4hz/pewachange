import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MessageCircle,
  Phone,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Modal } from "@/components/Modal";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { submitContactMessage } from "@/lib/contact";
import { wards, type Ward } from "@/data/wards";
import { contact } from "@/config/site";

function WardJoinCard({ ward }: { ward: Ward }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full flex-col border-2 border-ink bg-paper p-6 shadow-stamp-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-berry">
        {ward.name}
      </p>
      <p className="mt-2 flex-1 text-ink/80">{ward.oneLiner}</p>
      <p className="mt-3 text-sm italic text-ink/50">{ward.swahiliTag}</p>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-secondary mt-5"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Join {ward.name} on WhatsApp
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`Join ${ward.name} on WhatsApp`}
      >
        <LeadCaptureForm defaultWard={ward.slug} />
      </Modal>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("submitting");
    const result = await submitContactMessage(values);
    setStatus(result.ok ? "success" : "error");
  };

  const labelClass = "mb-1 block text-xs font-semibold uppercase tracking-wide text-ink/70";
  const inputClass =
    "w-full border-2 border-ink/20 bg-white px-4 py-3 text-base text-ink placeholder-ink/40 focus:outline-none focus:ring-2 focus:ring-berry focus:ring-offset-2 focus:ring-offset-paper";
  const errorClass = "mt-1 text-sm text-berry-light";

  if (status === "success") {
    return (
      <div className="border-2 border-ink bg-cream-soft p-6 text-center text-ink shadow-stamp">
        <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-berry" aria-hidden="true" />
        <p className="font-serif text-lg font-semibold">Message sent.</p>
        <p className="mt-1 text-sm opacity-90">
          Thank you — the campaign team will get back to you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Full name
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className={inputClass}
          {...register("name")}
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          Phone number
        </label>
        <input
          id="contact-phone"
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
        <label htmlFor="contact-email" className={labelClass}>
          Email <span className="opacity-60">(optional)</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          className={inputClass}
          {...register("email")}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-ward" className={labelClass}>
          Your ward
        </label>
        <select
          id="contact-ward"
          className={inputClass}
          defaultValue=""
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
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          className={inputClass}
          {...register("message")}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <div className="flex items-start gap-3 border-2 border-berry/40 bg-berry/5 p-4 text-sm text-ink">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-berry" aria-hidden="true" />
          <p>
            We couldn't send your message just now, but it's been saved and
            the team will follow up. For anything urgent, call or WhatsApp{" "}
            <a href={`tel:${contact.phone}`} className="font-semibold underline">
              {contact.phoneDisplay}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${contact.email}`} className="font-semibold underline">
              {contact.email}
            </a>
            .
          </p>
        </div>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full">
        {status === "submitting" && (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        )}
        Send message
      </button>
    </form>
  );
}

export default function GetInvolved() {
  return (
    <>
      <SEO
        title="Get Involved"
        description="Join your ward WhatsApp community, contact the campaign directly, or volunteer for Ombaka 2027 — the accountability campaign for Dagoretti North MP."
        path="/get-involved"
      />

      <section className="bg-cream-soft py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-berry">
            Join the campaign
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
            Get Involved
          </h1>
          <p className="mt-5 text-lg text-ink/70">
            Join your ward community, reach the campaign directly, or put
            your hand up to volunteer. Every channel here reaches a real
            person on the team.
          </p>
        </div>
      </section>
      <div className="ledger-rule text-ink/15" aria-hidden="true" />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
          Join your ward on WhatsApp
        </h2>
        <p className="mt-3 max-w-2xl text-ink/70">
          Pick your ward, share a few details, and we'll bring you into the
          community.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wards.map((ward) => (
            <WardJoinCard key={ward.slug} ward={ward} />
          ))}
        </div>
      </section>

      <section className="bg-ink py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-berry-light">
            Official Pewa Change campaign contacts
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
            Reach the campaign directly
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <a
              href={`tel:${contact.phone}`}
              className="flex flex-col items-start gap-2 border-2 border-white/25 p-5 transition hover:border-white/50"
            >
              <Phone className="h-6 w-6 text-berry-light" aria-hidden="true" />
              <span className="text-sm font-semibold uppercase tracking-wide text-white/60">
                Call
              </span>
              <span className="font-mono text-lg">{contact.phoneDisplay}</span>
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start gap-2 border-2 border-white/25 p-5 transition hover:border-white/50"
            >
              <MessageCircle className="h-6 w-6 text-berry-light" aria-hidden="true" />
              <span className="text-sm font-semibold uppercase tracking-wide text-white/60">
                WhatsApp
              </span>
              <span>Message us on WhatsApp</span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex flex-col items-start gap-2 border-2 border-white/25 p-5 transition hover:border-white/50"
            >
              <Mail className="h-6 w-6 text-berry-light" aria-hidden="true" />
              <span className="text-sm font-semibold uppercase tracking-wide text-white/60">
                Email
              </span>
              <span className="break-all">{contact.email}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
          Send us a message
        </h2>
        <p className="mt-3 text-ink/70">
          Prefer to write it out? Fill this in and the campaign team will
          respond.
        </p>
        <div className="mt-8 border-2 border-ink bg-cream-soft p-6 shadow-stamp">
          <ContactForm />
        </div>
      </section>

      <section className="bg-berry py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
              Volunteer or become a Ward Captain
            </h2>
            <p className="mt-3 text-white/85">
              Tell us how you want to help — vote, volunteer, or lead as a
              Ward Captain — and we'll follow up.
            </p>
          </div>
          <LeadCaptureForm
            variant="on-dark"
            className="border-2 border-white/30 bg-white/5 p-6"
          />
        </div>
      </section>
    </>
  );
}
