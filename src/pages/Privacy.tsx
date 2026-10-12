import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { candidate, contact } from "@/config/site";

/**
 * Privacy notice for the Data Protection Act, 2019. Describes what the forms
 * actually collect (see lib/validation.ts and scripts/leads-apps-script.gs);
 * keep it in step if a form field or the collector changes. Copy needs legal
 * sign-off before launch — see README.
 */

const LAST_UPDATED = "12 October 2026";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-ink/80">{children}</div>
    </section>
  );
}

const linkClass = "text-berry underline";

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy"
        description="How the Pewa Change campaign collects, uses and protects your personal data, and how to exercise your rights under the Data Protection Act, 2019."
        path="/privacy"
      />

      <section className="bg-cream-soft py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-berry">
            Privacy notice
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Your data, your rights
          </h1>
          <p className="mt-4 text-sm text-ink/60">Last updated {LAST_UPDATED}</p>

          <p className="mt-6 text-lg text-ink/80">
            This notice explains how the campaign of {candidate.fullName},
            candidate for {candidate.office}, handles the personal data you
            give us on this website, in line with Kenya&rsquo;s Data Protection
            Act, 2019.
          </p>

          <Section title="Who we are">
            <p>
              The {candidate.shortName} {candidate.electionYear} campaign
              (#PewaChange) is responsible for your data. You can reach us at{" "}
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>{" "}
              or {contact.phoneDisplay}.
            </p>
          </Section>

          <Section title="What we collect">
            <p>When you sign up for updates we collect:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>your name and phone number;</li>
              <li>your ward in Dagoretti North;</li>
              <li>your email address, if you choose to give it;</li>
              <li>how you&rsquo;d like to help (vote, volunteer, ward captain, donate).</li>
            </ul>
            <p>
              When you send us a message through Get Involved we also keep the
              message itself. With each submission we record the page you were
              on and, if you arrived from a campaign link, which link it was,
              so we know which outreach is working.
            </p>
            <p>
              We do not ask for, and do not want, your ID number or voter
              details.
            </p>
          </Section>

          <Section title="Why we use it">
            <ul className="list-disc space-y-1 pl-6">
              <li>to send you campaign updates by SMS, WhatsApp and email;</li>
              <li>to connect you with your ward&rsquo;s supporter group;</li>
              <li>to organise volunteers and events in your ward;</li>
              <li>to reply to messages you send us.</li>
            </ul>
            <p>
              We rely on your consent, which you give by submitting a form. You
              can withdraw it at any time (see &ldquo;Stopping updates&rdquo;
              below).
            </p>
          </Section>

          <Section title="Where it is stored and who sees it">
            <p>
              Submissions are stored in a Google Sheet on the campaign&rsquo;s
              Google Workspace account, which only authorised campaign staff can
              open. Google stores this data on its servers, which may be
              outside Kenya.
            </p>
            <p>
              To send SMS updates we may share your name, phone number and ward
              with a bulk SMS provider, only for sending our messages. We never
              sell your data or give it to other campaigns or parties.
            </p>
            <p>
              <strong>Ward WhatsApp groups:</strong> if you join one, your phone
              number is visible to the other members of that group, as with any
              WhatsApp group.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              We keep your details for the duration of the 2027 general
              election campaign and delete them within six months after the
              election, unless you ask us to delete them sooner.
            </p>
          </Section>

          <Section title="Stopping updates">
            <p>
              You can stop campaign updates at any time: use our{" "}
              <Link to="/unsubscribe" className={linkClass}>
                unsubscribe page
              </Link>
              , reply STOP to any of our texts, or email {contact.email}. To
              leave a ward WhatsApp group, exit the group in WhatsApp.
            </p>
          </Section>

          <Section title="Your rights">
            <p>Under the Data Protection Act, 2019 you have the right to:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>be told how your data is used (this notice);</li>
              <li>see the data we hold about you;</li>
              <li>have it corrected if it is wrong;</li>
              <li>have it deleted;</li>
              <li>object to us using it.</li>
            </ul>
            <p>
              Email{" "}
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>{" "}
              to make any of these requests. If you are not satisfied with our
              response, you can complain to the Office of the Data Protection
              Commissioner at{" "}
              <a
                href="https://www.odpc.go.ke"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                odpc.go.ke
              </a>
              .
            </p>
          </Section>

          <Section title="Cookies and your browser">
            <p>
              This site does not use advertising or analytics cookies unless
              you agree to them in the cookie banner, and declining changes
              nothing about how the site works. If a form can&rsquo;t be sent
              (for example you lose signal), it is kept in your browser and
              sent automatically on your next visit. We also remember your
              cookie choice in your browser.
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}
