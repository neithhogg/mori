## Purpose

`ActivityTimeline` renders a vertical chronological list of events, each with an icon, description, and timestamp. Events are connected by a vertical line and timestamps display as relative Japanese text with absolute time accessible on hover/focus.

## Requirements

### Requirement: ActivityTimeline renders a vertical chronological event list
The `ActivityTimeline` component SHALL accept an array of event objects and render them top-to-bottom (newest first by default). Each event MUST display: an icon slot, a description string, and a timestamp. Events are connected by a vertical line using `--color-border`.

#### Scenario: Render a list of events
- **WHEN** an array of events is passed with `icon`, `description`, and `timestamp` fields
- **THEN** each event renders as a row with the icon on the left, description to the right, and the timestamp below the description
- **AND** a vertical line connects consecutive event icons

#### Scenario: Oldest-first ordering
- **WHEN** `order="asc"` prop is passed
- **THEN** events render oldest-first (bottom item is most recent)

### Requirement: ActivityTimeline shows relative timestamps with absolute on hover/focus
Timestamps SHALL be displayed as relative Japanese text (例: 3分前, 2時間前, 昨日) by default. The absolute date/time (formatted via `Intl.DateTimeFormat('ja-JP')`) MUST be accessible on hover/focus via a native tooltip (`title` attribute) and included in `aria-label`.

#### Scenario: Relative time display
- **WHEN** an event timestamp is 5 minutes in the past
- **THEN** the displayed text is "5分前"

#### Scenario: Absolute time on hover
- **WHEN** the user hovers or focuses the timestamp element
- **THEN** the native browser tooltip shows the full Japanese date/time string (e.g., 2025年1月28日(火) 14:32)

#### Scenario: ARIA label includes absolute time
- **WHEN** a timestamp element is rendered
- **THEN** `aria-label` contains the absolute date/time string for screen reader users

### Requirement: ActivityTimeline shows skeleton events during loading
When `isLoading={true}`, `ActivityTimeline` SHALL render `skeletonCount` (default: 4) skeleton event rows. Each skeleton row SHALL show a circular shimmer for the icon and a shimmer block for the description. No spinner is shown.

#### Scenario: Loading state
- **WHEN** `isLoading={true}` is passed
- **THEN** 4 skeleton event rows render; the vertical connector line is still visible; no real events are shown
