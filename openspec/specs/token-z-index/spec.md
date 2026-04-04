# token-z-index Specification

## Purpose
Define the requirements for the z-index scale design tokens — ensuring all components use named semantic layers instead of magic numbers, and that layer ordering is consistent across the system.

## Requirements

### Requirement: Z-index scale tokens present on :root
`globals.css` SHALL define six z-index tokens on `:root`, one per named semantic layer: `--z-base`, `--z-dropdown`, `--z-sticky`, `--z-overlay`, `--z-modal`, `--z-toast`. Values SHALL follow a scale of 0, 100, 200, 300, 400, 500 respectively.

#### Scenario: All six z-index tokens defined
- **WHEN** `globals.css` is parsed
- **THEN** `:root` SHALL contain all six custom properties: `--z-base`, `--z-dropdown`, `--z-sticky`, `--z-overlay`, `--z-modal`, `--z-toast`

#### Scenario: Layer values are ordered correctly
- **WHEN** token values are compared
- **THEN** `--z-toast` SHALL be greater than `--z-modal`, which SHALL be greater than `--z-overlay`, which SHALL be greater than `--z-sticky`, which SHALL be greater than `--z-dropdown`, which SHALL be greater than or equal to `--z-base`

### Requirement: Components use z-index tokens, not magic numbers
All components and layout primitives that set a `z-index` property SHALL reference one of the six z-index tokens using `var(--z-<layer>)`. Hardcoded z-index integers are forbidden.

#### Scenario: No hardcoded z-index in component files
- **WHEN** component source files are scanned for `z-index` CSS property usage
- **THEN** every instance SHALL use `var(--z-base)`, `var(--z-dropdown)`, `var(--z-sticky)`, `var(--z-overlay)`, `var(--z-modal)`, or `var(--z-toast)` — no integer literals

#### Scenario: Dropdown renders above page content
- **WHEN** a dropdown menu is open
- **THEN** it SHALL render above sticky headers, using `var(--z-dropdown)` which exceeds `var(--z-sticky)`

#### Scenario: Modal renders above overlays
- **WHEN** a Dialog component is open
- **THEN** its content panel SHALL use `var(--z-modal)` and its backdrop SHALL use `var(--z-overlay)`, ensuring the panel renders above the backdrop
