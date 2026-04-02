## Purpose

`DataTable` renders typed tabular data from a column-definition array and a data array. It supports sticky headers, horizontal scrolling with a sticky first column on narrow viewports, client-side column sorting, empty states, and skeleton loading rows.

## Requirements

### Requirement: DataTable renders tabular data with sticky header
The `DataTable` component SHALL render rows from a typed data array using a column definition array. The header row MUST be sticky (remains visible when the body scrolls). The table MUST use semantic `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` elements.

#### Scenario: Render rows and header
- **WHEN** `columns` and `data` props are provided
- **THEN** each column definition's `header` string appears as a `<th>` in the sticky header row, and each data row renders the corresponding cell value

#### Scenario: Sticky header on scroll
- **WHEN** the table body scrolls vertically
- **THEN** the `<thead>` row remains visible at the top of the scroll container

### Requirement: DataTable scrolls horizontally on narrow viewports with a sticky first column
On viewports narrower than 640px, `DataTable` SHALL enable horizontal scroll on the table container. The first column MUST remain sticky (pinned left) during horizontal scroll to preserve row identity.

#### Scenario: Horizontal overflow on 390px viewport
- **WHEN** the table has more columns than fit at 390px width
- **THEN** the table container shows a right-edge fade gradient and allows horizontal touch scroll
- **AND** the first column stays pinned to the left edge

### Requirement: DataTable supports client-side column sorting
Each column definition MAY include `sortable: true`. For sortable columns, clicking the `<th>` SHALL cycle sort state: unsorted → ascending → descending → unsorted. Only one column can be sorted at a time.

#### Scenario: Sort ascending
- **WHEN** user taps a sortable column header once
- **THEN** rows are sorted ascending by that column's value and the header shows an upward sort indicator

#### Scenario: Sort descending
- **WHEN** user taps the same sorted column header a second time
- **THEN** rows sort descending and the header shows a downward sort indicator

#### Scenario: Clear sort
- **WHEN** user taps the same sorted column header a third time
- **THEN** rows return to original order and the sort indicator is removed

### Requirement: DataTable shows an empty state when data is empty
When the `data` array is empty, `DataTable` SHALL render the content of the `emptyState` slot prop instead of an empty `<tbody>`.

#### Scenario: Empty data renders empty state
- **WHEN** `data={[]}` and `emptyState` slot is provided
- **THEN** the slot content is displayed centred in the table area; no empty rows are rendered

#### Scenario: Empty data without emptyState prop
- **WHEN** `data={[]}` and no `emptyState` slot is provided
- **THEN** the table renders a default Japanese empty message: "まだデータがありません"

### Requirement: DataTable shows skeleton rows during loading
When `isLoading={true}`, `DataTable` SHALL render `skeletonRowCount` (default: 5) skeleton rows instead of data rows. Each cell in a skeleton row SHALL be a shimmer block.

#### Scenario: Loading state renders skeletons
- **WHEN** `isLoading={true}` is passed
- **THEN** 5 skeleton rows appear; no spinner is shown; the sticky header remains visible with real column headers
