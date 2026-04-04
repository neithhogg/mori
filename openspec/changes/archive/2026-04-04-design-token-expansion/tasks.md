## 1. Interactive State Tokens

- [x] 1.1 Add `--focus-ring-color`, `--focus-ring-width`, `--focus-ring-offset` to `:root` in `src/tokens/globals.css`
- [x] 1.2 Add `--opacity-disabled: 0.45` to `:root` in `src/tokens/globals.css`
- [x] 1.3 Add `--color-surface-overlay: rgba(0, 0, 0, 0.4)` to `:root` in `src/tokens/globals.css`
- [x] 1.4 Update Button component to use `var(--focus-ring-color)`, `var(--focus-ring-width)`, `var(--focus-ring-offset)` for its focus ring style
- [x] 1.5 Update Input component to use the same focus ring tokens
- [x] 1.6 Replace any hardcoded disabled opacity values in Button and Input with `var(--opacity-disabled)`
- [x] 1.7 Update Dialog/Sheet backdrop to use `var(--color-surface-overlay)` instead of any hardcoded rgba

## 2. Z-Index Scale Tokens

- [x] 2.1 Add `--z-base: 0`, `--z-dropdown: 100`, `--z-sticky: 200`, `--z-overlay: 300`, `--z-modal: 400`, `--z-toast: 500` to `:root` in `src/tokens/globals.css`
- [x] 2.2 Audit all component and layout files for hardcoded `z-index` integers — replace each with the appropriate `var(--z-*)` token
- [x] 2.3 Verify Navigation sticky header uses `var(--z-sticky)` (BottomTabBar uses `fixed` positioning — no explicit z-index; no sticky header component exists yet)
- [x] 2.4 Verify Dialog backdrop uses `var(--z-overlay)` and Dialog panel uses `var(--z-modal)`
- [x] 2.5 Verify any toast/notification component uses `var(--z-toast)` (no toast component exists yet — token is available for when it is built)

## 3. Dark Mode Token Layer

- [x] 3.1 Design the dark colour palette: map each of the 19 `:root` colour tokens to dark-mode equivalents (use WCAG AA contrast checker — target ≥4.5:1 for body text)
- [x] 3.2 Add `[data-theme="dark"]` block to `src/tokens/globals.css` overriding all 19 colour tokens plus `--focus-ring-color` and `--color-surface-overlay`
- [x] 3.3 Verify the dark block contains exactly the same colour token names as `:root` — no omissions, no extras (enforced by test 5.5)
- [ ] 3.4 Manually smoke-test dark mode by setting `data-theme="dark"` on `<html>` in the browser and visually inspecting Button, Input, Card, Badge, and Navigation components

## 4. Spec Sync

- [x] 4.1 Sync the updated `design-tokens` delta spec into the main spec at `openspec/specs/design-tokens/spec.md` (update group count from 6→9 and token total)
- [x] 4.2 Promote `token-interactive-states` spec to `openspec/specs/token-interactive-states/spec.md`
- [x] 4.3 Promote `token-z-index` spec to `openspec/specs/token-z-index/spec.md`
- [x] 4.4 Promote `token-dark-mode` spec to `openspec/specs/token-dark-mode/spec.md`

## 5. Tests and Verification

- [x] 5.1 Run `pnpm lint` — confirm no new lint errors
- [x] 5.2 Run `pnpm typecheck` — confirm no TypeScript errors (pre-existing failures in test files only, unchanged)
- [x] 5.3 Run `pnpm test` — confirm all existing tests pass
- [x] 5.4 Write a Vitest test that parses `globals.css` and asserts all 71 `:root` tokens are present by name
- [x] 5.5 Write a Vitest test that asserts all colour tokens in `:root` have a matching override in `[data-theme="dark"]`
