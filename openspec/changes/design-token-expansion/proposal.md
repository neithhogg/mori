## Why

The current Mori token set covers colour, typography, spacing, radius, shadows, and motion — but lacks tokens for interactive element states (focus rings, disabled opacity), z-index layering, and a dark-mode theme layer. As ShiftMate and FaxBridge approach production, these gaps force engineers to hardcode values in components, undermining the single-source-of-truth token contract.

## What Changes

- Add a **focus-ring token group** — `--focus-ring-color`, `--focus-ring-width`, `--focus-ring-offset` — used consistently by all interactive components (buttons, inputs, links)
- Add a **disabled-state token** — `--opacity-disabled: 0.45` — replaces ad-hoc opacity values scattered across components
- Add a **z-index scale** — `--z-base`, `--z-dropdown`, `--z-sticky`, `--z-overlay`, `--z-modal`, `--z-toast` — eliminates magic numbers in layering
- Add a **surface-overlay token** — `--color-surface-overlay: rgba(0, 0, 0, 0.4)` — standardises the modal/drawer backdrop colour
- Add a **dark-mode theme layer** — all colour tokens redefined under `[data-theme="dark"]` on `<html>` — allows products to opt in to dark mode without rebuilding components
- Update `design-tokens` spec to reflect the new token groups and updated total count

## Capabilities

### New Capabilities

- `token-interactive-states`: Focus ring, disabled opacity, and surface overlay tokens for interactive element states
- `token-z-index`: Z-index scale tokens for consistent layering across all components and overlays
- `token-dark-mode`: Dark-mode theme layer — full colour token set redefined under `[data-theme="dark"]`, mapped to Mori's dark palette while preserving brand identity

### Modified Capabilities

- `design-tokens`: Token count and group list change — spec's total (currently 60) grows to cover new groups; the "six groups" rule expands to nine

## Impact

- `src/tokens/globals.css` — new `:root` blocks and `[data-theme="dark"]` selector block
- All existing components consume focus-ring and disabled-opacity tokens via Tailwind arbitrary-value syntax; no component logic changes, only class references update
- Products (ShiftMate, FaxBridge) must add a theme toggle mechanism to set `data-theme` on `<html>` — that work lives in product repos, not Mori DS
- No breaking changes to existing token names — additive only
