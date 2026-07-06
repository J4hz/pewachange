import { gaId, metaPixelId } from "@/config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

let loaded = false;

/**
 * Loads Google Analytics and/or the Meta Pixel, but only after the visitor
 * has explicitly granted cookie consent (see CookieConsent.tsx) and only if
 * the relevant env var is set. If VITE_GA_ID / VITE_META_PIXEL_ID are empty,
 * the corresponding tracker is never loaded — no hard-coded tracking IDs.
 */
export function loadAnalyticsIfConsented() {
  if (loaded) return;
  const consent = localStorage.getItem("ombaka_consent");
  if (consent !== "granted") return;
  loaded = true;

  if (gaId) {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId);
  }

  if (metaPixelId) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    script.onload = () => {
      window.fbq?.("init", metaPixelId);
      window.fbq?.("track", "PageView");
    };
  }
}
