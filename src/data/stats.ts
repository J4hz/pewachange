/**
 * Stat figures for the "Taxes up, development down" hook and the /stats
 * "Record" page. Both are currently gated off (see src/config/features.ts)
 * until real figures are sourced.
 *
 * `value` is intentionally `null` until the campaign supplies a verified
 * figure. Do NOT invent numbers here — <StatCard> renders a clearly labelled
 * "verified figure coming soon" state when value is null, which is more
 * credible than a fabricated stat on an accountability platform. Fill in
 * `value`, `unit` and `sourceNote` together once a figure is sourced and
 * citable, e.g. from the Controller of Budget, the Auditor-General, the CDF
 * board, or Nairobi County reports.
 */

export type StatTrend = "up" | "down" | "unaccounted";

export interface StatItem {
  id: string;
  label: string;
  swahiliLabel: string;
  value: string | null;
  unit?: string;
  trend: StatTrend;
  /** Citation for the figure once sourced, e.g. "Controller of Budget FY23/24 report". */
  sourceNote: string;
  detail: string;
}

export const headlineStats: StatItem[] = [
  {
    id: "tax-burden",
    label: "Taxes & levies paid by residents",
    swahiliLabel: "Ushuru mlioulipa",
    value: null,
    trend: "up",
    sourceNote: "",
    detail: "",
  },
  {
    id: "development-delivered",
    label: "Local development delivered",
    swahiliLabel: "Maendeleo yaliyofika",
    value: null,
    trend: "down",
    sourceNote: "",
    detail: "",
  },
  {
    id: "funds-unaccounted",
    label: "Funds not publicly accounted for",
    swahiliLabel: "Fedha zisizo na uwazi",
    value: null,
    trend: "unaccounted",
    sourceNote: "",
    detail: "",
  },
];

export interface StatCategory {
  id: string;
  title: string;
  items: StatItem[];
}

export const recordCategories: StatCategory[] = [
  {
    id: "taxation",
    title: "What residents pay",
    items: [headlineStats[0]],
  },
  {
    id: "development",
    title: "What has been delivered",
    items: [headlineStats[1]],
  },
  {
    id: "accountability",
    title: "What remains unaccounted for",
    items: [headlineStats[2]],
  },
];
