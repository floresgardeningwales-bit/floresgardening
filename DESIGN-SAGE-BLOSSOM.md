# Flores Gardening — Sage & Blossom

This revision builds on the Pollen redesign and supersedes its colour direction.

## Direction
- Forest ink #263f32, soft sage #e5ecdf, warm ivory #faf9f5 and muted lilac #ddd2e7.
- Original logo preserved, framed by a lilac arch.
- Editorial serif headings with Bricolage body text; no new font dependency.
- Direct quote link in the hero; postcode checker retained in the service-area section.
- Sage and lilac service panels, dark-green wildlife section, softer seasonal colours.
- Matching navigation, services, contact, focus and hover treatments.
- Mobile layout keeps the message and action before the brand illustration.

## Review
Open DESIGN-PREVIEW.html directly in a browser. It is self-contained and includes home, services and contact, postcode checks and seasonal tabs. Its enquiry form deliberately does not send or save data. The preview is generated from the production page markup, with lightweight local interaction equivalents; it is not the production application.

## Production
Run npm ci and npm run build. Deploy the full project using your existing Next.js/Vercel setup and existing Supabase environment variables. No production deployment was performed in this revision.

The public forms, server API routes, owner-area components, analytics and database schema remain as in the supplied Pollen project. Existing Supabase credentials are still required for live enquiries and owner access.

## Verification
Production build passed. Public routes prerender successfully. Browser visual and interaction QA was unavailable in this environment. Live Supabase enquiry submission was not tested. Review desktop and mobile using the preview before deploying.
