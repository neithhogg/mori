## ADDED Requirements

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

### Requirement: No hardcoded values outside `:root`
CSS custom property values in `globals.css` SHALL be defined only on `:root`. No hex colours, pixel values, or font strings SHALL appear outside of the `:root` block.

#### Scenario: No inline hex values in rule bodies
- **WHEN** the file content is scanned for hex colour patterns (`#[0-9a-fA-F]{3,8}`) outside of the `:root` block
- **THEN** no matches SHALL be found — all hex values live exclusively within `:root { … }`

#### Scenario: Products reference tokens, not raw values
- **WHEN** a product component uses `var(--color-brand)` in its Tailwind classes
- **THEN** the resolved value SHALL be `#2D7A4F` — confirming the token is defined and reachable

### Requirement: Products can import and use the token file
A product SHALL be able to import `src/tokens/globals.css` into its `app/globals.css` and immediately reference any Mori token in component styles without additional configuration.

#### Scenario: Import resolves correctly
- **WHEN** a product's `app/globals.css` contains `@import '…/globals.css'`
- **THEN** all `:root` custom properties from `globals.css` are available in the product's stylesheet

#### Scenario: Token used in Tailwind arbitrary value
- **WHEN** a component uses `bg-[--color-surface-raised]` as a Tailwind arbitrary value class
- **THEN** the background resolves to `#F5F3EF` (和紙) — confirming end-to-end token resolution
