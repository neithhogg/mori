## ADDED Requirements

### Requirement: Skeleton renders shimmer animation
The `Skeleton` component SHALL render a `<div>` with `animate-pulse bg-[--color-surface-sunken] rounded-[--radius-md]`. It MUST NOT use a spinner or any rotation-based animation.

#### Scenario: Default render
- **WHEN** `<Skeleton />` is rendered
- **THEN** the element has classes `animate-pulse bg-[--color-surface-sunken] rounded-[--radius-md]`

### Requirement: Skeleton accepts width and height via className
The `Skeleton` component SHALL accept a `className` prop to allow callers to set explicit dimensions (e.g. `w-32 h-4`). Without explicit dimensions, the skeleton fills its container width with a default height.

#### Scenario: Custom dimensions
- **WHEN** `<Skeleton className="w-48 h-6">` is rendered
- **THEN** the element has `w-48 h-6` in addition to base shimmer classes

### Requirement: Skeleton is used for all loading states
The system SHALL NOT render full-page spinners for data fetching. Only `Skeleton` components (or groups of Skeleton components) are permitted for content loading states.

#### Scenario: Skeleton group for list loading
- **WHEN** a data list is loading
- **THEN** multiple `<Skeleton>` elements are shown in place of each list item — not a spinner overlay
