# Backend

Supabase holds login (anonymous) and the database. `scrape.mjs` fills it from classaction.org every day via GitHub Actions.

| Slide    | Where it lives |
| -------- | -------------- |
| Collect  | `scrape.mjs`, run daily by `.github/workflows/scrape.yml`; upserts by slug, so new settlements are added and existing ones refreshed |
| Store    | `schema.sql`: `settlements`, `profiles` (picked brands), `claims` (each claim is also the user's form) |
| Match    | Onboarding saves brands to `profiles`; Home loads open settlements for those brands |
| Track    | `claims` with Row Level Security: users read and file only their own; `unique (user_id, settlement_id)` blocks duplicate claims; Realtime pushes changes to Wallet and Forms |

## Setup

1. Create a project at supabase.com.
2. Authentication → Sign In / Providers → turn on **Allow anonymous sign-ins**.
3. SQL Editor → paste `schema.sql` → Run.
4. Project Settings → API Keys: copy the URL and publishable key into `.env.local` (see `.env.example`), then restart `npx expo start`.
5. Fill the database once: `SUPABASE_URL=... SUPABASE_SECRET_KEY=... node backend/scrape.mjs`
6. GitHub repo → Settings → Secrets and variables → Actions: add `SUPABASE_URL` and `SUPABASE_SECRET_KEY` so the daily run works.

Claim statuses (`pending` → `payment_sent` / `case_closed`) are changed in the Supabase Table Editor; the app updates live.
