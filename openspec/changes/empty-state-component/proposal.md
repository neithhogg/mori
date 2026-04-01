## Why

Every data view in ShiftMate and FaxBridge — shift lists, fax logs, search results — can return zero items, and there is currently no standard pattern for rendering that state. Without a shared component, each product team would invent ad-hoc "no data" screens that break visual consistency and miss the Japanese UX expectations (friendly, encouraging tone rather than a cold system message).

## What Changes

- New `EmptyState` component in `src/components/ui/empty-state.tsx`
- Optional Lucide icon slot, required heading, optional description, optional CTA button
- Locale-aware copy via `useCopy()` (ja / en / zh-Hans)
- Vitest unit tests covering all prop combinations and locale output
- New `EmptyState` section added to the component showcase

## Capabilities

### New Capabilities

- `empty-state`: A composable empty-state display component with icon, heading, description, and optional CTA — used whenever a data view returns zero results.

### Modified Capabilities

- `localisation-copy`: Add empty-state copy keys (`emptyState.heading` and `emptyState.description`) to the `MoriCopy` catalogue for all three locales.

## Impact

- **New file**: `src/components/ui/empty-state.tsx`
- **New test file**: `src/components/ui/__tests__/empty-state.test.tsx`
- **Modified**: `src/lib/locale/copy.ts` — extend `MoriCopy` type with `emptyState` copy keys
- **Modified**: `src/index.ts` — export `EmptyState` and its props type
- **Modified**: `showcase/src/App.tsx` and `showcase/src/sections/` — add EmptyState demo section
- **Dependencies**: Lucide React (already installed), existing `Button` component, existing `useCopy()` hook
