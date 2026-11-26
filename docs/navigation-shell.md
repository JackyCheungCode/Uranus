# Global Navigation Shell

The shared shell is mounted from the root App Router layout so every route receives the same navigation frame.

## Desktop

- Fixed global header with primary navigation and a fitment call-to-action.
- Fixed left navigation rail with six primary destinations.
- Rail defaults to compact mode (68px) and can expand to 224px.
- Main content reads the live `--u-sidebar-current-width` CSS custom property so the page grid tracks the rail state.

## Mobile

- The desktop rail and inline navigation are hidden.
- A menu control opens a full-width navigation drawer below the fixed header.
- Selecting a destination closes the drawer; clicking the backdrop or pressing Escape also closes it.
- The fitment action remains available inside the drawer.

## Implementation

- `src/components/layout/site-shell.tsx` owns navigation state and responsive behavior.
- `src/app/layout.tsx` mounts the shell globally inside the PDS SSR provider.
- Page content must not implement a second global header or sidebar.
- Use the shared design tokens for header height, sidebar width, layering, color, and motion.

## Follow-up quality gates

The implementation still requires browser verification at desktop, tablet, and mobile widths, plus keyboard/focus review. The mobile drawer should receive a focus-management pass (initial focus, focus containment, and focus restoration) before production acceptance.
