import { features } from "@/config/features";

export interface NavLink {
  label: string;
  to: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", to: "/" },
  ...(features.plan ? [{ label: "The Plan", to: "/plan" }] : []),
  ...(features.stats ? [{ label: "The Record", to: "/stats" }] : []),
  ...(features.about ? [{ label: "Meet Ombaka", to: "/about" }] : []),
  ...(features.appearances ? [{ label: "Appearances", to: "/appearances" }] : []),
  ...(features.getInvolved ? [{ label: "Get Involved", to: "/get-involved" }] : []),
  ...(features.news ? [{ label: "News", to: "/news" }] : []),
];
