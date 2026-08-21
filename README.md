# Ombaka 2027 — Dagoretti North MP Campaign Site

The official campaign site for Vincent Ombaka, candidate for Member of
Parliament, Dagoretti North Constituency (Nairobi County), 2027 — the
#PewaChange accountability campaign. The site's job is to turn visitors into
captured leads (name/phone/email) and mobilized WhatsApp supporters, ward by
ward.

## Tech stack

- React + Vite + TypeScript
- Tailwind CSS (brand palette wired into `tailwind.config.js`, no hard-coded hex in components)
- Framer Motion (subtle entrance/scroll animation only)
- react-router-dom (multi-page routing + in-page anchors)
- react-hook-form + zod (lead-capture and contact form validation)
- lucide-react (icons)
- react-helmet-async (per-page SEO/OG tags)

## Brand palette

The palette was extracted directly from the live site at `pewachange.ke`
(view-source, not a redesign) rather than invented:

- `#B43052` (deep rose/crimson) — the campaign's core accent, used for H1
  headings and the "Ushuru Imezidi / Maendeleo ni Kidogo" message block.
  Carried over as `berry` in `tailwind.config.js`.
- `#E8CEB0` (warm cream) — paired with `#B43052` throughout the source site
  as a secondary surface color. Carried over as `cream`.
- `#111111` / `#FFFFFF` — text and background tokens. Carried over as `ink`
  and `paper`.
- `#000000` — the fill color of every button on the source site, carried
  over as `campaign.black` and used for the square-cornered primary CTAs.

All tokens live in `tailwind.config.js` under `colors.berry / .cream / .ink /
.paper / .campaign`; never hard-code a hex value in a component.

**Typography:** Manrope (body) for continuity with the source site, plus
Fraunces as the display/headline serif, both loaded via Google Fonts with
`display=swap` + `preconnect` to protect LCP on cheap Android/3G. Stat
figures use a monospace stack to read like ledger/receipt figures.

**Signature visual motif:** `<StatCard>` uses a perforated top edge and
dotted "ledger" line — a tax-receipt visual language reinforcing the
accountability narrative wherever a number appears.

## Site architecture — launch lean, expand later

**Live routes:**

- `/` — Home. Hero, ward selector, three pillars, a short bio teaser linking
  to Meet Ombaka, and a final CTA band.
- `/about` — Meet Ombaka. The candidate's biography.
- `/appearances` — In the Media. Every video, podcast, and article Ombaka has
  featured in (see `src/data/appearances.ts`).
- `/get-involved` — Join a ward WhatsApp community, contact the campaign
  directly, send a message, or volunteer / apply as a Ward Captain.

**Hidden routes (built, but gated off):**

- `/plan` — The Plan. Each pillar's `detail` field needs specific, verifiable
  commitments before this goes live (see `src/data/pillars.ts`).
- `/stats` — The Record. Built on `<StatCard>`, which renders an honest
  "verified figure coming soon" state — **no invented numbers.** Stays off
  until real, sourced figures exist (see `src/data/stats.ts`).
- `/news` — Update feed. An empty or stale news page is the fastest way to
  make a campaign look abandoned, so it stays hidden until there's a real,
  steady stream of updates (see `src/data/news.ts`).

### Enabling a hidden page

Edit `src/config/features.json`:

```json
{
  "about": true,
  "getInvolved": true,
  "appearances": true,
  "plan": false,
  "stats": false,
  "news": false
}
```

Flipping a flag to `true` and rebuilding:

- registers the route in `src/App.tsx` (already wired, no code change needed),
- adds the nav link (from `src/config/nav.ts`, already wired),
- adds the page to `public/sitemap.xml` (regenerated automatically by
  `scripts/generate-sitemap.mjs`, which runs before every `npm run build`).

No component code needs to change to turn a page on. This is a JSON file
specifically so a non-developer can edit it directly.

## Editing campaign copy (non-developers)

All editable campaign content lives in `src/data/*.ts`:

- `wards.ts` — the one-liner, Swahili tag, and WhatsApp Community join link
  for each of the 5 wards (Kilimani, Gatina, Kabiro, Kawangware,
  Kileleshwa). **`whatsappLink` is `null` until a real link is added** — the
  UI shows an honest "we'll text you the link" message instead of a broken
  or fabricated one. Add the real link here once you have it; no other file
  needs to change.
- `pillars.ts` — the three policy pillars (`summary` shown on the homepage,
  `detail` shown on `/plan` once that page is enabled).
- `stats.ts` — the "Taxes up, development down" figures. `value` stays
  `null` until a real, sourced figure is supplied — fill in `value`, `unit`,
  and `sourceNote` together, and never invent a number.
- `appearances.ts` — media appearances shown on `/appearances`. See
  "Adding a media appearance" below.
- `news.ts` — cards for the hidden `/news` page.
- `socialProof.ts` — supporter counter, endorsements, ward captains, used by
  `<SocialProof>` (not currently rendered on Home — see below). Add real
  entries and render the component again once there's real content.

Candidate identity, contact details, and the canonical site URL are in
`src/config/site.ts`.

### Adding a media appearance

Add an entry to the top of `appearances` in `src/data/appearances.ts` — the
list is rendered newest-first, and the most recent entry becomes the large
featured item at the top of `/appearances`:

```ts
{
  id: "unique-slug",
  kind: "video",          // "video" | "podcast" | "article"
  title: "Headline as published",
  outlet: "NTV Kenya",    // publisher/broadcaster
  programme: "Fixing the Nation", // optional show or column name
  date: "2026-07-15",     // ISO, YYYY-MM-DD
  url: "https://www.youtube.com/watch?v=FBMFQPKRc7k",
  summary: "One or two sentences on what Ombaka discussed.",
  youtubeId: "FBMFQPKRc7k", // YouTube items only — see below
}
```

For a YouTube item, set `youtubeId` to the `v=` value in the URL. That's all
that's needed: `<YouTubeEmbed>` derives the thumbnail and plays the video
inline. It uses a click-to-load facade — nothing from YouTube is requested
until the visitor presses play — so the page stays fast and no third-party
cookie is set on a passive page view.

For a podcast or article, leave `youtubeId` off and optionally set `image` to
a path under `public/`. Without an image the card falls back to a
typographic plate, so a missing thumbnail never breaks the grid.

Entries are grouped on the page by `kind` (Television & Video, Podcasts,
Writing & Press), and a group with no entries isn't rendered at all.

### Social proof

`<SocialProof>` (`src/components/home/SocialProof.tsx`) is built but not
rendered on the homepage, because `src/data/socialProof.ts` has no real
entries yet. Once there are confirmed endorsements, a real supporter count,
or named ward captains, add them there and import `<SocialProof />` back
into `src/pages/Home.tsx`.

## Lead capture, WhatsApp, and UTM tracking

`src/components/LeadCaptureForm.tsx` is the reusable lead form used in the
hero modal, the ward selector, the Get Involved ward cards, and the footer.
Fields: Name, Phone (Kenyan format: `07XX...` / `01XX...` / `+2547XX...`),
Ward, optional Email, and "How you want to help" (Vote / Volunteer / Ward
Captain / Donate-interest). Validation is via `zod`
(`src/lib/validation.ts`).

**Capture-then-reveal:** WhatsApp Community links are never printed directly
into the page markup. `src/data/wards.ts` holds them as data only; a visitor
only sees a ward's "Join on WhatsApp" button *after* successfully submitting
the lead form. This keeps invite links out of scrapers'/rivals' reach and
guarantees every WhatsApp joiner is also a captured lead.

**Where lead submissions go:** `src/lib/leads.ts` posts JSON to
`VITE_LEADS_ENDPOINT` (see `.env.example`) — wire this to the Apps Script
collector below, Formspree, or the campaign's own backend/CRM. If the
endpoint is unset or the request fails, the lead is queued in `localStorage`
(`ombaka_lead_queue`) instead of being lost, and the visitor still sees
success and the WhatsApp reveal.

**Retry queue:** queued submissions are not stranded. `flushQueuedSubmissions()`
(`src/lib/queue.ts`) runs on every app load and re-posts anything still
parked, so a submission made while the endpoint was misconfigured is
delivered the next time that visitor opens the site. Every payload carries a
unique `id`, and the collector skips ids it has already written, so a retry
can't create a duplicate row.

**UTM attribution:** `src/hooks/useUtm.ts` captures
`utm_source/medium/campaign/content/term` from the URL on landing, persists
them for the session, and every lead submission includes them — so the
campaign can see which ward link or channel actually converts.

## Get Involved contact form

`src/pages/GetInvolved.tsx` also has a direct contact form (Name, Phone,
optional Email, Ward, Message) that posts JSON to `VITE_CONTACT_ENDPOINT`
(see `src/lib/contact.ts`). Point this at a Formspree endpoint (or similar)
configured to deliver to `info@pewachange.ke`, or the campaign's own
mail-sending backend — set it in `.env.local` / your hosting provider's
environment variables. Unlike the lead form, this form does **not** claim
success it can't back up: if the endpoint isn't configured or the request
fails, the message is queued locally (`ombaka_contact_queue`) but the
visitor sees a clear error state with the phone/email fallback, so a message
is never silently dropped.

The same page also surfaces the official campaign contacts directly: phone
(`tel:`), WhatsApp (`wa.me`), and email (`mailto:`) — sourced from
`src/config/site.ts`, and also shown in the footer on every page.

## Wiring up lead capture and campaign updates

Until `VITE_LEADS_ENDPOINT` is set, **every signup is parked in the
visitor's own browser and the campaign never sees it** — while the form
still tells them "You're on the list." This is the first thing to set up
before promoting the site anywhere.

Two separate problems, in order: somewhere for the list to land, and
something to send updates with. The site itself can never send anything —
it is a static SPA on Vercel, with no server, no scheduler, and no mail
capability. Broadcasts always go out from a separate tool.

### 1. Collect: Google Sheet + Apps Script Web App

Free, and the campaign owns the data outright. `scripts/leads-apps-script.gs`
is the script to deploy — it is kept in the repo so the deployed code stays
reviewable, but it is **not** bundled with the site.

1. Create a Google Sheet (e.g. "Ombaka 2027 — Supporters"). The script
   creates the `Leads` and `Messages` tabs itself on first submission.
2. In that Sheet: **Extensions -> Apps Script**.
3. Delete the placeholder `myFunction`, paste in the whole of
   `scripts/leads-apps-script.gs`, and save.
4. Adjust `NOTIFY_EMAIL` at the top if new Get Involved messages should go
   somewhere other than `info@pewachange.ke` (set it to `""` for no email
   alerts, sheet rows only).
5. **Deploy -> New deployment -> Web app**, with:
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**  ← required; "Anyone with Google account"
     will reject submissions from the public site.
6. Authorise when prompted (the "unverified app" warning is expected for
   your own script — *Advanced -> Go to ... (unsafe)*).
7. Copy the deployment URL. It ends in `/exec`.
8. Set both `VITE_LEADS_ENDPOINT` and `VITE_CONTACT_ENDPOINT` to that same
   URL — in `.env.local` for dev, and in Vercel **Project Settings ->
   Environment Variables** for production.
9. **Redeploy on Vercel.** These are Vite build-time variables, so an
   existing deployment will not pick them up until it rebuilds.
10. Submit the form on the live site and confirm a row appears.

Two things worth knowing about this setup:

- Requests to `script.google.com` are sent as `text/plain` rather than
  `application/json` (see `contentTypeFor` in `src/lib/submit.ts`). Apps
  Script Web Apps don't answer the CORS preflight that a JSON POST triggers,
  so a JSON content type fails in the browser before it is ever delivered.
  The body is still JSON. Any non-Apps-Script endpoint gets normal JSON, so
  switching to Formspree or a real backend needs no code change.
- **Editing the script later requires Deploy -> Manage deployments -> edit
  -> New version.** Saving alone does not update the live `/exec` URL.

Phone numbers are normalised to `+2547XXXXXXXX` on the way in, so the list
can be handed to a bulk SMS provider without further cleaning.

### 2. Send: WhatsApp Communities and SMS

The form requires **phone** and treats email as optional, so this is a phone
list. Email tooling (Mailchimp and friends) would reach only the minority
who filled that field in.

- **WhatsApp Communities, per ward** — the primary channel, and the one the
  site is already built around. The capture-then-reveal flow drops every
  signup into their ward's Community, and a Community broadcast is the send.
  Needs no new infrastructure, but the five links in `src/data/wards.ts` are
  still `null`, so this isn't live yet.
- **Bulk SMS** for reach beyond WhatsApp, via a Kenyan provider (Africa's
  Talking or similar) with a registered sender ID. The `Ward` and `utm_*`
  columns in the Sheet are what make targeted sends possible — a
  Kawangware-specific message to Kawangware only.

### 3. Unsubscribe (outstanding)

The lead form promises "Unsubscribe anytime" (`LeadCaptureForm.tsx`) and
there is currently **no mechanism behind that promise.** Under the Data
Protection Act 2019 it needs to be real. The `Leads` sheet has an
`Unsubscribed` column ready for it; the minimum workable version is
honouring "Reply STOP" on the SMS side and marking that column, and
filtering on it before every send.

## SEO, sharing, and analytics

- Per-page `<title>`/meta description via `src/components/SEO.tsx`
  (`react-helmet-async`), targeting queries like "Dagoretti North MP 2027".
- Open Graph + Twitter Card tags point at `/og-image.jpg` (1200×630, built
  from the real candidate portrait) so WhatsApp/Facebook shares render a
  proper preview card.
- `Person` and `Organization` JSON-LD are emitted on every page.
- `public/sitemap.xml` is regenerated from `src/config/features.json`
  before every build, so hidden pages never appear in it.
- Analytics (`src/lib/analytics.ts`) only load `VITE_GA_ID` /
  `VITE_META_PIXEL_ID` **after** explicit consent — `CookieConsent.tsx`
  defaults to the most privacy-preserving state (nothing loads until the
  visitor clicks Accept). Leave the env vars blank to disable trackers
  entirely.

## Real assets wired in

- `public/hero.jpg` — the real candidate portrait, used on the homepage
  hero, the About page, and the homepage bio teaser.
- `public/logo.png`, `public/favicon.png`, `public/apple-touch-icon.png` —
  derived from the campaign's `#PewaChange` mark, used in the header and
  browser tab/home-screen icon.
- `public/og-image.jpg` — a share card combining the real portrait with the
  headline, sized 1200×630 for WhatsApp/Facebook link previews.

If any of these are swapped for newer versions later, keep the same
filenames/paths so no code needs to change — just overwrite the file in
`public/`.

## Still pending before wider promotion

- `src/data/wards.ts` — real WhatsApp Community join links per ward (all 5
  are currently `null`).
- `src/data/stats.ts` — verified, sourced figures for `/stats`.
- `src/data/pillars.ts` — expanded, specific commitments in each `detail`
  field for `/plan`.
- `src/config/site.ts` — confirm social handles are live before adding them
  to `social` (all currently blank, so the footer simply omits those
  icons).
- `VITE_LEADS_ENDPOINT` / `VITE_CONTACT_ENDPOINT` — **not yet set.** Until
  they are, signups never reach the campaign (see "Wiring up lead capture
  and campaign updates" above). Highest priority.
- An unsubscribe mechanism, to back the promise the lead form already makes.

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in real values, or leave blank for local dev
npm run dev
```

## Building & deploying

```bash
npm run build     # regenerates sitemap.xml, type-checks, builds to dist/
npm run preview   # serve the production build locally
```

Deploy `dist/` to Vercel or Netlify:

- **Vercel:** `vercel --prod` (or connect the repo in the dashboard). Set
  `VITE_LEADS_ENDPOINT`, `VITE_CONTACT_ENDPOINT`, `VITE_GA_ID`,
  `VITE_META_PIXEL_ID` as Environment Variables in the project settings —
  Vite reads them at build time.
- **Netlify:** connect the repo, build command `npm run build`, publish
  directory `dist`. Set the same env vars under Site settings → Environment
  variables.

Both platforms need a SPA rewrite rule so client-side routes resolve
correctly:

- Vercel: `vercel.json` already has a rewrite of `/(.*)`→`/index.html`.
- Netlify: `public/_redirects` already contains `/* /index.html 200`.
