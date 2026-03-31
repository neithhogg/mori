## ADDED Requirements

### Requirement: Supported locales are defined as a TypeScript type
The system SHALL define a `Locale` type as `'ja' | 'en' | 'zh-Hans'` in `src/lib/locale/types.ts`. All locale-aware APIs MUST use this type. Using a raw `string` where `Locale` is expected SHALL be a compile error.

#### Scenario: Type exhaustiveness
- **WHEN** a switch statement covers all `Locale` values
- **THEN** TypeScript SHALL infer the default branch as `never`, confirming exhaustiveness

#### Scenario: Invalid locale rejected
- **WHEN** a value `'fr'` is passed where `Locale` is expected
- **THEN** the TypeScript compiler SHALL emit an error

---

### Requirement: Locale context is provided at the root layout
The root layout in each product repo SHALL render a `LocaleProvider` component (exported from `@mori/ui`) that makes the current `Locale` available via a `useLocale()` hook to all descendant components. The provider MUST accept a `locale: Locale` prop.

#### Scenario: Locale available to child components
- **WHEN** a component calls `useLocale()` inside a `LocaleProvider`
- **THEN** it SHALL receive the `Locale` value passed to the provider

#### Scenario: Missing provider throws
- **WHEN** a component calls `useLocale()` outside any `LocaleProvider`
- **THEN** it SHALL throw a descriptive error: `"useLocale must be used inside LocaleProvider"`

---

### Requirement: Next.js i18n routing is configured with URL prefixes
Each product's `next.config.ts` SHALL include an `i18n` block with `locales: ['ja', 'en', 'zh']` and `defaultLocale: 'ja'`. The URL prefix SHALL be the locale code (e.g. `/en/dashboard`). The `ja` locale SHALL be the default and MAY be served without an explicit prefix via Next.js `prefetch` links.

#### Scenario: English locale URL
- **WHEN** a user navigates to `/en/dashboard`
- **THEN** the page SHALL render with locale `'en'` active

#### Scenario: Default locale redirect
- **WHEN** a user navigates to `/dashboard` (no prefix)
- **THEN** Next.js SHALL serve the page as locale `'ja'`

---

### Requirement: Locale is persisted to the user profile
When an authenticated user accesses the app with a locale prefix, the system SHALL update `user_preferences.locale` in Supabase to the current locale. On subsequent logins, the app SHALL redirect to the locale saved in the profile.

#### Scenario: Locale saved on first access
- **WHEN** an authenticated user loads `/en/dashboard` for the first time
- **THEN** `user_preferences.locale` SHALL be updated to `'en'` in Supabase

#### Scenario: Locale restored on login
- **WHEN** a user with `user_preferences.locale = 'zh-Hans'` logs in at `/`
- **THEN** the app SHALL redirect them to `/zh/`

---

### Requirement: Locale-aware date formatting utility
`src/lib/locale/format.ts` SHALL export a `formatDate(date: Date, locale: Locale): string` function. It MUST use `Intl.DateTimeFormat` with locale-appropriate options:
- `ja`: `2025年1月28日(火)` — uses `'ja-JP'` with `era`-omitted full date + weekday
- `en`: `Tuesday, January 28, 2025` — uses `'en-US'` with `weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'`
- `zh-Hans`: `2025年1月28日 星期二` — uses `'zh-Hans-CN'` with full date + weekday

#### Scenario: Japanese date format
- **WHEN** `formatDate(new Date('2025-01-28'), 'ja')` is called
- **THEN** it SHALL return `'2025年1月28日(火)'`

#### Scenario: English date format
- **WHEN** `formatDate(new Date('2025-01-28'), 'en')` is called
- **THEN** it SHALL return `'Tuesday, January 28, 2025'`

#### Scenario: Chinese date format
- **WHEN** `formatDate(new Date('2025-01-28'), 'zh-Hans')` is called
- **THEN** it SHALL return `'2025年1月28日 星期二'`

---

### Requirement: Locale-aware currency formatting utility
`format.ts` SHALL export a `formatCurrency(amount: number, locale: Locale): string` function using `Intl.NumberFormat`. All three locales display JPY with no decimal places and a `¥` prefix. The thousand separator SHALL be a comma.

#### Scenario: Currency formatted for all locales
- **WHEN** `formatCurrency(1980, locale)` is called for any supported locale
- **THEN** it SHALL return `'¥1,980'`

---

### Requirement: `data-locale` attribute is set on `<html>`
The root layout SHALL set `data-locale` on the `<html>` element to the active `Locale` value (`'ja'`, `'en'`, or `'zh-Hans'`). This is the hook used by CSS to apply per-locale typography overrides.

#### Scenario: Attribute present in rendered HTML
- **WHEN** the page is rendered with locale `'en'`
- **THEN** the `<html>` element SHALL have `data-locale="en"`
