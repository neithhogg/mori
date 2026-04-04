## ADDED Requirements

### Requirement: Dark mode colour tokens defined under [data-theme="dark"]
`globals.css` SHALL define a `[data-theme="dark"]` selector block on the `<html>` element that overrides every colour token defined in `:root`. Non-colour token groups (typography, spacing, radius, shadows, motion) SHALL NOT be overridden — they are theme-agnostic.

#### Scenario: Dark mode block present
- **WHEN** `globals.css` is parsed
- **THEN** it SHALL contain a `[data-theme="dark"]` selector block with overrides for all colour tokens defined in `:root`

#### Scenario: Every colour token has a dark variant
- **WHEN** the list of colour tokens in `:root` is compared to the list in `[data-theme="dark"]`
- **THEN** every token present in `:root` SHALL also be present in `[data-theme="dark"]` — no colour token is left without a dark override

#### Scenario: Non-colour tokens are not duplicated in dark block
- **WHEN** the `[data-theme="dark"]` block is parsed
- **THEN** it SHALL contain only colour tokens (`--color-*`, `--focus-ring-color`) — no typography, spacing, radius, shadow, z-index, or motion tokens

### Requirement: Dark mode activated via data-theme attribute, not media query
Dark mode SHALL be activated by setting `data-theme="dark"` on the `<html>` element. The dark token block SHALL NOT rely on `@media (prefers-color-scheme: dark)` — products that wish to auto-detect OS preference may add the media query on their own, but the Mori DS contract is the attribute only.

#### Scenario: Attribute activates dark tokens
- **WHEN** `<html data-theme="dark">` is rendered
- **THEN** all `--color-*` tokens resolve to their dark values

#### Scenario: Light mode is default without attribute
- **WHEN** `<html>` is rendered without a `data-theme` attribute
- **THEN** all `--color-*` tokens resolve to their `:root` light values

### Requirement: Dark palette preserves brand identity and WCAG AA contrast
The dark palette SHALL use Mori's brand green (森緑 family) as the primary interactive colour. All text-on-background combinations SHALL meet WCAG AA contrast ratio (≥4.5:1 for normal text, ≥3:1 for large text and UI components).

#### Scenario: Brand green used on dark surfaces
- **WHEN** a primary Button renders in dark mode
- **THEN** its background colour SHALL resolve to a value in the `--color-brand` family — not a generic blue or grey

#### Scenario: Primary text meets contrast in dark mode
- **WHEN** `--color-ink` is checked against `--color-surface-raised` in dark mode
- **THEN** the contrast ratio SHALL be ≥4.5:1

### Requirement: Dark mode flash prevention documented
The `token-dark-mode` spec SHALL document (as a non-normative note) that products MUST inject a blocking inline script in `<head>` to read the user's stored theme preference from `localStorage` and set `data-theme` on `<html>` before first paint, preventing a flash of unstyled light mode.

#### Scenario: Documentation note present in spec
- **WHEN** a product engineer reads the dark mode spec
- **THEN** they SHALL find a clear note explaining the blocking inline script pattern and why it is necessary
