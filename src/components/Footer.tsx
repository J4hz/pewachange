import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Mail, Phone } from "lucide-react";
import { navLinks } from "@/config/nav";
import { candidate, social, contact, taglines } from "@/config/site";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { Seal } from "@/components/Seal";

// lucide-react has no built-in X/TikTok glyphs we want to rely on; keep the
// icon set to what's available and let the labelled text link carry the rest.
export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="ledger-rule text-brass/40" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Seal variant="decorative" size={44} />
              <p className="font-serif text-2xl font-semibold">
                {candidate.brandName} <span className="text-berry-light">2027</span>
              </p>
            </div>
            <p className="mt-3 text-sm text-white/70">
              {candidate.office}, {candidate.county}.
            </p>
            <p className="mt-4 font-serif text-base italic text-white/90">
              {taglines.official}.
            </p>
            <p className="mt-2 inline-block border border-white/30 px-2.5 py-1 text-sm font-semibold tracking-wide text-berry-light">
              {taglines.hashtag}
            </p>
            {(social.facebook || social.instagram || social.youtube || social.x) && (
              <div className="mt-4 flex gap-4">
                {social.facebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ombaka campaign on Facebook"
                    className="text-white/80 transition hover:text-cream"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ombaka campaign on Instagram"
                    className="text-white/80 transition hover:text-cream"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {social.youtube && (
                  <a
                    href={social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ombaka campaign on YouTube"
                    className="text-white/80 transition hover:text-cream"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                )}
                {social.x && (
                  <a
                    href={social.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ombaka campaign on X"
                    className="text-sm font-bold text-white/80 transition hover:text-cream"
                  >
                    X
                  </a>
                )}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
              Campaign
            </p>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/80 transition hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-sm text-white/80 transition hover:text-cream"
              >
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 text-sm text-white/80 transition hover:text-cream"
              >
                <Phone className="h-4 w-4" /> {contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
              Get campaign updates
            </p>
            <LeadCaptureForm variant="on-dark" className="mt-3" />
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 font-mono text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Campaign to elect{" "}
            {candidate.shortName} as {candidate.office}. Paid for by the
            Ombaka 2027 campaign.
          </p>
        </div>
      </div>
    </footer>
  );
}
