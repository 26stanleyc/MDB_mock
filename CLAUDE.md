@AGENTS.md

## Project structure

```
src/
  app/              routes, one file per screen
    (app)/          tabs: Home, Wallet, Forms
  features/         one folder per feature (onboarding, home, wallet, forms, ...)
    <feature>/      its screen.tsx, components/, api.ts
  components/ui/    shared pieces
  lib/              api client, auth, storage
  global.css        theme colors and fonts
backend/            the scraper
```

## Rules

- Files in `src/app/` only point to a feature screen, e.g. `export { default } from '@/features/wallet/screen';`. Screen code lives in `src/features/<feature>/`.
- A component used by one feature goes in that feature's `components/`. Move it to `src/components/ui/` once a second feature needs it.
- Theme first: colors and fonts come from `src/global.css` and `src/constants/theme.ts`. Don't hardcode hex values in screens.
- Don't add packages without asking.
