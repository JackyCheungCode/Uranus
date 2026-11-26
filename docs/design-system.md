# Uranus Design System

## Design direction

The interface combines high-contrast motorsport editorial art direction with the measured typography, spacing discipline, and component consistency of Porsche Design System v4. The brand layer is Uranus; PDS is the implementation foundation, not a source of Porsche brand identity.

## Principles

1. **Precision before decoration** — use alignment, measured spacing, engineering labels, and real technical information instead of ornamental effects.
2. **Product-first imagery** — wheels are presented as products with clear silhouette, finish, and dimensional detail. Use licensed or owned imagery.
3. **Editorial hierarchy** — large concise headlines, small uppercase metadata, restrained body copy.
4. **Functional contrast** — dark campaign surfaces contrast with neutral product and specification surfaces.
5. **Truthful specifications** — never invent load ratings, offsets, bolt patterns, bore sizes, weights, certifications, or fitment compatibility.
6. **Accessible interaction** — visible keyboard focus, semantic controls, reduced-motion support, and responsive touch targets.

## Foundations

- Brand ink: `#111214`
- Paper: `#f5f5f3`
- White surface: `#ffffff`
- Muted text: `#777b80`
- Hairline: `#d8dadb`
- Accent metal: `#aeb8bf`
- Base spacing: 4px
- Header: 76px desktop / 68px mobile
- Sidebar: 68px desktop; hidden below the desktop breakpoint
- Content max width: 1440px
- Motion: 140–420ms, standard easing; respect reduced-motion preferences

Tokens live in `src/styles/tokens.css`.

## Typography

Use the Porsche Next family supplied through the installed PDS package, with a system sans-serif fallback. Use display typography sparingly for campaign statements. Product names and section headings should remain legible and compact. Technical values may use a monospaced face for tabular alignment.

## Layout

- Desktop: fixed global header, fixed collapsible-capable left rail, content offset by the rail.
- Tablet/mobile: header navigation becomes a menu/drawer; sidebar is removed from the content flow.
- Main content uses a consistent page gutter and a maximum content width.
- Product grids use responsive columns and consistent image aspect ratios.
- Specification tables prioritize alignment and scanability over card decoration.

## Components

Shared primitives are in `src/components/ui`:
- `Container`: content width and page alignment
- `Eyebrow`: section index and engineering metadata
- `SectionHeading`: section hierarchy
- `ActionLink`: consistent primary editorial action

Use PDS React components for appropriate interactive controls and form elements. Do not recreate complex accessible controls when an equivalent PDS component exists.

## Interaction states

Every interactive component must define default, hover, focus-visible, active, disabled, and (where applicable) loading/error states. Focus rings must not rely on color alone. Avoid hover-only affordances.

## Image and content rules

- Product photography: clean isolated product views for catalogue cards; contextual vehicle photography for campaign banners.
- Never hotlink unlicensed imagery or copy Mayhem Wheels product images, copy, or brand marks.
- Do not display illustrative geometry as if it were a real wheel render.
- Visualizer output is illustrative; fitment confirmation is a separate data-backed process.

## Quality gates

Before a page is considered complete:
- Verify desktop, tablet, and mobile layouts.
- Verify keyboard navigation and visible focus.
- Check reduced-motion behavior.
- Confirm typography and spacing use shared tokens.
- Confirm no invented product or fitment specifications.
- Run lint, typecheck, and production build in CI or a local Node environment.
