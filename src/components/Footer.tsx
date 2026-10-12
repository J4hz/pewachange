import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Mail, Phone, MessageCircle } from "lucide-react";
import { navLinks } from "@/config/nav";
import { candidate, social, contact, taglines } from "@/config/site";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";

const footerLink = "text-paper/75 transition-colors hover:text-paper";

// lucide-react has no built-in X/TikTok glyphs we want to rely on; keep the
// icon set to what's available and let the labelled text link carry the rest.
export function Footer() {
  const hasSocial = social.facebook || social.instagram || social.youtube || social.x;

  return (
    <footer className="bg-ink text-paper">
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr_1.2fr] lg:gap-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper">
                <img src="/logo-mark.png" alt="" width={44} height={44} className="h-11 w-11" />
              </span>
              <span className="display text-4xl">{candidate.brandName}</span>
            </Link>
            <p className="mt-5 max-w-xs text-paper/75">
              {candidate.office}, {candidate.county}, {candidate.electionYear}.
            </p>
            <p className="mt-6 font-serif text-xl italic text-blush">
              {taglines.official}.
            </p>
            <p className="mt-1 font-semibold">{taglines.hashtag}</p>

            {hasSocial && (
              <div className="mt-6 flex gap-5">
                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Ombaka campaign on Facebook" className={footerLink}>
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Ombaka campaign on Instagram" className={footerLink}>
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {social.youtube && (
                  <a href={social.youtube} target="_blank" rel="noopener noreferrer" aria-label="Ombaka campaign on YouTube" className={footerLink}>
                    <Youtube className="h-5 w-5" />
                  </a>
                )}
                {social.x && (
                  <a href={social.x} target="_blank" rel="noopener noreferrer" aria-label="Ombaka campaign on X" className={`text-sm font-bold ${footerLink}`}>
                    X
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 content-start gap-8 lg:grid-cols-1 lg:gap-10">
            <nav aria-label="Footer">
              <h2 className="font-semibold text-paper">Campaign</h2>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h2 className="font-semibold text-paper">Talk to us</h2>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href={`tel:${contact.phone}`} className={`inline-flex items-center gap-2.5 ${footerLink}`}>
                    <Phone className="h-4 w-4" aria-hidden="true" /> {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 ${footerLink}`}>
                    <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className={`inline-flex items-center gap-2.5 break-all ${footerLink}`}>
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /> {contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-paper">Get campaign updates</h2>
            <LeadCaptureForm variant="on-dark" className="mt-5" />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/10 pt-6 text-sm text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Campaign to elect{" "}
            {candidate.shortName} as {candidate.office}. Paid for by the
            Ombaka 2027 campaign.
          </p>
          <p className="flex shrink-0 gap-5">
            <Link to="/privacy" className="transition-colors hover:text-paper">
              Privacy
            </Link>
            <Link to="/unsubscribe" className="transition-colors hover:text-paper">
              Unsubscribe
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
