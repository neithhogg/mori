## MODIFIED Requirements

### Requirement: Token file covers all six groups
`src/tokens/globals.css` SHALL define CSS custom properties on `:root` for all six token groups specified in PROJECT.md: colour palette, typography scale, spacing scale, border radius, shadows, and motion. The file SHALL additionally define locale-specific overrides for typography tokens (`--font-body`, `--font-heading`, `--leading-body`, `--leading-heading`) scoped to `[data-locale]` attribute selectors as specified in the `localisation-typography` spec.

#### Scenario: All groups present
- **WHEN** the CSS file is parsed
- **THEN** it SHALL contain a custom property for every token listed in PROJECT.md — no group is missing, no token is omitted

#### Scenario: Mobile viewport — tokens load
- **WHEN** a product imports `globals.css` on a 390px viewport
- **THEN** all `:root` custom properties are available and resolve correctly — no breakpoint or media query restricts token definitions

#### Scenario: Locale typography overrides present
- **WHEN** `globals.css` is parsed
- **THEN** it SHALL contain `[data-locale="en"]` and `[data-locale="zh-Hans"]` blocks that override `--font-body`, `--font-heading`, `--leading-body`, and `--leading-heading`
