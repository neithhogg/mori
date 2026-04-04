## ADDED Requirements

### Requirement: Focus ring tokens present on :root
`globals.css` SHALL define three focus-ring tokens on `:root`: `--focus-ring-color`, `--focus-ring-width`, and `--focus-ring-offset`. These tokens SHALL be used by all interactive components (Button, Input, links) to render a consistent focus indicator.

#### Scenario: Focus ring tokens defined
- **WHEN** `globals.css` is parsed
- **THEN** `:root` SHALL contain `--focus-ring-color`, `--focus-ring-width`, and `--focus-ring-offset` custom properties

#### Scenario: Focus ring colour matches brand token
- **WHEN** `--focus-ring-color` is resolved
- **THEN** its value SHALL reference `--color-brand` (森緑) — not a hardcoded hex value

#### Scenario: Focus ring width and offset are consistent across components
- **WHEN** Button and Input components render their focus state
- **THEN** both SHALL use `var(--focus-ring-width)` and `var(--focus-ring-offset)` — no per-component overrides

### Requirement: Disabled opacity token present on :root
`globals.css` SHALL define `--opacity-disabled: 0.45` on `:root`. All components that render a disabled state SHALL apply this token as their opacity value — no component SHALL hardcode a numeric opacity for disabled state.

#### Scenario: Token defined with correct value
- **WHEN** `globals.css` is parsed
- **THEN** `:root` SHALL contain `--opacity-disabled` with a value of `0.45`

#### Scenario: No hardcoded disabled opacity in components
- **WHEN** any component file is scanned for disabled state styling
- **THEN** it SHALL reference `var(--opacity-disabled)` — not `opacity-40`, `opacity-50`, or any other hardcoded fraction

### Requirement: Surface overlay token present on :root
`globals.css` SHALL define `--color-surface-overlay` on `:root` for use as the backdrop colour behind modals, drawers, and sheets.

#### Scenario: Token defined
- **WHEN** `globals.css` is parsed
- **THEN** `:root` SHALL contain `--color-surface-overlay` with a semi-transparent dark value (rgba or equivalent)

#### Scenario: Modal and drawer backdrops use the token
- **WHEN** a Dialog or Sheet component renders its backdrop element
- **THEN** the backdrop background colour SHALL reference `var(--color-surface-overlay)` — not a hardcoded rgba value
