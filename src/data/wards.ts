/**
 * Per-ward messaging and join links for Dagoretti North.
 *
 * Edit copy here to change what visitors see when they select a ward on the
 * homepage or Get Involved — no component changes needed.
 *
 * whatsappLink is `null` until the campaign supplies a real WhatsApp
 * Community join link (ideally one that requires approval). While null, the
 * UI shows an honest "launching shortly" message instead of a broken or
 * fabricated link. Links are intentionally NOT rendered directly in the page
 * markup; they are only revealed to a visitor after they submit the lead
 * form, so they can't be scraped straight off the page by opponents or
 * spammers. Fill in the real link here once you have it — no other file
 * needs to change.
 */

export type WardSlug =
  | "kilimani"
  | "gatina"
  | "kabiro"
  | "kawangware"
  | "kileleshwa";

export interface Ward {
  slug: WardSlug;
  name: string;
  oneLiner: string;
  swahiliTag: string;
  whatsappLink: string | null;
}

export const wards: Ward[] = [
  {
    slug: "kilimani",
    name: "Kilimani",
    oneLiner:
      "You pay some of the highest rates and levies in the constituency. You deserve to see exactly where that money goes.",
    swahiliTag: "Uwazi kwa kila senti.",
    whatsappLink: "https://chat.whatsapp.com/CjjJc6U1wJeB9940hQ9crA",
  },
  {
    slug: "gatina",
    name: "Gatina",
    oneLiner:
      "Roads, drainage and water have waited too long. Gatina needs a representative who tracks delivery, not just promises.",
    swahiliTag: "Maendeleo ya kweli, siyo ahadi.",
    whatsappLink: "https://chat.whatsapp.com/JMMBI6qM3PJBSDr4TxK4bJ",
  },
  {
    slug: "kabiro",
    name: "Kabiro",
    oneLiner:
      "Jobs, dignified housing, and services that actually reach Kabiro, funded by taxes you already pay.",
    swahiliTag: "Kazi na heshima kwa kila mkazi.",
    whatsappLink: "https://chat.whatsapp.com/IEwGvHfaKfU6EWMWcEhLhm",
  },
  {
    slug: "kawangware",
    name: "Kawangware",
    oneLiner:
      "Kawangware carries the weight of this constituency's workforce. It's time public money worked as hard as you do.",
    swahiliTag: "Ushuru wako ufanye kazi kwako.",
    whatsappLink: "https://chat.whatsapp.com/FZ4x0o1Rq2E4s7C7ldlXNT",
  },
  {
    slug: "kileleshwa",
    name: "Kileleshwa",
    oneLiner:
      "Kileleshwa residents fund a lot of this county's budget. Accountable, transparent representation is the return you're owed.",
    swahiliTag: "Ushuru wako, uwazi wako.",
    whatsappLink: "https://chat.whatsapp.com/Ix53x4rTndc50OturiuFqF",
  },
];

export const wardBySlug = (slug: WardSlug): Ward =>
  wards.find((w) => w.slug === slug) ?? wards[0];
