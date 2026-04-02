## 1. Card Token Alignment

- [x] 1.1 Replace hardcoded `p-4`/`p-5` Tailwind classes in `card.tsx` with CSS custom property references to `--spacing-4` and `--spacing-5`
- [x] 1.2 Verify `Card` and `StatCard` inner content edges align in the showcase grid

## 2. StatCard Component

- [ ] 2.1 Create `src/components/ui/stat-card.tsx` with props: `label`, `value`, `delta?`, `format?`, `isLoading?`
- [ ] 2.2 Implement skeleton loading variant using the existing `Skeleton` component (no spinner)
- [ ] 2.3 Implement delta display with `--color-success` (up) and `--color-error` (down) using Lucide `TrendingUp`/`TrendingDown` icons
- [ ] 2.4 Add `aria-label` construction logic respecting the `format` hint (currency prefix ¥, percent suffix %, count no affix)
- [ ] 2.5 Write Vitest unit tests covering: basic render, positive delta, negative delta, loading state, ARIA label with/without format

## 3. DataTable Component

- [ ] 3.1 Define `ColumnDef<T>` TypeScript type: `{ key: keyof T; header: string; sortable?: boolean; render?: (value: T[keyof T], row: T) => React.ReactNode }`
- [ ] 3.2 Create `src/components/ui/data-table.tsx` with props: `columns`, `data`, `isLoading?`, `skeletonRowCount?`, `emptyState?`
- [ ] 3.3 Implement sticky `<thead>` with `position: sticky; top: 0` using `--color-surface` background
- [ ] 3.4 Implement horizontal scroll container with sticky first column (CSS `position: sticky; left: 0`)
- [ ] 3.5 Add right-edge fade gradient overlay that appears only when table overflows horizontally
- [ ] 3.6 Implement client-side column sort: unsorted → asc → desc → unsorted cycle with sort indicator icons
- [ ] 3.7 Implement empty state slot; fall back to "まだデータがありません" when slot is not provided
- [ ] 3.8 Implement skeleton rows using `Skeleton` component; render `skeletonRowCount` rows (default 5) when `isLoading={true}`
- [ ] 3.9 Write Vitest unit tests covering: render, sort cycle, empty state fallback, empty state slot, loading skeleton rows

## 4. ActivityTimeline Component

- [ ] 4.1 Define `TimelineEvent` TypeScript type: `{ id: string; icon: React.ReactNode; description: string; timestamp: Date }`
- [ ] 4.2 Create `src/components/ui/activity-timeline.tsx` with props: `events`, `order?` (`"desc"` | `"asc"`, default `"desc"`), `isLoading?`, `skeletonCount?`
- [ ] 4.3 Implement vertical connector line between events using `--color-border`
- [ ] 4.4 Implement relative timestamp display using `Intl.RelativeTimeFormat('ja-JP')`
- [ ] 4.5 Add `title` attribute and `aria-label` on each timestamp element with the full absolute Japanese date/time string via `Intl.DateTimeFormat('ja-JP', { dateStyle: 'full', timeStyle: 'short' })`
- [ ] 4.6 Implement skeleton loading variant: circular icon shimmer + description shimmer blocks; connector line remains visible
- [ ] 4.7 Write Vitest unit tests covering: event render, desc/asc order, relative timestamp text, ARIA label, loading skeleton count

## 5. Showcase & Documentation

- [ ] 5.1 Add a "データ表示" section to the component showcase page featuring `StatCard` grid, `DataTable` with sample data, and `ActivityTimeline` with sample events
- [ ] 5.2 Update `PROJECT.md` Component Specifications section to document `StatCard`, `DataTable`, and `ActivityTimeline` APIs
- [ ] 5.3 Add a JOURNAL.md entry noting the `Card` padding token alignment change
