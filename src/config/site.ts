/**
 * Central campaign configuration: candidate identity, canonical URLs, and
 * env-driven integration points. Non-devs should only need to touch
 * data/*.ts and .env — this file wires those into the app.
 */

export const candidate = {
  fullName: "Vincent Ombaka", // used in the hero/bio
  shortName: "Ombaka", // used in body copy
  brandName: "Ombaka", // used in the logo/nav/headlines
  office: "Member of Parliament, Dagoretti North Constituency",
  county: "Nairobi County",
  electionYear: 2027,
  positioning: "The Accountable Son of the Soil",
} as const;

export const taglines = {
  // The official campaign tagline (Swahili) and hashtag — the campaign's
  // core message block, featured site-wide. See README brand notes.
  official: "Ushuru Imezidi, Maendeleo ni Kidogo",
  officialEnglish: "Taxes have gone up. Development is little.",
  hashtag: "#PewaChange",
  // English positioning line, used as the emotional headline hook.
  primary: "You've paid. You deserve more.",
  primarySwahili: "Umelipa. Unastahili zaidi.",
  supportingSwahili: "Ushuru wako. Maendeleo yako. Uwazi.",
  supportingEnglish: "Your taxes. Your development. Transparency.",
} as const;

export const siteUrl = "https://www.pewachange.ke";

/**
 * Social handles are not yet confirmed live — leave empty and the footer
 * simply won't render that icon. Add a URL here once the handle is live.
 */
export const social = {
  facebook: "",
  x: "",
  instagram: "",
  tiktok: "",
  youtube: "",
} as const;

export const contact = {
  email: "info@pewachange.ke",
  phone: "+254100540540",
  phoneDisplay: "+254 100 540540",
  whatsapp: "https://wa.me/254100540540",
  // General campaign-wide WhatsApp Community (separate from the per-ward
  // groups in data/wards.ts) — for supporters who aren't sure which ward
  // group to join, or want the umbrella community.
  whatsappCommunity: "https://chat.whatsapp.com/F0aPvObApZGGy7d5T2lFD2",
} as const;

/** Where lead-capture form submissions are sent. See .env.example. */
export const leadsEndpoint: string =
  import.meta.env.VITE_LEADS_ENDPOINT ?? "";

/** Where the Get Involved contact form is sent. See .env.example. */
export const contactEndpoint: string =
  import.meta.env.VITE_CONTACT_ENDPOINT ?? "";

/** Google Analytics 4 measurement ID. Empty disables analytics entirely. */
export const gaId: string = import.meta.env.VITE_GA_ID ?? "";

/** Meta/Facebook Pixel ID. Empty disables the pixel entirely. */
export const metaPixelId: string = import.meta.env.VITE_META_PIXEL_ID ?? "";
