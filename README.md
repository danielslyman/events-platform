# Events Platform — synthetic foundation

This feature branch contains **unverified** U1/U2/U3/U5 starter code. It does not ingest real event data, create a running website, or complete U0. Read `docs/plans/2026-11-10-1931-product-events-platform-plan.md` and the `docs/design/` contracts before extending it.

## Intended local verification

```bash
corepack enable
pnpm install
pnpm typecheck
pnpm test
```

GitHub Actions runs these checks on pushes and pull requests. Until a successful run is observed, do not claim tests pass.

## Safety boundary

The ingestion adapter accepts only explicitly rights-approved sources in synthetic mode; `ingestionAllowed(source, true)` returns false even for approved source fixtures. This is intentionally stricter than production readiness. U0 source authorization, rights review, and observed Munich coverage must be completed before any production adapter or public listing.

## Current omissions

No database migration, persistence, live source connector, review dashboard, search UI, booking flow, or deployed API is included. Domain schemas and pure functions are initial code contracts, not completed U1–U5.
