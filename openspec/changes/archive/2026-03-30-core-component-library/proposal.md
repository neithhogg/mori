## Why

The design system has tokens, specs, and CI — but zero React components. ShiftMate and FaxBridge cannot bootstrap from Mori until the specified components exist as importable `.tsx` files. The token layer is done; the component layer is the immediate dependency that unblocks both product repos.

## What Changes

- `src/components/ui/button.tsx` — `Button` with variants (`primary | secondary | ghost | destructive`), sizes (`sm | md | lg`), and loading state (`処理中...`)
- `src/components/ui/input.tsx` — `Input` with error and helper text slots, label above, error below
- `src/components/ui/card.tsx` — `Card` with `base | interactive | highlighted` variants
- `src/components/ui/badge.tsx` — `Badge` with 6 colour variants (`green | amber | red | blue | gray | brand`)
- `src/components/ui/skeleton.tsx` — `Skeleton` shimmer component; no spinners per design rules
- `src/components/ui/dialog.tsx` — `Dialog` (default and confirm variants); renders as bottom sheet on mobile (< 768px); includes focus trap and ESC close
- `src/components/ui/navigation.tsx` — `BottomTabBar` (mobile) and `Sidebar` (desktop)
- `src/index.ts` — updated to export all components above
- `src/components/ui/__tests__/` — Vitest tests for each component covering rendering, variant classes, and accessibility attributes

No new tokens are introduced. All Tailwind class strings reference existing CSS variables from `src/tokens/globals.css`. No existing token values change.

## Capabilities

### New Capabilities
- `button`: Button component — 4 variants, 3 sizes, loading state, disabled state, icon-only (`aria-label`) support
- `input`: Input component — full-width, sunken background, error/helper text slots, label above
- `card`: Card component — base, interactive (hover shadow), and highlighted (brand border) variants
- `badge`: Badge/Tag component — 6 colour variants mapping to semantic token pairs
- `skeleton`: Skeleton shimmer component — `animate-pulse` on `--color-surface-sunken`; used for all loading states
- `dialog`: Dialog component — default and confirm variants, mobile bottom-sheet, focus trap, ESC/overlay close, loading state on confirm action
- `navigation`: Navigation components — `BottomTabBar` (mobile ≤768px, 4-5 items) and `Sidebar` (desktop ≥768px, collapsible)

### Modified Capabilities

## Impact

- New directory: `src/components/ui/` (7 component files + test suite)
- Modified: `src/index.ts` — adds component exports
- New peer dependency: `lucide-react` (icons used in navigation and empty states)
- No breaking changes — additive only
- Rollback: delete `src/components/` directory; revert `src/index.ts`
