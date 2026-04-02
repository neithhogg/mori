## Context

The Mori component library covers primitives (Button, Input, Card, Badge, Skeleton, Dialog) but lacks purpose-built data display components. Both ShiftMate and FaxBridge are at a stage where they need to render structured business data — shift summaries, fax queues, processing logs — and without shared specs, each product will build its own ad-hoc tables and stat tiles, fragmenting the design language.

Current state: products use raw `<table>` elements or nested Cards for data. There are no tokens or layout rules governing column widths, sort indicators, or metric formatting.

## Goals / Non-Goals

**Goals:**
- Define three reusable data display components: `StatCard`, `DataTable`, `ActivityTimeline`
- All components use Mori CSS variable tokens exclusively — no hardcoded values
- Mobile-first at 390px; `DataTable` horizontal scrolls on narrow viewports rather than reflow
- All components ship with skeleton loading variants (no spinners)
- Japanese number/date/currency formatting built into component contracts
- Minor alignment update to `Card` padding token usage for visual consistency

**Non-Goals:**
- Chart/graph components (bar charts, line charts) — deferred to Phase 2 dashboard work
- Server-side sorting or pagination logic — components are display-only; data fetching is the consumer's responsibility
- iOS SwiftUI counterparts — Phase 2 only
- Export / download functionality on `DataTable` — future capability

## Decisions

### Decision 1: DataTable scrolls horizontally on mobile rather than stacking columns

**Chosen**: Horizontal scroll with sticky first column (identity column).

**Why**: Japanese SMB users need to scan across rows to compare values (e.g., staff × shift day). Collapsing columns into a card-per-row pattern loses the comparative affordance. A sticky identity column (e.g., staff name, fax sender) anchors the user while scrolling.

**Alternatives considered**:
- Card-per-row (responsive reflow): loses cross-row comparison; rejected.
- Column prioritisation (hide low-priority columns on mobile): acceptable fallback but complex to configure; deferred as an enhancement.

### Decision 2: StatCard value formatting is the consumer's responsibility, with format hints

**Chosen**: `StatCard` accepts a pre-formatted `value: string` and an optional `format` hint (`"currency" | "count" | "percent"`) used only for ARIA labelling and screen reader announcements.

**Why**: Formatting rules (currency locale, decimal precision) vary by context. Pushing formatting into the component creates hidden coupling. The consumer formats with `Intl.NumberFormat` and passes the string; the component stays dumb.

**Alternatives considered**:
- Component handles formatting via a `locale` prop: convenient but opaque; rejected in favour of explicit consumer control.

### Decision 3: ActivityTimeline timestamps use relative time by default, absolute on hover/focus

**Chosen**: Display relative time (e.g., 3分前, 2時間前) with the absolute date/time revealed on hover/focus via a `<title>` tooltip and `aria-label`.

**Why**: Japanese SMB users glance at timelines to understand recency, not exact timestamps. Relative time reduces cognitive load. Exact time is available for users who need it.

**Alternatives considered**:
- Always show absolute time: more precise but noisier; rejected.
- Toggle via prop: premature configurability; deferred.

## Risks / Trade-offs

- **[Risk] DataTable horizontal scroll may be missed on touch devices** → Mitigation: add a subtle fade gradient on the right edge when content overflows, signalling scrollability.
- **[Risk] Card padding change is a visual breaking change for existing consumers** → Mitigation: the change is additive (aligning to an existing token, not removing a variant); document in JOURNAL.md and release notes.
- **[Risk] Relative timestamps become stale in long-lived pages** → Mitigation: consumers should refresh `ActivityTimeline` data on a reasonable interval; the component itself does not own a timer.
