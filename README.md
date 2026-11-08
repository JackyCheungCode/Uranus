# Uranus — BMW Wheel Store

A multi-route wheel discovery and fitment storefront built with Next.js App Router, React, TypeScript, Tailwind CSS v4, and shadcn/ui conventions.

## Routes

- `/` — Home
- `/wheels` — Wheel catalog
- `/wheels/[slug]` — Wheel detail
- `/vehicle-fitment` — Vehicle fitment lookup
- `/configurator` — Wheel configurator
- `/about` — About the store
- `/contact` — Contact

## Getting started

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Design system

The project design constraints live in [docs/DESIGN_RULES.md](docs/DESIGN_RULES.md) and are implemented in `src/app/globals.css`. Do not introduce one-off colors, rounded corners, shadows, or local component styling exceptions.
