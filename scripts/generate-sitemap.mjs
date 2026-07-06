// Regenerates public/sitemap.xml from the same feature flags the app uses,
// so a hidden page never leaks into the sitemap. Runs automatically before
// every build (see package.json "prebuild"). Flip a flag in
// src/config/features.json and rebuild — no other change needed.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const featuresPath = path.resolve(__dirname, "../src/config/features.json");
const features = JSON.parse(readFileSync(featuresPath, "utf-8"));

// Keep in sync with siteUrl in src/config/site.ts.
const SITE_URL = "https://www.pewachange.ke";

const alwaysOn = ["/"];
const flagged = [
  ["about", "/about"],
  ["getInvolved", "/get-involved"],
  ["plan", "/plan"],
  ["stats", "/stats"],
  ["news", "/news"],
];

const routes = [
  ...alwaysOn,
  ...flagged.filter(([flag]) => features[flag]).map(([, route]) => route),
];

const urlEntries = routes
  .map(
    (route) => `  <url>\n    <loc>${SITE_URL}${route}</loc>\n  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

writeFileSync(path.resolve(__dirname, "../public/sitemap.xml"), xml);
console.log(`sitemap.xml written with ${routes.length} route(s): ${routes.join(", ")}`);
