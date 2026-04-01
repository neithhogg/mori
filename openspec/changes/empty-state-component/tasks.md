## 1. Extend Localisation Copy

- [x] 1.1 Add `empty.description` key to the `CopyKeys` interface in `src/lib/locale/copy.ts`
- [x] 1.2 Add Japanese translation: `まだ項目が登録されていません。`
- [x] 1.3 Add English translation: `No items have been added yet.`
- [x] 1.4 Add Simplified Chinese translation with `// TODO: zh-Hans review` comment: `还没有添加任何项目。`

## 2. Implement EmptyState Component

- [x] 2.1 Create `src/components/ui/empty-state.tsx` with `EmptyStateProps` interface (`heading: string`, `description?: string`, `icon?: LucideIcon`, `action?: { label: string; onClick: () => void }`)
- [x] 2.2 Render centred flex column layout using only CSS variable tokens for colours and spacing
- [x] 2.3 Render icon at 48×48px with `--color-ink-tertiary` when `icon` prop provided; render nothing when omitted
- [x] 2.4 Render heading as `--text-lg` / `--font-weight-semibold` / `--color-ink`
- [x] 2.5 Render description as `--text-sm` / `--color-ink-secondary` below heading when provided; render nothing when omitted
- [x] 2.6 Render `Button` with `variant="primary"` and `size="md"` labelled with `action.label` when action prop provided; render nothing when omitted

## 3. Export from Public API

- [x] 3.1 Add `export { EmptyState, type EmptyStateProps } from './components/ui/empty-state'` to `src/index.ts`

## 4. Write Vitest Unit Tests

- [x] 4.1 Create `src/components/ui/__tests__/empty-state.test.tsx`
- [x] 4.2 Test: heading-only render — heading visible, no icon, no description, no button
- [x] 4.3 Test: full render — icon, heading, description, and button all present
- [x] 4.4 Test: icon renders with 48px dimensions when prop supplied
- [x] 4.5 Test: no `<svg>` in DOM when icon omitted
- [x] 4.6 Test: description visible when prop supplied; absent when omitted
- [x] 4.7 Test: CTA button click invokes `action.onClick` exactly once
- [x] 4.8 Test: no `<button>` in DOM when action omitted
- [x] 4.9 Run `pnpm test` and confirm all tests pass

## 5. Add Showcase Section

- [x] 5.1 Create `showcase/src/sections/empty-state-section.tsx` with three variants: (a) heading only, (b) heading + icon + description + CTA, (c) heading + icon, no CTA
- [x] 5.2 Import and render `EmptyStateSection` in `showcase/src/App.tsx`
- [x] 5.3 Run `pnpm dev` and visually verify all three variants render correctly on 390px and desktop viewports

## 6. Quality Checks

- [x] 6.1 Run `pnpm typecheck` — zero errors
- [x] 6.2 Run `pnpm lint` — zero warnings or errors
- [x] 6.3 Run `pnpm format:check` — no formatting issues
- [x] 6.4 Run `pnpm test` — all tests green
