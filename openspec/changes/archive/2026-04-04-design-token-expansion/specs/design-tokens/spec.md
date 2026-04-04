## MODIFIED Requirements

### Requirement: Token file covers all six groups
`src/tokens/globals.css` SHALL define CSS custom properties on `:root` for all nine token groups specified in PROJECT.md: colour palette, typography scale, spacing scale, border radius, shadows, motion, interactive states, z-index, and surface overlay. The file SHALL additionally define locale-specific overrides for typography tokens (`--font-body`, `--font-heading`, `--leading-body`, `--leading-heading`) scoped to `[data-locale]` attribute selectors as specified in the `localisation-typography` spec. The file SHALL additionally define a `[data-theme="dark"]` block overriding all colour tokens as specified in the `token-dark-mode` spec.

#### Scenario: All groups present
- **WHEN** the CSS file is parsed
- **THEN** it SHALL contain a custom property for every token listed in PROJECT.md across all nine groups — no group is missing, no token is omitted

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
- **WHEN** the total token count per group is checked
- **THEN** it SHALL equal: colour 19 (light) + 19 (dark), typography 17, spacing 10, radius 5, shadows 3, motion 6, interactive-states 5 (`--focus-ring-color`, `--focus-ring-width`, `--focus-ring-offset`, `--opacity-disabled`, `--color-surface-overlay`), z-index 6 — 90 `:root` tokens total (not counting dark duplicates)

## ADDED Requirements

### Requirement: Every new colour token has a dark variant
For every colour token added to `:root` after this change (i.e., by future changes), a corresponding override SHALL be added simultaneously to the `[data-theme="dark"]` block. The token count MUST remain equal between the light and dark colour token sets.

#### Scenario: New colour token paired with dark override
- **WHEN** a new `--color-*` token is added to `:root`
- **THEN** a corresponding override SHALL exist in `[data-theme="dark"]` in the same commit
