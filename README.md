# Uranus Wheels

A precision-engineered wheel brand website, rebuilt on Next.js and Porsche Design System v4.

## Current foundation

- Next.js 16 App Router, React 19, and TypeScript
- Porsche Design System v4 React SSR provider and official stylesheet
- Tailwind CSS 4 with the PDS theme
- Initial responsive brand landing-page shell
- Global typography, metadata, and PDS resource preloads

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

## Cloudflare deployment

- Next.js is deployed to Cloudflare Workers through `@opennextjs/cloudflare`.
- `wrangler.jsonc` targets `.open-next/worker.js` with `nodejs_compat` and static assets binding.
- Production builds run through Cloudflare Workers Builds on `main`; Preview deployments are disabled.
- Run `npm run deploy` only when intentionally publishing directly from a configured Cloudflare environment.

## Project principles

- Keep `main` and the current production Worker unchanged until preview acceptance.
- Keep wheel product, finish, configuration, SKU, and vehicle fitment data explicit and verifiable.
- Treat visualizer previews separately from authoritative fitment validation.
- Rebuild interaction and information architecture without copying third-party brand assets or protected content.
