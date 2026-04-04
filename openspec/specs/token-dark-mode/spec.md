# token-dark-mode Specification

## Purpose
Define the requirements for the dark mode token layer — ensuring every colour token has a dark-mode override, the theme is activated predictably via a data attribute, and products can adopt dark mode without touching component code.

> **Flash prevention (non-normative):** Products MUST inject a blocking inline script in `<head>` that reads the user's stored theme preference from `localStorage` and sets `data-theme` on `<html>` before first paint. Without this, users who prefer dark mode will see a flash of the light theme on every page load. Example:
> ```html
> <script>
>   try {
>     const t = localStorage.getItem('mori-theme');
>     if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
>   } catch (_) {}
> </script>
> ```

## Requirements

### Requirement: Dark mode colour tokens defined under [data-theme="dark"]
`globals.css` SHALL define a `[data-theme="dark"]` selector block that overrides every colour token defined in `:root`. Non-colour token groups (typography, spacing, radius, shadows, motion, z-index) SHALL NOT be overridden — they are theme-agnostic.

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
