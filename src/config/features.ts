import raw from "./features.json";

/**
 * Feature flags for pages that are built but not ready for real traffic yet.
 *
 * Flip a flag to `true` in features.json to switch the whole page on: the
 * route is registered, the nav link appears, and the page is included in
 * the sitemap (scripts/generate-sitemap.mjs reads this same file) — no
 * other code changes needed. See README.md "Enabling hidden pages".
 */
export const features = raw as {
  about: boolean;
  getInvolved: boolean;
  appearances: boolean;
  plan: boolean;
  stats: boolean;
  news: boolean;
};

export type FeatureKey = keyof typeof features;
