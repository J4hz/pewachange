/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette sampled from the Pewa Change logo and the "Support the
        // movement" poster: one burgundy, warm creams, and a peach accent.
        // See README.md "Brand palette".
        berry: {
          DEFAULT: "#781627", // primary brand accent (burgundy, matches the Pewa Change logo) — used site-wide for headlines & the tax/development contrast block
          dark: "#56101C", // hover/pressed shade derived from berry for contrast
          light: "#D66C88",
        },
        blush: "#E9C4AF", // peach circle behind the hand in the logo
        cream: {
          DEFAULT: "#E8D4C4", // poster background
          soft: "#E8D4C4", // alternating section background (poster)
        },
        ink: "#2B0C12", // text, borders, stamp shadows, footer: near-black burgundy
        paper: {
          DEFAULT: "#F2DDC8", // base background (logo background cream)
          soft: "#F7E8DA", // lighter cream surface
        },
        campaign: {
          black: "#000000", // dark surfaces (footer) — no longer used for buttons
        },
        // Engraved-metal accent, used sparingly (<5% of any surface): the
        // seal emblem, hairline ledger rules, and "verified" marks. This is
        // the one new token added for the premium pass — everything else
        // stays the brand palette already extracted from the live site.
        brass: {
          DEFAULT: "#9C7A3C",
          light: "#C9A96A",
        },
      },
      fontFamily: {
        // Fraunces carries the brand voice: set heavy, italic and fully
        // "soft" (see .display in index.css) it echoes the rounded italic of
        // the Pewa Change wordmark. Schibsted Grotesk does all the reading.
        serif: [
          "Fraunces",
          "ui-serif",
          "Georgia",
          "serif",
        ],
        sans: [
          "Schibsted Grotesk",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      borderRadius: {
        // Two radii, by role: "sheet" for photos and form panels; pills
        // (rounded-full) for anything you press, taken from the poster's
        // PAYBILL labels. Everything else stays square.
        sheet: "1.75rem",
      },
      boxShadow: {
        // Kept for the hidden Stats/Plan pages, which still use them.
        stamp: "4px 4px 0 0 rgba(43,12,18,1)",
        "stamp-sm": "3px 3px 0 0 rgba(43,12,18,1)",
        // A low, warm lift for floating sheets (modal, menus) only.
        lift: "0 1px 2px rgba(43,12,18,0.08), 0 12px 32px -8px rgba(43,12,18,0.22)",
      },
      clipPath: {
        receipt: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      },
    },
  },
  plugins: [],
};
