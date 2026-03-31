## Context

Mori DS currently assumes Japanese as the only locale. UI copy is hardcoded in Japanese across component specs, PROJECT.md conventions, and product repos. Typography tokens assume CJK character metrics. There is no locale context, no switching mechanism, and no structured copy catalogue.

This design adds first-class multi-locale support for Japanese (`ja`), English (`en`), and Simplified Chinese (`zh-Hans`) without introducing a third-party i18n library, keeping the stack lean and fully type-safe.

## Goals / Non-Goals

**Goals:**
- Define a `Locale` type and locale context consumed by all Mori components
- Establish a structured copy catalogue (`MoriCopy`) keyed by locale, covering all standard UI patterns
- Define per-locale typography tokens (font stacks, line-height) as CSS variable overrides on `[data-locale]`
- Specify locale detection and switching for Next.js App Router (URL prefix strategy)
- Provide locale-aware formatting utilities for dates, currency, and numbers using native `Intl`
- Keep design system and product repos fully type-safe — accessing a missing copy key is a compile error

**Non-Goals:**
- Right-to-left (RTL) script support
- Traditional Chinese (`zh-Hant`)
- Machine translation or auto-detection from browser `Accept-Language` in MVP
- Per-component copy overrides (product repos use the catalogue; they don't fork it)
- iOS localisation (deferred to Phase 2)

## Decisions

### Decision 1: No third-party i18n library — use a typed copy catalogue + `Intl`

**Choice:** A hand-written `MoriCopy` TypeScript object (keyed `{ ja, en, 'zh-Hans' }`) plus native `Intl.DateTimeFormat`, `Intl.NumberFormat`.

**Alternatives considered:**
- `next-intl`: Mature, file-based, but adds a runtime dependency and its own routing adapter. Overkill for three locales and a controlled copy set.
- `react-i18next`: Popular but adds ~30 kB and requires a separate translation file pipeline. Excessive for a design system with a bounded copy catalogue.

**Rationale:** The copy catalogue is small and bounded. Type-safety via TypeScript literal types gives us compile-time exhaustiveness checking with zero runtime cost. Native `Intl` handles all formatting needs.

---

### Decision 2: URL-prefix locale routing (`/ja/`, `/en/`, `/zh/`)

**Choice:** Next.js built-in `i18n` config with `locales: ['ja', 'en', 'zh']` and `defaultLocale: 'ja'`. All routes are prefixed; `ja` prefix is canonical but can be omitted in links via `as` prop.

**Alternatives considered:**
- Cookie/header-based detection with no URL change: Breaks deep links, makes locale invisible to SEO crawlers, harder to test.
- Subdomain strategy (`en.shiftmate.jp`): Requires DNS config per locale; too operationally heavy for MVP.

**Rationale:** URL prefix is the standard Next.js approach, works out of the box with App Router, and makes locale explicit for both users and search engines. Vercel edge routing handles redirects automatically.

---

### Decision 3: Per-locale typography via `[data-locale]` CSS attribute on `<html>`

**Choice:** Set `data-locale="ja|en|zh"` on the `<html>` element in the root layout. CSS rules scoped to `[data-locale="en"]` override font-stack and line-height tokens.

**Alternatives considered:**
- Separate CSS variable sets per locale injected via inline `style`: Works but pollutes JSX and is harder to audit.
- Tailwind `variant` strategy: Not standard in Tailwind v3; requires plugin.

**Rationale:** CSS attribute selectors on `<html>` are zero-JS, SSR-safe, and easy to inspect in DevTools. A single `[data-locale="en"] { --font-body: ...; --leading-body: ...; }` block is sufficient.

---

### Decision 4: Locale stored in Supabase user profile, not local storage

**Choice:** `user_preferences.locale` column (`text`, default `'ja'`). On first login, locale is inferred from the URL prefix and saved. Subsequent logins restore the saved locale.

**Alternatives considered:**
- `localStorage` only: Lost on new device, not synced across browser/mobile.
- Cookie only: Works for SSR but not queryable server-side in Supabase RLS context.

**Rationale:** Server-side persistence means the locale follows the user across devices. Supabase RLS already protects the column. The URL prefix takes precedence for unauthenticated pages.

## Risks / Trade-offs

**[Risk] Copy catalogue divergence** — As products add feature-specific copy, they may fork the catalogue rather than contributing back.
→ Mitigation: The `MoriCopy` type is the source of truth in this repo. Product repos extend it via a `ProductCopy` type that intersects with `MoriCopy`; they cannot shadow core keys.

**[Risk] CJK line-height assumptions bleed into English layouts** — Existing components are designed with CJK metrics. English text at the same line-height will feel loose.
→ Mitigation: `localisation-typography` spec defines explicit `--leading-body` overrides per locale. All components must use `--leading-body` rather than a hardcoded value.

**[Risk] Simplified Chinese copy quality** — Machine-translated zh-Hans copy will feel unnatural to native speakers.
→ Mitigation: Initial zh-Hans copy is human-reviewed before any public release. Copy is marked `// TODO: zh-Hans review` until confirmed.

**[Risk] URL prefix breaks existing ShiftMate/FaxBridge links** — Existing `/dashboard` paths become `/ja/dashboard`.
→ Mitigation: Next.js `redirects` config maps legacy unprefixed paths to `/ja/` equivalents. Old links continue to work.

## Migration Plan

1. Merge this change into Mori DS main; publish updated `PROJECT.md` and spec files
2. Add `i18n` config to Next.js in ShiftMate and FaxBridge repos
3. Add `user_preferences.locale` column via Supabase migration (nullable, default `'ja'`)
4. Wrap root layout with `LocaleProvider`; set `data-locale` on `<html>`
5. Replace all hardcoded Japanese copy strings with `copy[locale].*` references
6. Add `redirects` for legacy unprefixed routes
7. QA: smoke-test all three locales on mobile (390px) and desktop

Rollback: Remove `i18n` config from Next.js; legacy paths continue to work. User preference column can remain (nullable, unused).

## Open Questions

- Should `zh-Hans` use `¥` (yen) or `¥`/`元` for currency display when a Chinese-market product is added? (Deferred — current products are Japan-only priced in JPY)
- Do LINE API notifications (ShiftMate) need locale-aware templates? (Out of scope for this change; tracked separately)
