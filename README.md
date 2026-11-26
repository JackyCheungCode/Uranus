# Uranus / Mayhem Wheels replica

A Next.js reconstruction of the Mayhem Wheels storefront experience.

## Stack

- Next.js 16 App Router, React 19, TypeScript
- Cloudflare Workers deployment through OpenNext
- Responsive Mayhem-style storefront shell and shared footer
- Product catalog and configuration data in `src/data/wheels.ts`
- Verified SKU-level specification rows in `src/data/wheel-specs.ts`
- Product pages, wheel comparison, saved garage, and illustrative visualizer

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Data and fitment boundaries

- The catalog contains 38 wheel configuration records based on the current All Wheels collection.
- SKU specifications are shown only where sourced values are available. Missing rows are not inferred.
- The vehicle selector and saved garage use browser-local storage.
- Live vehicle-to-wheel fitment verification is not connected.
- The visualizer is an illustrative composition using Mayhem campaign photography and wheel imagery. It is not a 3D vehicle model and does not certify physical fitment.
- Product imagery currently references Mayhem's CDN directly; local asset mirroring has not been completed.

## Deployment

- The reconstruction is isolated on `rebuild/mayhem-reference-replica`.
- `main` and the production Worker remain unchanged pending review.
- Cloudflare Preview deployments remain disabled.
- GitHub Actions runs TypeScript and Next.js production-build checks on this branch.
- Do not merge or deploy until visual and functional acceptance is complete.
