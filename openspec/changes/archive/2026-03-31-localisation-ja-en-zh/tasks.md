## 1. Foundation — Types and Tokens

- [x] 1.1 Create `src/lib/locale/types.ts` — define `Locale` type as `'ja' | 'en' | 'zh-Hans'`
- [x] 1.2 Add `[data-locale="en"]` and `[data-locale="zh-Hans"]` typography override blocks to `src/tokens/globals.css` (font stacks + line-height tokens per `localisation-typography` spec)
- [x] 1.3 Audit all components in `src/components/` and replace any hardcoded `line-height` values with `var(--leading-body)` or `var(--leading-heading)`
- [x] 1.4 Update `openspec/specs/design-tokens/spec.md` in the main specs folder to reflect the new locale typography override requirements (archive-time sync)

## 2. Locale Context and Hooks

- [x] 2.1 Create `src/lib/locale/context.tsx` — `LocaleProvider` component and `useLocale()` hook
- [x] 2.2 Write unit tests for `LocaleProvider` (renders children, provides locale, throws outside provider)
- [x] 2.3 Export `LocaleProvider` and `useLocale` from `src/lib/locale/index.ts`

## 3. Copy Catalogue

- [x] 3.1 Create `src/lib/locale/copy.ts` — define `CopyKeys` interface and `MoriCopy` object with all 20 standard patterns in `ja`, `en`, and `zh-Hans` (mark each zh-Hans entry with `// TODO: zh-Hans review`)
- [x] 3.2 Create `useCopy()` hook in `src/lib/locale/hooks.ts` — returns `MoriCopy[locale]` via `useLocale()`
- [x] 3.3 Write unit tests for `useCopy()` — verify correct copy returned per locale

## 4. Formatting Utilities

- [x] 4.1 Create `src/lib/locale/format.ts` — implement `formatDate(date, locale)` using `Intl.DateTimeFormat` per locale spec
- [x] 4.2 Implement `formatCurrency(amount, locale)` in `format.ts` using `Intl.NumberFormat` (JPY, no decimals)
- [x] 4.3 Write unit tests for `formatDate` — assert exact output strings for all three locales
- [x] 4.4 Write unit tests for `formatCurrency` — assert `'¥1,980'` for all three locales

## 5. Next.js Routing Configuration (Design System Guidance)

- [x] 5.1 Add `i18n` routing configuration example to `PROJECT.md` (locales array, defaultLocale, URL prefix strategy)
- [x] 5.2 Document `data-locale` root layout setup in `PROJECT.md` (how to set attribute on `<html>` in App Router)
- [x] 5.3 Document legacy route redirect pattern in `PROJECT.md` (unprefixed `/dashboard` → `/ja/dashboard`)

## 6. Supabase Schema Guidance

- [x] 6.1 Add `user_preferences.locale` column migration SQL example to `PROJECT.md` (`text`, nullable, default `'ja'`)
- [x] 6.2 Document locale persistence pattern in `PROJECT.md` (read on login, write on locale change)

## 7. PROJECT.md Updates

- [x] 7.1 Remove "Internationalisation for languages other than Japanese" from the Out of Scope section
- [x] 7.2 Update UI copy conventions section to be multi-locale (replace Japanese-only table with ja/en/zh-Hans table)
- [x] 7.3 Update the "All user-facing text in Japanese" constraint to "All user-facing text in the active locale"
- [x] 7.4 Update date/time formatting guidance to reference `formatDate` utility with locale parameter

## 8. Exports and Package Surface

- [x] 8.1 Export all locale utilities from the top-level package entry point (`src/index.ts` or equivalent) — `LocaleProvider`, `useLocale`, `useCopy`, `formatDate`, `formatCurrency`, `Locale` type
- [x] 8.2 Run `pnpm typecheck` — confirm zero type errors
- [x] 8.3 Run `pnpm test` — confirm all new unit tests pass
- [x] 8.4 Run `pnpm lint` — confirm zero lint errors
