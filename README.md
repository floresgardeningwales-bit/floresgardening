# Flores Garden OS

A Next.js + Supabase owner operating system and public website for a premium gardening business focused on garden maintenance, specialist pruning, fruit trees, planting and wildlife-friendly gardening.

## Product direction

This is deliberately **not** a landscaping-company template. The product is built around recurring garden care, horticultural knowledge, affluent-area targeting and route-efficient operations.

### Public website
- Premium, calm gardening brand
- Services and service-area positioning
- Lead/quote enquiry form
- Wildlife-friendly differentiator
- Mobile-first CTA

### Owner OS
- Today / overview
- Customers and customer history
- Jobs and quotes
- Calendar
- Revenue and finance
- Analytics
- Marketing source tracking
- Settings

### Analytics designed for gardening
- Leads by source
- Enquiry-to-quote rate
- Quote-to-booking rate
- Average job value
- Revenue by service
- Recurring customer rate
- Revenue per working hour
- Revenue by postcode sector
- Route density / jobs per area (phase 2)
- Seasonal service demand

## Local setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Copy `.env.example` to `.env.local` and fill in the Supabase values.
4. Create an owner user in Supabase Auth and insert their `staff_profiles` row as `owner`.
5. Run:

```bash
npm install
npm run dev
```

## Vercel

Import the repository into Vercel and add the same environment variables. No service-role key is exposed to the browser; it is only used by server-side owner routes.

## GitHub

```bash
git init
git add .
git commit -m "Initial Flores Garden OS"
git branch -M main
git remote add origin <your-github-repo>
git push -u origin main
```

## Next build phases

1. Supabase-backed job creation/editing and customer history.
2. Quote builder with service-specific pricing rules.
3. Recurring maintenance plans.
4. Stripe payments and invoices.
5. Route planning and postcode clustering.
6. Weather-aware scheduling.
7. Google Business / review workflow.
8. Marketing campaigns and consent management.
9. Owner AI assistant for quote prep, follow-ups and weekly business review.
