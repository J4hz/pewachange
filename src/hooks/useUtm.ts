import { useEffect, useState } from "react";

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

const STORAGE_KEY = "ombaka_utm";
const UTM_KEYS: (keyof UtmParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

/**
 * Captures UTM params from the current URL on first visit and persists them
 * in sessionStorage so the lead form can attribute a submission to the
 * ward link / channel that actually converted, even if the visitor lands on
 * a different page before submitting.
 */
export function useUtm(): UtmParams {
  const [utm, setUtm] = useState<UtmParams>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl: UtmParams = {};
    let hasAny = false;
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) {
        fromUrl[key] = value;
        hasAny = true;
      }
    }

    if (hasAny) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      setUtm(fromUrl);
      return;
    }

    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUtm(JSON.parse(stored));
      } catch {
        // ignore malformed stored value
      }
    }
  }, []);

  return utm;
}
