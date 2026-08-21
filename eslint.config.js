import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // The .gs file in scripts/ is Google Apps Script, deployed by hand rather
  // than bundled — it runs on Google's servers, not here, so it is not ours
  // to lint against browser or Node globals.
  { ignores: ["dist", "**/*.gs"] },
  js.configs.recommended,
  {
    // Build-time Node scripts (sitemap generation), not browser code.
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { console: "readonly", process: "readonly" },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
      // Browser globals used across the app. `no-undef` has no type
      // information, so anything not listed here is reported as undefined
      // even though TypeScript resolves it fine from the DOM lib.
      globals: {
        console: "readonly",
        crypto: "readonly",
        document: "readonly",
        fetch: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        window: "readonly",
        KeyboardEvent: "readonly",
        React: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
];
