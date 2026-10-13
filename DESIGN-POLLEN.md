# "Pollen" redesign — what changed

Public site only. Owner OS, API routes, Supabase and analytics are untouched.

## Files
- `app/globals.css` — rewritten design system (owner-area base styles kept at the bottom).
- `app/layout.js` — loads Bricolage Grotesque (self-hosted via @fontsource, no Google request), favicon, theme colour.
- `app/page.js`, `app/services/page.js`, `app/contact/page.js` — new layouts and copy.
- `components/SiteNav.js` (mobile menu added), `SiteFooter.js`, `PostcodeCheck.js`, `SeasonAlmanac.js`, `Icons.js` — new/updated.
- `components/LeadForm.js` — chip selectors; **same field names and values**, so `/api/leads` is unchanged. Prefills postcode from `?postcode=`.
- `lib/content.js` — all public copy, services, seasons, places and postcode list in one file.
- `public/logo-mark.webp|png`, `logo-mark-96.png` — transparent versions of the supplied logo (same artwork, background removed). `logo.jpg` kept for the owner area.

## Owner decisions still open
- `usualOutwardCodes` in `lib/content.js` is a first guess at the service area (Cardiff + Vale CF codes). Edit when the radius is final.
- The "£75 per visit" guide price was removed from Services until prices are approved.
- Waste wording follows the brief (not included by default; agreed at quote).
- Companion gardening is not listed until its definition is confirmed.
- A privacy policy page is still needed (needs the business's data-controller details).

## Install
`npm i` (adds `@fontsource-variable/bricolage-grotesque`), then build as usual.
