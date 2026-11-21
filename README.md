# Tamir Bakery (מאפיית תמיר)

Web store for a home bakery. Hebrew first (RTL), English second. Next.js (App Router, TypeScript) on Firebase App Hosting, with Firestore.

- Plan and decisions: [docs/PLAN.md](docs/PLAN.md)
- Design system: [docs/DESIGN.md](docs/DESIGN.md)
- Dev site: https://tamir-bakery--tamir-bakery-dev.europe-west4.hosted.app

## Develop

Node 24. Copy `.env.example` to `.env.local` and fill it in.

```sh
npm ci
npm run dev          # http://localhost:3000
```

## Test

Every feature ships with its tests, and accessibility (IS 5568 / WCAG AA) is checked in both layers.

```sh
npm run lint
npm run typecheck
npm test             # Vitest + Testing Library + vitest-axe
npm run build
npx playwright install chromium   # once
npm run test:e2e     # Playwright + axe against the production build, phone and desktop
npm run test:speed   # Lighthouse speed budget against the production build (lighthouserc.json)
npm run test:rules   # Firestore security rules on the emulator (needs Java 21+)
```

Run the e2e tests against a deployed URL with `E2E_BASE_URL=https://... npm run test:e2e`.

## Deploy

Pushing to `main` runs CI and then deploys to App Hosting (`.github/workflows/deploy.yml`). See "Tech stack and hosting" in the plan for how auth and secrets work.
