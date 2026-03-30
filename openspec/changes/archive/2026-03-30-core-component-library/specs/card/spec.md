## ADDED Requirements

### Requirement: Card renders base variant
The `Card` component SHALL render a `<div>` with surface background, border, large radius, and default padding. All values MUST reference CSS variable tokens.

#### Scenario: Base render
- **WHEN** `<Card>` is rendered with no `variant` prop
- **THEN** the element has classes `bg-[--color-surface] border border-[--color-border] rounded-[--radius-lg] p-6`

### Requirement: Card interactive variant adds hover shadow
The `Card` component SHALL accept a `variant` prop of `interactive`. An interactive card MUST add `cursor-pointer`, a `transition-shadow` transition, and a hover shadow using `--shadow-md`.

#### Scenario: Interactive variant
- **WHEN** `<Card variant="interactive">` is rendered
- **THEN** the element has classes `cursor-pointer transition-shadow duration-200 hover:shadow-[--shadow-md]` in addition to base classes

### Requirement: Card highlighted variant uses brand border
The `Card` component SHALL support `variant="highlighted"`. A highlighted card MUST use `border-[--color-brand]` with `border-2` instead of the default border.

#### Scenario: Highlighted variant
- **WHEN** `<Card variant="highlighted">` is rendered
- **THEN** the element has `border-[--color-brand] border-2` classes

### Requirement: Card accepts className override
The `Card` component SHALL merge any `className` prop with its base classes using `cn()`.

#### Scenario: Extra class applied
- **WHEN** `<Card className="mt-4">` is rendered
- **THEN** the rendered element has both base card classes and `mt-4`
