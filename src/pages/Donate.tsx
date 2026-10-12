import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, Download } from "lucide-react";
import { SEO } from "@/components/SEO";
import { contact, donation } from "@/config/site";

/**
 * M-Pesa Paybill contributions. There is no payment integration: the page
 * shows the Paybill and account number from config/site.ts and walks the
 * visitor through paying from their own phone. The pill labels over each
 * number repeat the treatment on the campaign's donation poster.
 */

function CopyNumber({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await window.navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (older browser, insecure context) — the number is
      // still on screen to type by hand.
    }
  };

  return (
    <div className="flex flex-wrap items-end justify-between gap-4 py-6 first:pt-0 last:pb-0">
      <div>
        <span className="inline-block rounded-full bg-berry px-3.5 py-1 text-sm font-semibold text-paper">
          {label}
        </span>
        <p className="mt-3 text-5xl font-bold tabular-nums tracking-tight text-berry sm:text-6xl">
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={copy}
        className="btn-secondary min-h-[2.75rem] px-5 text-sm"
        aria-label={`Copy ${label.toLowerCase()} ${value}`}
      >
        {copied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

const steps = [
  <>Open <strong>M-PESA</strong> on your phone, or the M-PESA app.</>,
  <>Choose <strong>Lipa na M-PESA</strong>, then <strong>Pay Bill</strong>.</>,
  <>Enter business number <strong>{donation.paybill}</strong>.</>,
  <>Enter account number <strong>{donation.account}</strong>.</>,
  <>Enter the amount and your PIN, then confirm.</>,
];

export default function Donate() {
  return (
    <>
      <SEO
        title="Donate"
        description={`Support the #PewaChange movement. Weka mawe via M-PESA Paybill ${donation.paybill}, account ${donation.account}.`}
        path="/donate"
      />

      <section className="bg-paper pb-20 pt-12 sm:pb-28 sm:pt-20">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_22rem] lg:gap-20">
          <div>
            <h1 className="display text-[clamp(3.25rem,8vw,6rem)] text-berry">Weka mawe.</h1>
            <p className="heading mt-5 text-3xl">Support the movement</p>
            <p className="mt-5 max-w-xl text-lg text-ink/75">
              This campaign is funded by the people of Dagoretti North, not by
              the people it will hold to account. Every shilling goes into
              reaching more homes in all five wards.
            </p>

            <div className="mt-10 divide-y-[1.5px] divide-ink/10 rounded-sheet bg-cream p-6 sm:p-8">
              <CopyNumber label="Paybill" value={donation.paybill} />
              <CopyNumber label="Account number" value={donation.account} />
            </div>

            <h2 className="heading mt-14 text-3xl">How to give with M-PESA</h2>
            <ol className="mt-6 space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex items-baseline gap-4 text-lg text-ink/85">
                  <span
                    className="flex h-8 w-8 shrink-0 translate-y-[0.35rem] items-center justify-center self-start rounded-full bg-berry text-sm font-bold text-paper"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-xl text-ink/70">
              You&rsquo;ll get an M-PESA confirmation SMS. Questions about a
              contribution? Email{" "}
              <a href={`mailto:${contact.email}`} className="link">
                {contact.email}
              </a>
              .
            </p>
            <p className="mt-4 max-w-xl text-ink/70">
              Can&rsquo;t give money right now? Your time counts just as much.{" "}
              <Link to="/get-involved" className="link">
                Volunteer in your ward
              </Link>
              .
            </p>
          </div>

          <aside className="mx-auto w-full max-w-[22rem] lg:pt-4">
            <img
              src="/donate-poster.jpg"
              alt={`Support the movement. Weka mawe. Paybill ${donation.paybill}, account number ${donation.account}.`}
              width={1080}
              height={1350}
              loading="lazy"
              className="w-full rounded-2xl shadow-lift"
            />
            <a
              href="/donate-poster.jpg"
              download="PewaChange-Support-the-movement.jpg"
              className="btn-secondary mt-5 w-full"
            >
              <Download className="h-5 w-5" aria-hidden="true" />
              Download the poster to share
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
