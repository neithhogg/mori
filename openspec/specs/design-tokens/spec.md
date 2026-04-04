# design-tokens Specification

## Purpose
Define the requirements for Mori design token files — ensuring all nine token groups are present, correctly named, and importable by product repositories.

## Requirements

### Requirement: Token file covers all nine groups
`src/tokens/globals.css` SHALL define CSS custom properties on `:root` for all nine token groups: colour palette, typography scale, spacing scale, border radius, shadows, motion, interactive states, z-index, and surface overlay. The file SHALL additionally define locale-specific overrides for typography tokens (`--font-body`, `--font-heading`, `--leading-body`, `--leading-heading`) scoped to `[data-locale]` attribute selectors as specified in the `localisation-typography` spec. The file SHALL additionally define a `[data-theme="dark"]` block overriding all colour tokens as specified in the `token-dark-mode` spec.

#### Scenario: All groups present
- **WHEN** the CSS file is parsed
- **THEN** it SHALL contain a custom property for every token in all nine groups — no group is missing, no token is omitted

#### Scenario: Mobile viewport — tokens load
- **WHEN** a product imports `globals.css` on a 390px viewport
- **THEN** all `:root` custom properties are available and resolve correctly — no breakpoint or media query restricts token definitions

#### Scenario: Locale typography overrides present
- **WHEN** `globals.css` is parsed
- **THEN** it SHALL contain `[data-locale="en"]` and `[data-locale="zh-Hans"]` blocks that override `--font-body`, `--font-heading`, `--leading-body`, and `--leading-heading`

#### Scenario: Dark mode block present
- **WHEN** `globals.css` is parsed
- **THEN** it SHALL contain a `[data-theme="dark"]` block overriding all colour tokens defined in `:root`

### Requirement: Token names match PROJECT.md exactly
Every CSS custom property name in `globals.css` SHALL match the name defined in PROJECT.md character-for-character (e.g., `--color-brand`, `--space-4`, `--radius-md`).

#### Scenario: Name fidelity
- **WHEN** each token name in `globals.css` is compared against PROJECT.md
- **THEN** there SHALL be no typos, no added prefixes, no renamed variables — the names are identical

#### Scenario: Token count matches specification
- **WHEN** the total `:root` token count per group is checked
- **THEN** it SHALL equal: colour 19, typography 17, spacing 10, radius 5, shadows 3, motion 6, interactive-states 5, z-index 6 — 71 tokens total (dark mode overrides in `[data-theme="dark"]` are not counted separately)

### Requirement: Every new colour token has a dark variant
For every colour token defined in `:root`, a corresponding override SHALL exist in `[data-theme="dark"]`. The set of colour token names in both blocks MUST be identical.

#### Scenario: New colour token paired with dark override
- **WHEN** a new `--color-*` token is added to `:root`
- **THEN** a corresponding override SHALL exist in `[data-theme="dark"]` in the same commit
