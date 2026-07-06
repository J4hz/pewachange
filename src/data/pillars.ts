/**
 * The three campaign pillars shown on the homepage and expanded on /plan
 * (currently gated off — see src/config/features.ts). `detail` is the fuller
 * explanation used only on the /plan page; expand it with specific,
 * verifiable commitments before that page goes live.
 */
import type { LucideIcon } from "lucide-react";
import { Users, Receipt, HardHat } from "lucide-react";

export interface Pillar {
  id: string;
  title: string;
  swahiliTag: string;
  summary: string;
  detail: string;
  icon: LucideIcon;
}

export const pillars: Pillar[] = [
  {
    id: "representation",
    title: "Real Representation",
    swahiliTag: "Sauti yako bungeni.",
    summary:
      "An MP who shows up in the ward, not just at election time — regular public forums, open office hours, and a direct line back to residents.",
    detail: "",
    icon: Users,
  },
  {
    id: "accountability",
    title: "Every Shilling Accounted For",
    swahiliTag: "Kila senti, uwazi.",
    summary:
      "A public, plain-language tracker of CDF and local development funds — what was allocated, what was spent, and what residents can go and see for themselves.",
    detail: "",
    icon: Receipt,
  },
  {
    id: "jobs",
    title: "Jobs & Dignity",
    swahiliTag: "Kazi ni heshima.",
    summary:
      "Local procurement, skills programs, and support for the small businesses and informal workers who carry this constituency's economy.",
    detail: "",
    icon: HardHat,
  },
];
