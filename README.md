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

## Cloudflare deployment boundary

The existing `wrangler.jsonc` and `src/index.js` are retained as the current production Worker entrypoint. They are intentionally not repointed or replaced during this foundation phase.

The Next.js-to-Workers adapter is not yet selected. The next technical gate is a preview-only compatibility spike covering Next.js App Router, PDS React SSR, Tailwind CSS 4, and the chosen Cloudflare runtime (including a comparison of Cloudflare's current Vinext recommendation with the OpenNext route). No production deployment is configured by this branch.

## Project principles

- Keep `main` and the current production Worker unchanged until preview acceptance.
- Keep wheel product, finish, configuration, SKU, and vehicle fitment data explicit and verifiable.
- Treat visualizer previews separately from authoritative fitment validation.
- Rebuild interaction and information architecture without copying third-party brand assets or protected content.
