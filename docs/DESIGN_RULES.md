# Design Rules — BMW Wheel Store

This project uses the uploaded `bmw.design.md` as its visual reference, narrowed by the project's explicit implementation constraints below. The reference is a design extraction, not permission to use BMW trademarks, licensed fonts, logos, or official photography.

## Non-negotiable constraints

1. Every corner radius is `0px`. Do not use rounded corners or pill shapes.
2. Brand action color is only `#1c69d4`. Other interface colors must be black, white, or gray.
3. Use brand blue only for primary actions and other essential interactive emphasis.
4. Headings are uppercase and weight 700. Body copy is weight 300.
5. Use Inter only. Do not use BMW Type Next or other BMW-licensed fonts.
6. Build with React, Tailwind CSS, and shadcn/ui conventions. Reuse shared components instead of one-off styling.
7. Do not use BMW logos, BMW official photography, or imply official affiliation.
8. After implementation work, report the design tokens used and disclose any deviations.

## Design principles adapted from bmw.design.md

- Rectangular geometry and clear alignment.
- Photography-led product presentation; no drop shadows.
- Use background contrast and spacing to establish hierarchy.
- Use a restrained grayscale foundation and a single blue action color.
- Keep editorial spacing generous while allowing dense product specifications.
- Maintain responsive layouts: one column on small screens, two on tablet, and three or four on desktop where appropriate.
- Interactive targets should be comfortably usable on touch devices.

## Token source

The canonical implementation is in `src/app/globals.css`. Do not hardcode new color, font, radius, or spacing values in page components when a token or utility exists.

## Component policy

Use shared components from `src/components/ui` for buttons, cards, and form controls. Add new shadcn/ui components to that directory and apply the same constraints before using them in routes.

## Review checklist

- [ ] No non-zero border radius.
- [ ] No shadows.
- [ ] No colors outside the approved blue / black / white / gray palette.
- [ ] Blue is reserved for primary actions.
- [ ] Headings are uppercase, weight 700.
- [ ] Body text uses Inter weight 300.
- [ ] No BMW logos, licensed fonts, or official imagery.
- [ ] Routes remain separate and directly addressable.
- [ ] Shared components are reused.
- [ ] Design tokens and deviations are reported.
