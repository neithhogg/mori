## Purpose

`StatCard` displays a single key business metric with a label, a pre-formatted value string, and an optional trend delta. It uses Mori CSS variable tokens exclusively for all colours, spacing, and radii, and shares the same surface treatment as `Card`.

## Requirements

### Requirement: StatCard displays a single business metric
The `StatCard` component SHALL display one key metric with a label, a pre-formatted value string, and an optional trend delta. It MUST use only Mori CSS variable tokens for all colours, spacing, and radii.

#### Scenario: Render a basic metric
- **WHEN** `StatCard` is rendered with `label="本日の出勤数"` and `value="12"`
- **THEN** the label appears above the value in `--color-ink-secondary` text, the value appears in large `--color-ink` text, and the card surface uses `--color-surface` with `--radius-lg` border radius

#### Scenario: Render with positive delta
- **WHEN** `delta={{ value: "+3", direction: "up" }}` is passed
- **THEN** the delta is shown below the value in `--color-success` with an upward arrow icon

#### Scenario: Render with negative delta
- **WHEN** `delta={{ value: "-2", direction: "down" }}` is passed
- **THEN** the delta is shown in `--color-error` with a downward arrow icon

#### Scenario: Loading state
- **WHEN** `isLoading={true}` is passed
- **THEN** the label and value areas render as skeleton shimmer blocks; no spinner is shown

### Requirement: StatCard provides accessible metric announcements
The `StatCard` component SHALL include an `aria-label` combining the label and value (and delta if present) for screen readers. The `format` hint prop MUST be used to enrich the ARIA label only (e.g., "currency" → prepend ¥).

#### Scenario: ARIA label with currency format
- **WHEN** `label="今月の売上"`, `value="198,000"`, `format="currency"` are passed
- **THEN** the root element has `aria-label="今月の売上: ¥198,000"`

#### Scenario: ARIA label with no format hint
- **WHEN** `format` prop is omitted
- **THEN** `aria-label` is `"<label>: <value>"` with no prefix/suffix
