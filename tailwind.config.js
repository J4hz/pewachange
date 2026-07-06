/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette extracted from the live site (pewachange.ke) — preserved as instructed.
        // See README.md "Brand palette" section for provenance of each token.
        berry: {
          DEFAULT: "#B43052", // primary brand accent — used site-wide for headlines & the tax/development contrast block
          dark: "#7A2038", // hover/pressed shade derived from berry for contrast
          light: "#D66C88",
        },
        cream: {
          DEFAULT: "#E8CEB0", // secondary warm surface, paired with berry on the source site
          soft: "#F3E6D4",
        },
        ink: "#111111", // body/heading text (source site --wp--preset--color--contrast)
        paper: {
          DEFAULT: "#FFFFFF", // base background (source site --wp--preset--color--base)
          soft: "#FBFAF3", // off-white surface (source site accent-5)
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
        serif: [
          "Fraunces",
          "ui-serif",
          "Georgia",
          "serif",
        ],
        sans: [
          "Manrope",
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
        none: "0px",
        DEFAULT: "0px",
      },
      boxShadow: {
        // Hard, offset "letterpress/stamp" shadow — depth without softness,
        // to match the flat receipt/ledger aesthetic (no blurred elevation).
        stamp: "4px 4px 0 0 rgba(17,17,17,1)",
        "stamp-sm": "3px 3px 0 0 rgba(17,17,17,1)",
        "stamp-berry": "4px 4px 0 0 rgba(180,48,82,1)",
      },
      clipPath: {
        receipt: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      },
    },
  },
  plugins: [],
};
