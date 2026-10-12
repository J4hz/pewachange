import { useEffect, useState } from "react";
import { loadAnalyticsIfConsented } from "@/lib/analytics";
import { gaId, metaPixelId } from "@/config/site";

const STORAGE_KEY = "ombaka_consent";

/**
 * Privacy-first consent banner. Defaults to the most privacy-preserving
 * option: nothing is tracked until the visitor explicitly clicks Accept.
 * Declining (or ignoring the banner) means analytics never load. With no
 * VITE_GA_ID or VITE_META_PIXEL_ID configured there is nothing to consent to,
 * so the banner stays hidden rather than asking about trackers that don't
 * exist.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!gaId && !metaPixelId) return;
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing === "granted") {
      loadAnalyticsIfConsented();
    } else if (existing !== "denied") {
      setVisible(true);
    }
  }, []);

  const decide = (granted: boolean) => {
    localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    if (granted) loadAnalyticsIfConsented();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t-2 border-ink bg-paper px-4 py-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink/80">
          We use optional analytics to see which pages and ward links help
          people join the campaign. Nothing is tracked unless you accept.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide(false)}
            className="btn-secondary px-4 py-2 text-sm"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="btn-primary px-4 py-2 text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
