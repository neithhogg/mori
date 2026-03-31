## Why

The Mori Design System is currently Japanese-only, with English and Chinese explicitly out of scope. Supporting Japanese, English, and Simplified Chinese expands the addressable market to include non-Japanese-speaking operators (e.g. Chinese-owned restaurants, international franchise staff) and enables future products to launch outside Japan without a design system rewrite.

## What Changes

- Add a `locale` context (`ja` | `en` | `zh-Hans`) to the design system, driving UI copy, date/number formatting, and typography
- Define locale-aware typography tokens (font stacks, line-height adjustments) for CJK vs Latin scripts
- Specify a locale-detection and locale-switching pattern (URL prefix or user preference stored in Supabase profile)
- Update all component specs to reference locale-aware copy tokens rather than hardcoded Japanese strings
- Update Japanese UI copy conventions doc to become a multi-locale copy conventions doc
- Define English and Simplified Chinese equivalents for all standard UI copy patterns (actions, errors, empty states, confirmations)
- Remove "i18n for languages other than Japanese" from the Out of Scope list in PROJECT.md

## Capabilities

### New Capabilities

- `localisation-core`: Locale context, detection, and switching mechanism; supported locales (`ja`, `en`, `zh-Hans`); locale-aware formatting utilities for dates, currency, and numbers
- `localisation-copy`: Standard UI copy patterns (actions, errors, loading, empty states, confirmations, success messages) in all three locales
- `localisation-typography`: Per-locale font stack and typographic adjustment tokens (CJK vs Latin line-height, font-size scaling)

### Modified Capabilities

- `design-tokens`: Add locale-aware typography token variants (font stacks, line-height) alongside existing fixed tokens

## Impact

- **PROJECT.md**: Remove i18n from Out of Scope; add locale tokens to design tokens section; update UI conventions section to be multi-locale
- **All component specs**: Copy strings must reference locale-aware copy keys rather than hardcoded Japanese text
- **Product repos** (ShiftMate, FaxBridge): Must wrap root layout with locale provider; update all hardcoded Japanese copy to use copy keys
- **Supabase schema**: `user_preferences` table needs a `locale` column
- **Next.js routing**: URL prefix strategy (`/ja/`, `/en/`, `/zh/`) or cookie/header-based detection (TBD in design)
- **No new dependencies required** — use native `Intl` APIs and Next.js built-in i18n routing
