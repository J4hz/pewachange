/**
 * Media appearances — TV/video interviews, podcasts, and articles Ombaka has
 * featured in. Rendered on /appearances (see src/pages/Appearances.tsx).
 *
 * Add only real, published appearances with a working `url`. The newest entry
 * is rendered as the large featured item, so keep this list sorted
 * newest-first. Nothing here is fabricated: if you don't know a field, leave
 * the optional ones off rather than guessing.
 */

export type AppearanceKind = "video" | "podcast" | "article";

export interface Appearance {
  id: string;
  kind: AppearanceKind;
  title: string;
  /** Publisher/broadcaster, e.g. "NTV Kenya". */
  outlet: string;
  /** Show or column name within the outlet, e.g. "Fixing the Nation". */
  programme?: string;
  /** ISO date (YYYY-MM-DD) the appearance was published. */
  date: string;
  /** Canonical public link to watch/listen/read. */
  url: string;
  /** One or two sentences on what Ombaka discussed. */
  summary: string;
  /**
   * YouTube video ID. When set, the card plays inline via a click-to-load
   * embed and derives its thumbnail automatically — no `image` needed.
   */
  youtubeId?: string;
  /** Thumbnail path under /public, for non-YouTube items. */
  image?: string;
}

export const appearances: Appearance[] = [
  {
    id: "ntv-fixing-the-nation-kileleshwa-high-rise",
    kind: "video",
    title:
      "Kileleshwa's High-Rise Problem: Why Residents Are Against New Regulations",
    outlet: "NTV Kenya",
    programme: "Fixing the Nation",
    date: "2026-07-15",
    url: "https://www.youtube.com/watch?v=FBMFQPKRc7k",
    summary:
      "As chairperson of the Kileleshwa Ward Neighbourhood Association, Ombaka sets out why residents are pushing back on the new high-rise development regulations, and what accountable planning for the ward should look like.",
    youtubeId: "FBMFQPKRc7k",
  },
];
