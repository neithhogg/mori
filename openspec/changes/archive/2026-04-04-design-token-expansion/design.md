## Context

`src/tokens/globals.css` currently defines 60 tokens across six groups (colour, typography, spacing, radius, shadows, motion). As ShiftMate and FaxBridge move toward production, three recurring gaps appear in component work:

1. **Focus visibility** — every interactive component duplicates an ad-hoc focus ring style. Browser defaults are ugly and inconsistent across macOS/iOS/Android. No shared token governs ring width or colour.
2. **Disabled states** — opacity values for disabled elements are hardcoded per-component (0.4, 0.5, 0.45). Inconsistent and impossible to update globally.
3. **Z-index collisions** — dropdowns, modals, toasts, and sticky headers fight for z-index supremacy with magic numbers (10, 100, 9999). No defined layering scale.
4. **Dark mode readiness** — Japanese mobile users expect dark mode (iOS and Android system preference). Without a structured token layer, adding dark mode later requires touching every component.

All changes land exclusively in `globals.css`. No component API changes. Products consume dark mode via `data-theme="dark"` on `<html>`.

## Goals / Non-Goals

**Goals:**

- Add 3 focus-ring tokens, 1 disabled-opacity token, 1 surface-overlay token, and 6 z-index tokens to `:root`
- Add a complete `[data-theme="dark"]` block that redefines all colour tokens for dark mode
- Keep changes additive — no renames, no removals, no breaking changes
- Update the `design-tokens` spec to reflect new groups and updated token count
- Write specs for the three new capability areas

**Non-Goals:**

- Theme toggle UI — products implement their own toggle; Mori DS only defines the CSS contract
- System preference auto-detection (`prefers-color-scheme`) — intentionally deferred; products opt in when ready
- Dark mode for typography, spacing, radius, shadow, or motion tokens — only colour tokens have dark variants (the others are theme-agnostic)
- iOS / SwiftUI token mapping for dark mode — Phase 2

## Decisions

### Decision 1: `data-theme` attribute over `prefers-color-scheme` media query

**Choice:** Dark mode is activated via `[data-theme="dark"]` on `<html>`, not `@media (prefers-color-scheme: dark)`.

**Rationale:** Japanese SMB users often share devices (POS terminals, shared tablets at a restaurant). A user-controlled toggle is safer than inheriting the OS preference silently. Products can still wire the toggle to `prefers-color-scheme` on their own if they choose — the CSS contract is the same either way. Using an attribute also makes the theme deterministic in Playwright tests.

**Alternative considered:** Media query only — rejected because it removes product-level control and complicates testing.

### Decision 2: Single flat `[data-theme="dark"]` block, not a separate file

**Choice:** All dark-mode overrides live in `globals.css` inside one `[data-theme="dark"]` selector block, not in a separate `dark.css`.

**Rationale:** Products import one file. A separate file introduces import-order coupling and makes it easier for products to forget the second file. Keeping everything in `globals.css` mirrors how locale overrides (`[data-locale]`) are already handled in the same file — consistency reduces surprise.

**Alternative considered:** Separate `dark-tokens.css` — rejected due to import fragility and inconsistency with existing locale pattern.

### Decision 3: Focus ring colour anchored to `--color-brand`, not a separate hue

**Choice:** `--focus-ring-color` is set to `--color-brand` (森緑 green) in light mode and adjusted slightly in dark mode.

**Rationale:** Mori's brand green is already sufficiently distinct from all surface colours. Introducing a new hue (blue, purple) for focus would conflict with semantic colour meanings (info = blue). Japanese users associate the green ring with the product, not with a browser default.

### Decision 4: Z-index scale anchored to named semantic layers, not a numeric sequence

**Choice:** Six named layers — `--z-base`, `--z-dropdown`, `--z-sticky`, `--z-overlay`, `--z-modal`, `--z-toast` — with values 0, 100, 200, 300, 400, 500.

**Rationale:** Semantic names communicate intent. Values spaced by 100 leave room for product-specific intermediate layers without forking the scale. Base at 0 (not 1) because `z-index: 0` is a valid stacking context reset.

## Risks / Trade-offs

- **Dark palette maintenance** — every new colour token added to `:root` in the future must also get a dark variant. This is a discipline cost. Mitigation: the `design-tokens` spec will encode a rule requiring dark variants for every colour token.
- **Tailwind v3 arbitrary-value syntax** — tokens like `--z-modal` require `z-[var(--z-modal)]` in Tailwind classes, which is verbose. Mitigation: document the pattern clearly; consider adding to Tailwind config as named utilities in a future change.
- **`data-theme` on `<html>` during SSR** — Server Components render before the client knows the user's theme preference, causing a flash of light mode. Mitigation: products set `data-theme` via a blocking inline script in `<head>` reading `localStorage`; this is a product-level concern documented in the spec.

## Migration Plan

1. Add new tokens to `globals.css` (additive — no migration of existing code required)
2. Update `design-tokens` spec with new group list and token count
3. Create new specs for `token-interactive-states`, `token-z-index`, and `token-dark-mode`
4. Existing components continue to work unchanged — adoption of new tokens is incremental, driven per-component as engineers touch them

Rollback: remove the additive blocks from `globals.css`. No data migrations. No API changes.

## Open Questions

- Should `--opacity-disabled` be a standalone token or a CSS variable alias (e.g., `--color-ink-disabled: color-mix(in srgb, var(--color-ink) 45%, transparent)`)? A colour-mix alias would be more semantically precise but reduces compatibility with older Safari. Decision deferred to specs phase.
