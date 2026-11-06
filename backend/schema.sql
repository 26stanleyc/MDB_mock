-- Run once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Safe to re-run: every statement checks before creating.

-- Settlements: written only by the scraper (secret key), readable by every signed-in user.
create table if not exists public.settlements (
  id text primary key,                 -- classaction.org slug, e.g. 'cvs-data-privacy'
  brand text not null,                 -- 'CVS'
  title text not null,                 -- 'CVS - Data Privacy Class Action Settlement'
  payout text not null,                -- as shown on the site: '$5 - $10', 'Varies'
  payout_max numeric,                  -- largest dollar amount in payout, for the wallet total
  deadline date,
  proof_required boolean,
  category text not null default 'Other',  -- Privacy | False Ads | Overbilling | Other
  featured boolean not null default false,
  description text not null default '',
  claim_url text not null,
  image_url text,
  claim_count integer not null default 0,  -- kept up to date by the trigger below
  first_seen_at timestamptz not null default now(),
  scraped_at timestamptz not null default now()
);

-- Profiles: one row per user with the brands they picked in onboarding.
create table if not exists public.profiles (
  user_id uuid primary key default auth.uid() references auth.users on delete cascade,
  brands text[] not null default '{}',
  created_at timestamptz not null default now()
);

-- Claims: a user's claim on a settlement. The Forms tab lists these too (one form per claim).
create table if not exists public.claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  settlement_id text not null references public.settlements on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'payment_sent', 'case_closed')),
  created_at timestamptz not null default now(),
  unique (user_id, settlement_id)      -- a user can't file the same claim twice
);

-- Table access for the API roles; RLS below narrows it to the user's own rows.
grant select on public.settlements to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert on public.claims to authenticated;
grant all on public.settlements, public.profiles, public.claims to service_role;

-- Row Level Security: users only ever see and write their own rows.
alter table public.settlements enable row level security;
alter table public.profiles enable row level security;
alter table public.claims enable row level security;

drop policy if exists "read settlements" on public.settlements;
create policy "read settlements" on public.settlements
  for select to authenticated using (true);

drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles
  for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "read own claims" on public.claims;
create policy "read own claims" on public.claims
  for select to authenticated using (user_id = auth.uid());

-- Users can only create pending claims for themselves; status changes come from the dashboard.
drop policy if exists "file own claims" on public.claims;
create policy "file own claims" on public.claims
  for insert to authenticated with check (user_id = auth.uid() and status = 'pending');

-- Count claims per settlement without letting users read each other's claims.
create or replace function public.bump_claim_count() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  update settlements set claim_count = claim_count + 1 where id = new.settlement_id;
  return new;
end $$;

drop trigger if exists claims_bump_count on public.claims;
create trigger claims_bump_count after insert on public.claims
  for each row execute function public.bump_claim_count();

-- Only the trigger should run it, not API callers (triggers don't need EXECUTE to fire).
revoke execute on function public.bump_claim_count() from public, anon, authenticated;

-- Realtime: Wallet and Forms update as soon as a claim is added or its status changes.
do $$ begin
  alter publication supabase_realtime add table public.claims;
exception when duplicate_object then null;
end $$;
