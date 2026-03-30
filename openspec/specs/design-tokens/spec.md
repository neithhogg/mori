# design-tokens Specification

## Purpose
Define the requirements for Mori design token files — ensuring all six token groups from PROJECT.md are present, correctly named, and importable by product repositories.

## Requirements

### Requirement: Token file covers all six groups
`src/tokens/globals.css` SHALL define CSS custom properties on `:root` for all six token groups specified in PROJECT.md: colour palette, typography scale, spacing scale, border radius, shadows, and motion.

#### Scenario: All groups present
- **WHEN** the CSS file is parsed
- **THEN** it SHALL contain a custom property for every token listed in PROJECT.md — no group is missing, no token is omitted

#### Scenario: Mobile viewport — tokens load
- **WHEN** a product imports `globals.css` on a 390px viewport
- **THEN** all `:root` custom properties are available and resolve correctly — no breakpoint or media query restricts token definitions

### Requirement: Token names match PROJECT.md exactly
Every CSS custom property name in `globals.css` SHALL match the name defined in PROJECT.md character-for-character (e.g., `--color-brand`, `--space-4`, `--radius-md`).

#### Scenario: Name fidelity
- **WHEN** each token name in `globals.css` is compared against PROJECT.md
- **THEN** there SHALL be no typos, no added prefixes, no renamed variables — the names are identical

#### Scenario: Token count matches specification
- **WHEN** the total token count per group is checked
- **THEN** it SHALL equal: colour 20, typography 13, spacing 10, radius 5, shadows 3, motion 6 (57 tokens total)
