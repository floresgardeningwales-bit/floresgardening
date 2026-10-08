create extension if not exists "pgcrypto";

create table if not exists public.staff_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'owner' check (role in ('owner','staff')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  address_line1 text,
  town text,
  postcode text,
  notes text,
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  postcode text,
  service_interest text,
  garden_size text,
  frequency text,
  ecological_interest boolean not null default false,
  source text,
  message text,
  status text not null default 'new' check (status in ('new','contacted','quoted','won','lost','spam')),
  quoted_amount_pence integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete set null,
  title text not null,
  service_type text not null,
  postcode text,
  job_date date,
  start_time time,
  end_time time,
  status text not null default 'scheduled' check (status in ('quoted','scheduled','in_progress','completed','cancelled')),
  recurring boolean not null default false,
  recurrence text,
  amount_pence integer not null default 0,
  estimated_hours numeric(6,2),
  actual_hours numeric(6,2),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete set null,
  job_id uuid references public.jobs(id) on delete set null,
  amount_pence integer not null check (amount_pence >= 0),
  status text not null default 'paid' check (status in ('paid','refunded','pending')),
  paid_at timestamptz,
  method text,
  created_at timestamptz not null default now()
);

create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  path text not null,
  visitor_id text,
  referrer text,
  created_at timestamptz not null default now()
);

create table if not exists public.marketing_events (
  id bigint generated always as identity primary key,
  event_name text not null,
  source text,
  medium text,
  campaign text,
  landing_path text,
  lead_id uuid references public.leads(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.business_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_idx on public.leads(created_at desc);
create index if not exists leads_postcode_idx on public.leads(postcode);
create index if not exists jobs_date_idx on public.jobs(job_date, start_time);
create index if not exists jobs_postcode_idx on public.jobs(postcode);
create index if not exists payments_paid_idx on public.payments(paid_at);
create index if not exists page_views_created_idx on public.page_views(created_at);

alter table public.staff_profiles enable row level security;
alter table public.customers enable row level security;
alter table public.leads enable row level security;
alter table public.jobs enable row level security;
alter table public.payments enable row level security;
alter table public.page_views enable row level security;
alter table public.marketing_events enable row level security;
alter table public.business_settings enable row level security;

-- All application reads/writes are performed through server routes using SUPABASE_SECRET_KEY.
-- There are deliberately no public SELECT/INSERT policies on business data.
-- Never expose the secret key in NEXT_PUBLIC_* variables.

insert into public.business_settings(key,value) values
('brand', '{"name":"Flores","strapline":"Beautiful gardens, thoughtfully maintained.","phone":"","email":""}'::jsonb),
('pricing', '{"maintenance_hourly_pence":3800,"specialist_hourly_pence":4500,"minimum_visit_pence":7500}'::jsonb),
('service_areas', '{"postcodes":["CF71","CF64","CF15","CF5","NP15","NP25","NP16","CF23","SA3"]}'::jsonb)
on conflict (key) do nothing;
