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
import { candidate, contact, taglines } from "@/config/site";

function WardRow({ ward }: { ward: Ward }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="grid gap-4 border-t-[1.5px] border-ink/10 py-8 md:grid-cols-[11rem_1fr_auto] md:items-center md:gap-10">
      <h3 className="heading text-2xl">{ward.name}</h3>
      <div>
        <p className="text-ink/80">{ward.oneLiner}</p>
        <p className="mt-1.5 font-serif italic text-berry">{ward.swahiliTag}</p>
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-secondary w-full md:w-auto"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Join {ward.name}
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`Join ${ward.name} on WhatsApp`}
      >
        <LeadCaptureForm defaultWard={ward.slug} />
      </Modal>
    </li>
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

  if (status === "success") {
    return (
      <div role="status" className="py-6 text-center text-ink">
        <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-berry" aria-hidden="true" />
        <p className="heading text-2xl">Message sent.</p>
        <p className="mt-2 text-ink/75">
          The campaign team will get back to you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="field-label">
          Full name
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className="field"
          {...register("name")}
        />
        {errors.name && <p className="field-error">{errors.name.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className="field-label">
            Phone number
          </label>
          <input
            id="contact-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="07XX XXX XXX"
            className="field"
            {...register("phone")}
          />
          {errors.phone && <p className="field-error">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="contact-ward" className="field-label">
            Your ward
          </label>
          <select
            id="contact-ward"
            className="field"
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
          {errors.ward && <p className="field-error">{errors.ward.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="field-label">
          Email <span className="font-normal opacity-60">(optional)</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          className="field"
          {...register("email")}
        />
        {errors.email && <p className="field-error">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="field-label">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          className="field resize-y"
          {...register("message")}
        />
        {errors.message && <p className="field-error">{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <div role="alert" className="flex items-start gap-3 rounded-xl bg-berry/[0.07] p-4 text-sm text-ink">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-berry" aria-hidden="true" />
          <p>
            Your message didn&rsquo;t send. It&rsquo;s saved on this device and
            we&rsquo;ll try again on your next visit. For anything urgent, call
            or WhatsApp{" "}
            <a href={`tel:${contact.phone}`} className="link">
              {contact.phoneDisplay}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${contact.email}`} className="link">
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

const directLinks = [
  {
    icon: Phone,
    label: "Call",
    value: contact.phoneDisplay,
    href: `tel:${contact.phone}`,
    external: false,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: contact.phoneDisplay,
    href: contact.whatsapp,
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    external: false,
  },
];

export default function GetInvolved() {
  return (
    <>
      <SEO
        title="Get involved"
        description="Join your ward WhatsApp community, contact the campaign directly, or volunteer for Ombaka 2027, the accountability campaign for Dagoretti North MP."
        path="/get-involved"
      />

      <section className="bg-paper pb-12 pt-12 sm:pt-20">
        <div className="shell">
          <h1 className="heading max-w-3xl text-5xl sm:text-6xl">Get involved</h1>
          <p className="mt-5 max-w-2xl text-xl leading-snug text-ink/80">
            Join your ward&rsquo;s WhatsApp group, talk to the campaign, or put
            your hand up to volunteer. Every message here reaches a real person
            on the team.
          </p>
        </div>
      </section>

      <section className="bg-paper pb-20 sm:pb-24">
        <div className="shell">
          <h2 className="heading text-3xl">Your ward on WhatsApp</h2>
          <p className="mt-3 max-w-2xl text-ink/75">
            Share a few details and we&rsquo;ll give you the link to your
            ward&rsquo;s group.
          </p>
          <ul className="mt-8 border-b-[1.5px] border-ink/10">
            {wards.map((ward) => (
              <WardRow key={ward.slug} ward={ward} />
            ))}
          </ul>

          <div className="mt-12 grid items-center gap-8 rounded-sheet bg-cream p-6 sm:grid-cols-[auto_1fr_auto] sm:p-8">
            <img
              src="/logo.png"
              alt=""
              width={96}
              height={96}
              className="h-24 w-24 rounded-2xl"
            />
            <div>
              <h3 className="heading text-2xl">Not sure which ward?</h3>
              <p className="mt-2 max-w-lg text-ink/75">
                Join the {taglines.hashtag} community: one group for every
                ward, with updates straight from the campaign.
              </p>
            </div>
            <a
              href={contact.whatsappCommunity}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Join the community
            </a>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_32rem] lg:gap-16">
          <div>
            <h2 className="heading text-4xl">Talk to the campaign</h2>
            <p className="mt-4 max-w-md text-lg text-ink/75">
              Call, WhatsApp or email us, or write it out in the form and the
              team will reply.
            </p>
            <ul className="mt-10 space-y-6">
              {directLinks.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper text-berry transition-colors group-hover:bg-berry group-hover:text-paper">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm text-ink/60">{label}</span>
                      <span className="block break-all font-semibold text-ink group-hover:text-berry">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-sheet bg-paper p-6 sm:p-8">
            <h3 className="heading text-2xl">Send a message</h3>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-berry py-20 text-paper sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_27rem] lg:items-center lg:gap-16">
          <div>
            <h2 className="display text-[clamp(2.5rem,5.5vw,4.25rem)]">
              Volunteer, or lead your ward
            </h2>
            <p className="mt-6 max-w-md text-xl text-paper/85">
              Tell us how you want to help, from voting to becoming a ward
              captain, and someone from the {candidate.shortName} team will
              follow up.
            </p>
          </div>
          <div className="rounded-sheet bg-ink/25 p-6 sm:p-8">
            <LeadCaptureForm variant="on-dark" />
          </div>
        </div>
      </section>
    </>
  );
}
