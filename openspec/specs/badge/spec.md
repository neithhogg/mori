## ADDED Requirements

### Requirement: Badge renders with correct colour variant
The `Badge` component SHALL accept a `variant` prop (`green | amber | red | blue | gray | brand`) and apply the corresponding background and text token pair. All values MUST reference CSS variable tokens.

#### Scenario: Green variant
- **WHEN** `<Badge variant="green">` is rendered
- **THEN** the element has classes `bg-[--color-success-light] text-[--color-success]`

#### Scenario: Red variant
- **WHEN** `<Badge variant="red">` is rendered
- **THEN** the element has classes `bg-[--color-error-light] text-[--color-error]`

#### Scenario: Brand variant
- **WHEN** `<Badge variant="brand">` is rendered
- **THEN** the element has classes `bg-[--color-brand-light] text-[--color-brand-dark]`

#### Scenario: Default variant
- **WHEN** no `variant` prop is passed
- **THEN** the badge renders with `gray` variant classes (`bg-[--color-surface-sunken] text-[--color-ink-secondary]`)

### Requirement: Badge applies base layout classes
The `Badge` component SHALL always apply base layout classes: `inline-flex items-center px-2 py-0.5 rounded-[--radius-sm] text-xs font-medium`.

#### Scenario: Base classes present
- **WHEN** any `<Badge>` is rendered
- **THEN** the element has all base layout classes regardless of variant

### Requirement: Badge accepts className override
The `Badge` component SHALL merge any `className` prop with its base classes using `cn()`.

#### Scenario: Extra class applied
- **WHEN** `<Badge className="ml-2">` is rendered
- **THEN** the rendered element has both base badge classes and `ml-2`
