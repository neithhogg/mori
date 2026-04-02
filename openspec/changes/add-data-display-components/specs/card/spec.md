## MODIFIED Requirements

### Requirement: Card uses design token for padding
The `Card` component's internal padding SHALL reference the `--spacing-4` token (16px) for all four sides on mobile, and `--spacing-5` (20px) on desktop (≥640px). Hardcoded `p-4` / `p-5` Tailwind classes SHALL be replaced with token-aware CSS custom property references to ensure visual consistency with `StatCard` which shares the same surface treatment.

#### Scenario: Mobile padding
- **WHEN** `Card` is rendered on a 390px viewport
- **THEN** all four sides have 16px padding driven by `--spacing-4`

#### Scenario: Desktop padding
- **WHEN** `Card` is rendered on a ≥640px viewport
- **THEN** all four sides have 20px padding driven by `--spacing-5`

#### Scenario: StatCard and Card visual alignment
- **WHEN** a `StatCard` and a `Card` are placed side by side in a grid
- **THEN** their inner content edges align horizontally
