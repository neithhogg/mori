## 1. Prerequisites

- [x] 1.1 Add `lucide-react` to `package.json` dependencies and run `pnpm install`
- [x] 1.2 Add `clsx` and `tailwind-merge` to `package.json` dependencies and run `pnpm install`
- [x] 1.3 Create `src/lib/cn.ts` — export a `cn()` helper using `clsx` + `tailwind-merge`
- [x] 1.4 Create `src/components/ui/` directory structure

## 2. Button Component

- [x] 2.1 Create `src/components/ui/button.tsx` — `ButtonVariant` and `ButtonSize` types, `Button` component with all 4 variants and 3 sizes
- [x] 2.2 Add loading state to `Button` — `isLoading` prop renders spinner icon + `処理中...`, disables element
- [x] 2.3 Verify `aria-label` is forwarded to `<button>` element for icon-only usage
- [x] 2.4 Create `src/components/ui/__tests__/button.test.tsx` — tests for variants, sizes, loading, disabled, aria-label

## 3. Input Component

- [x] 3.1 Create `src/components/ui/input.tsx` — `Input` component with base styles, `label`, `error`, and `helperText` props
- [x] 3.2 Ensure `label` + `htmlFor` / `id` linkage is correct
- [x] 3.3 Verify error state switches border and focus ring to `--color-error`
- [x] 3.4 Create `src/components/ui/__tests__/input.test.tsx` — tests for label render, error state, helper text, native prop forwarding

## 4. Card Component

- [x] 4.1 Create `src/components/ui/card.tsx` — `CardVariant` type, `Card` component with `base`, `interactive`, and `highlighted` variants
- [x] 4.2 Create `src/components/ui/__tests__/card.test.tsx` — tests for each variant class set and className merge

## 5. Badge Component

- [x] 5.1 Create `src/components/ui/badge.tsx` — `BadgeVariant` type, `Badge` component with all 6 colour variants
- [x] 5.2 Verify all colour variants reference only CSS variable tokens
- [x] 5.3 Create `src/components/ui/__tests__/badge.test.tsx` — tests for each variant and base classes

## 6. Skeleton Component

- [x] 6.1 Create `src/components/ui/skeleton.tsx` — `Skeleton` component with `animate-pulse bg-[--color-surface-sunken] rounded-[--radius-md]`
- [x] 6.2 Create `src/components/ui/__tests__/skeleton.test.tsx` — tests for base classes and className merge

## 7. Dialog Component

- [x] 7.1 Create `src/components/ui/dialog.tsx` — `Dialog` base using native `<dialog>` element with `showModal()` / `close()`
- [x] 7.2 Implement overlay dimming `<div>` inside the dialog (not `::backdrop`)
- [x] 7.3 Add ESC key close handler calling `onClose`
- [x] 7.4 Add overlay click detection — call `onClose` unless `disableOutsideClose` is true
- [x] 7.5 Implement focus trap — Tab/Shift+Tab cycle only within dialog's focusable elements
- [x] 7.6 Implement focus restore — on close, return focus to the element that triggered the dialog
- [x] 7.7 Add `aria-labelledby` linking dialog to title element
- [x] 7.8 Add mobile bottom-sheet CSS — `rounded-t-[--radius-xl] rounded-b-none fixed bottom-0 left-0 right-0` for `< 768px`
- [x] 7.9 Add `variant="confirm"` — footer with キャンセル on left, action on right; `destructive` prop adds `この操作は取り消せません。` body copy
- [x] 7.10 Add `isLoading` prop to confirm variant — show `処理中...` on action button, disable both buttons
- [x] 7.11 Create `src/components/ui/__tests__/dialog.test.tsx` — tests for open/close, ESC, overlay click, disableOutsideClose, aria-labelledby, confirm order, loading state

## 8. Navigation Components

- [x] 8.1 Create `src/components/ui/navigation.tsx` — `BottomTabBar` component with `fixed bottom-0 left-0 right-0 h-[60px]` and tab item active/inactive states
- [x] 8.2 Verify `BottomTabBar` tab items meet 44×44px minimum touch target
- [x] 8.3 Add `Sidebar` component — `w-[240px]` left sidebar with nav item active/inactive states
- [x] 8.4 Implement icon + label layout for both components (icon above label in tab bar; icon left of label in sidebar)
- [x] 8.5 Create `src/components/ui/__tests__/navigation.test.tsx` — tests for active/inactive classes on both components

## 9. Exports and Integration

- [x] 9.1 Update `src/index.ts` to export all components: `Button`, `Input`, `Card`, `Badge`, `Skeleton`, `Dialog`, `BottomTabBar`, `Sidebar`
- [x] 9.2 Export the `cn` utility from `src/lib/cn.ts`
- [x] 9.3 Run `pnpm typecheck` — fix any TypeScript strict-mode errors
- [x] 9.4 Run `pnpm lint` — fix any lint errors
- [x] 9.5 Run `pnpm test` — all component tests passing
- [x] 9.6 Run `pnpm format` — apply Prettier formatting
