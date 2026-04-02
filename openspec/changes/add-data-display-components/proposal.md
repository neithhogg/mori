## Why

ShiftMate and FaxBridge both need to surface business data clearly — shift summaries, fax processing stats, recent activity — but the current component library only covers primitives (Card, Badge, Skeleton). Without purpose-built data display components, each product will improvise inconsistently, eroding trust with non-tech-savvy Japanese SMB owners who rely on at-a-glance clarity.

## What Changes

- **New**: `StatCard` component — a metric tile showing a label, a primary value, and an optional delta/trend indicator. Used for KPI summaries (今月の売上, 本日の出勤数, 未処理のFAX).
- **New**: `DataTable` component — a mobile-aware sortable table with sticky header, row selection, and mandatory empty state. Replaces ad-hoc `<table>` usage in ShiftMate shift lists and FaxBridge fax queues.
- **New**: `ActivityTimeline` component — a vertical chronological event list with icon, timestamp, and description. Used in FaxBridge processing history and ShiftMate shift change logs.

## Capabilities

### New Capabilities

- `stat-card`: Single-metric display tile with label, formatted value (currency/count/percent), optional trend delta, and skeleton loading state.
- `data-table`: Responsive sortable data table with sticky column headers, row actions, empty state slot, and skeleton rows for loading.
- `activity-timeline`: Vertical event timeline with icon slot, relative/absolute timestamp, Japanese date formatting, and skeleton loading state.

### Modified Capabilities

- `card`: Update padding and surface token usage to align with the new `stat-card` spec — the `StatCard` builds on Card's visual language and the two must feel consistent.

## Impact

- `PROJECT.md` — add three new component specs to the Component Specifications section
- `openspec/specs/card/` — minor requirement update for padding token alignment
- No breaking changes to existing component APIs
- Both ShiftMate and FaxBridge will consume these components once shipped
