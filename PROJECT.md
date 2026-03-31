# Mori Design System

# 森 デザインシステム

> **This document is the single source of truth for all products built under the Mori umbrella.**
> Claude Code must read and follow this document before writing any code for ShiftMate, FaxBridge, or any future product.

---

## Purpose

Mori Design System (森, _mori_ = forest in Japanese) is a shared design language and component framework built for a suite of SaaS products targeting the Japanese small business market. Every design decision must reduce friction, build trust, and feel immediately familiar — not impressive or clever.

**Design Philosophy — Three Words**
**Shizen. Kantan. Shinrai.**
自然・簡単・信頼 — _Natural. Simple. Trustworthy._

---

## Users

Japanese small business owners — restaurants, retail shops, manufacturers, and wholesalers. Not tech-savvy power users. Busy, often stressed, deeply skeptical of new software. Primary device: smartphone.

---

## Products

| Product                            | Description                                               | Status            |
| ---------------------------------- | --------------------------------------------------------- | ----------------- |
| **ShiftMate** (シフトメイト)       | Shift scheduling SaaS for small restaurants & retail      | 🟡 In development |
| **FaxBridge** (ファックスブリッジ) | Fax-to-digital automation for manufacturers & wholesalers | 🟡 In development |

---

## In Scope

- Design tokens (colour, typography, spacing, radius, shadows, motion)
- Component specifications (Button, Input, Card, Badge, Navigation, Loading, Empty States, Toast)
- Page layout system (breakpoints, containers, mobile/desktop structure)
- Multi-locale support: Japanese (`ja`), English (`en`), Simplified Chinese (`zh-Hans`)
- Shared infrastructure setup (Supabase, Stripe, Vercel, Sentry, PostHog, Resend)
- Two initial products: ShiftMate and FaxBridge
- Japan legal compliance pages (プライバシーポリシー, 利用規約, 特定商取引法に基づく表記)
- Code quality rules and naming conventions

---

## Out of Scope

- iOS app (Phase 2 — after web validation)
- Global state manager (no Redux/Zustand in MVP)
- Framer Motion or page transitions in MVP
- Warning toasts (use inline form errors instead)
- Full-page spinners for data fetching (skeletons only)
- RTL script support or Traditional Chinese (`zh-Hant`)
- Machine translation or browser `Accept-Language` auto-detection in MVP

---

## Tech Stack

| Layer           | Choice                                 | Rationale                                                                     |
| --------------- | -------------------------------------- | ----------------------------------------------------------------------------- |
| Language        | TypeScript (strict)                    | Catches token misuse at compile time across shared components                 |
| Framework       | Next.js 14 (App Router)                | Server Components reduce client JS — critical for mobile on Japanese networks |
| Styling         | Tailwind CSS v4 + CSS Variables        | CSS variables enable the token system shared and extended per product         |
| Components      | shadcn/ui (Mori-customised)            | Copy-paste model means Mori owns the customisations, no override fighting     |
| Database + Auth | Supabase (PostgreSQL + Auth + Storage) | Reduces moving parts for small team building two products simultaneously      |
| Hosting         | Vercel                                 | Zero-config Next.js; edge network reduces latency for Japan                   |
| Payments        | Stripe (Billing + Checkout)            | Only mature processor with solid Japan support and yen handling               |
| Error tracking  | Sentry                                 | Catches production errors before Japanese SMB users abandon silently          |
| Analytics       | PostHog + Vercel Analytics             | PostHog for behavioural funnels; Vercel Analytics for Core Web Vitals         |
| Email           | Resend                                 | Clean API, good Japan deliverability, pairs with React Email                  |
| Testing         | Vitest + Playwright                    | Vitest for unit; Playwright for e2e with mobile viewport testing              |

---

## Constraints

- Mobile-first — 390px primary target; Japanese SMB owners use smartphones
- All user-facing text in the active locale (`ja` | `en` | `zh-Hans`) — default is Japanese
- CSS variables for all tokens — never hardcode hex or px values
- TypeScript strict mode — no `any`, explicit return types on all functions
- shadcn/ui customised to Mori spec, never used raw
- No class components; functional components only
- Japan legal compliance pages required before accepting payments

---

## Success Criteria

- Mori DS used consistently across ShiftMate and FaxBridge
- Any new product can be bootstrapped from this document alone
- Claude Code reads PROJECT.md and produces spec-compliant code without additional prompting

---

## Design Tokens

All values are defined as CSS custom properties on `:root`. **Never hardcode hex values or px values directly — always reference a token.**

### Colour Palette

```css
:root {
  /* === Brand === */
  --color-brand: #2d7a4f; /* 森緑 — primary brand green */
  --color-brand-light: #eaf3de; /* light tint for backgrounds */
  --color-brand-dark: #1a5c38; /* hover / pressed state */

  /* === Neutrals === */
  --color-ink: #1a1a1a; /* 森黒 — primary text */
  --color-ink-secondary: #4a4a4a; /* secondary text */
  --color-ink-tertiary: #8a8a8a; /* placeholder, disabled */

  /* === Surfaces === */
  --color-surface: #ffffff; /* card background */
  --color-surface-raised: #f5f3ef; /* 和紙 — page background */
  --color-surface-sunken: #edebe6; /* input background, inset */

  /* === Borders === */
  --color-border: #e8e4dc; /* 砂 — default border */
  --color-border-strong: #c8c4bc; /* focused / hover border */

  /* === Semantic === */
  --color-info: #3b82f6; /* 水 — blue */
  --color-info-light: #eff6ff;
  --color-success: #22c55e; /* 若葉 — green */
  --color-success-light: #f0fdf4;
  --color-warning: #f59e0b; /* 琥珀 — amber */
  --color-warning-light: #fffbeb;
  --color-error: #ef4444; /* 紅 — red */
  --color-error-light: #fef2f2;
}
```

### Typography Scale

```css
:root {
  /* === Font Families (locale-aware) === */
  /* CJK default — Japanese and Chinese use this base stack */
  --font-body:
    'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Noto Sans JP', 'Yu Gothic', sans-serif;
  --font-heading:
    'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Noto Sans JP', 'Yu Gothic', sans-serif;
  /* Legacy alias — kept for backward compatibility */
  --font-sans:
    'Geist', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif;
  --font-mono: 'Geist Mono', 'Osaka-Mono', monospace;

  /* === Line Height (locale-aware) === */
  /* CJK scripts need looser leading than Latin */
  --leading-body: 1.8;
  --leading-heading: 1.4;

  /* === Type Scale === */
  --text-xs: 0.75rem; /* 12px — labels, captions */
  --text-sm: 0.875rem; /* 14px — secondary body */
  --text-base: 1rem; /* 16px — primary body */
  --text-lg: 1.125rem; /* 18px — large body */
  --text-xl: 1.25rem; /* 20px — small heading */
  --text-2xl: 1.5rem; /* 24px — heading */
  --text-3xl: 1.875rem; /* 30px — large heading */
  --text-4xl: 2.25rem; /* 36px — display */

  /* === Font Weights === */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600; /* use sparingly, headings only */
}

/* Locale overrides — applied via data-locale on <html> */
[data-locale='en'] {
  --font-body: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  --font-heading: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  --leading-body: 1.6;
  --leading-heading: 1.25;
}
[data-locale='zh-Hans'] {
  --font-body: 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
  --font-heading: 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
}
```

**Rules:**

- Body text: `--text-base`, `--font-normal`, line-height `var(--leading-body)`
- UI labels: `--text-sm`, `--font-medium`
- Headings: `--font-semibold`, line-height `var(--leading-heading)`, never bold (700) in UI
- Always reference `var(--font-body)` or `var(--font-heading)` — never hardcode a font family
- The design system does **not** load web fonts — each product loads fonts via `next/font`

### Spacing Scale

Uses an 8px base grid. All spacing values are multiples of 4px.

```css
:root {
  --space-1: 0.25rem; /*  4px */
  --space-2: 0.5rem; /*  8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
}
```

### Border Radius

```css
:root {
  --radius-sm: 0.375rem; /*  6px — badges, tags */
  --radius-md: 0.5rem; /*  8px — inputs, buttons */
  --radius-lg: 0.75rem; /* 12px — cards */
  --radius-xl: 1rem; /* 16px — modals, sheets */
  --radius-full: 9999px; /* pills */
}
```

### Shadows

Minimal. Only use where elevation is semantically necessary.

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
}
```

### Motion

```css
:root {
  --duration-fast: 100ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

**Rules:**

- All interactive elements: `transition: all var(--duration-base) var(--ease-default)`
- Page transitions: none in MVP
- Loading states: skeleton shimmer only, no spinners
- Never use `animation` for layout shifts

---

## Component Specifications

### Button

```tsx
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

// Tailwind classes by variant
primary:     'bg-[--color-brand] text-white hover:bg-[--color-brand-dark]'
secondary:   'bg-white border border-[--color-border] text-[--color-ink] hover:bg-[--color-surface-raised]'
ghost:       'bg-transparent text-[--color-ink-secondary] hover:bg-[--color-surface-raised]'
destructive: 'bg-[--color-error] text-white hover:opacity-90'

base: 'inline-flex items-center justify-center gap-2 font-medium rounded-[--radius-md]
       transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-brand]'
sm:   'h-8 px-3 text-sm'
md:   'h-10 px-4 text-sm'   /* default */
lg:   'h-12 px-6 text-base'
```

**Rules:**

- One primary button per page section maximum
- Loading state: replace label with spinner icon + "処理中..." text
- Destructive actions always require confirmation dialog
- Icon-only buttons must have `aria-label`

### Input

```tsx
base: 'w-full h-10 px-3 bg-[--color-surface-sunken] border border-[--color-border]
       rounded-[--radius-md] text-sm text-[--color-ink] placeholder:text-[--color-ink-tertiary]
       transition-colors duration-200
       focus:outline-none focus:border-[--color-brand] focus:ring-1 focus:ring-[--color-brand]
       disabled:opacity-50 disabled:cursor-not-allowed'

error: 'border-[--color-error] focus:border-[--color-error] focus:ring-[--color-error]'
```

Always pair with:

- `<label>` above — `--text-sm`, `--font-medium`, `--color-ink-secondary`
- Error message below — `--color-error`, `--text-xs`
- Helper text below — `--color-ink-tertiary`, `--text-xs`

### Card

```tsx
base: 'bg-[--color-surface] border border-[--color-border] rounded-[--radius-lg] p-6'
interactive: base + ' cursor-pointer transition-shadow duration-200 hover:shadow-[--shadow-md]'
highlighted: base + ' border-[--color-brand] border-2'
```

### Badge / Tag

```tsx
base: 'inline-flex items-center px-2 py-0.5 rounded-[--radius-sm] text-xs font-medium'
green: base + ' bg-[--color-success-light] text-[--color-success]'
amber: base + ' bg-[--color-warning-light] text-[--color-warning]'
red: base + ' bg-[--color-error-light] text-[--color-error]'
blue: base + ' bg-[--color-info-light] text-[--color-info]'
gray: base + ' bg-[--color-surface-sunken] text-[--color-ink-secondary]'
brand: base + ' bg-[--color-brand-light] text-[--color-brand-dark]'
```

### Navigation

Mobile-first pattern:

- Mobile (< 768px): Bottom tab bar, 4–5 items max
- Desktop (≥ 768px): Left sidebar, collapsible

```tsx
tab:            'flex flex-col items-center gap-1 px-3 py-2 text-xs text-[--color-ink-tertiary]'
tab-active:     'text-[--color-brand] font-medium'

sidebar:        'flex items-center gap-3 px-3 py-2 rounded-[--radius-md] text-sm
                 text-[--color-ink-secondary] hover:bg-[--color-surface-raised]
                 transition-colors duration-150'
sidebar-active: 'bg-[--color-brand-light] text-[--color-brand-dark] font-medium'
```

### Loading States

```tsx
skeleton: 'animate-pulse bg-[--color-surface-sunken] rounded-[--radius-md]'
// Full page loader — only on initial auth check
// Never use full-page spinner for data fetching — use skeletons
```

### Empty States

Every list, table, and data view must have an empty state.

```
Icon (Lucide, 48px, --color-ink-tertiary)
Heading (--text-lg, --font-medium, --color-ink)
Description (--text-sm, --color-ink-secondary, max-width: 280px, centered)
Primary CTA button (optional)
```

### Toast / Notifications

Use `sonner` library (included in shadcn/ui setup).

```tsx
toast.success('シフトを保存しました') // green — 4000ms
toast.error('エラーが発生しました') // red — 6000ms
toast.info('新しいシフトリクエストがあります') // blue — 4000ms
// No warning toasts — use inline form errors instead
```

### Dialog

```tsx
type DialogVariant = 'default' | 'confirm'

// Overlay — covers full viewport behind the panel
overlay: 'fixed inset-0 bg-black/40 backdrop-blur-sm z-50
          flex items-center justify-center
          transition-opacity duration-200'

// Panel — desktop centered, mobile bottom-sheet (see Rules)
base:   'relative bg-[--color-surface] border border-[--color-border]
         rounded-[--radius-xl] shadow-[--shadow-lg]
         w-full max-w-md mx-4
         transition-all duration-200 ease-out'

header: 'px-6 pt-6 pb-2'
  title:    'text-lg font-[--font-semibold] text-[--color-ink]'
  subtitle: 'mt-1 text-sm text-[--color-ink-secondary]'

body:   'px-6 py-4 text-sm text-[--color-ink-secondary] leading-relaxed'

footer: 'px-6 pb-6 pt-2 flex justify-end gap-3'

// Confirm variant — cancel left, action right (Japanese convention)
confirm-footer: 'px-6 pb-6 pt-2 flex justify-end gap-3'
  cancel:      <Button variant="secondary">キャンセル</Button>
  action:      <Button variant="primary | destructive">{label}する</Button>

// Mobile bottom-sheet variant (< 768px)
mobile-panel: 'fixed bottom-0 left-0 right-0
               rounded-t-[--radius-xl] rounded-b-none
               transition-transform duration-300 ease-out'
```

**Rules:**

- Destructive actions always require a confirm dialog — never a toast
- Confirm dialog: cancel on the left, destructive action on the right — always
- Destructive body must include: `この操作は取り消せません。`
- Close triggers: ESC key, overlay click — except `disableOutsideClose` on destructive confirms
- Focus must be trapped inside an open dialog; restored to trigger element on close
- On mobile (< 768px): render as bottom sheet sliding up from the bottom edge
- Loading state on confirm: show `処理中...` on the action button; disable both buttons
- Always set `aria-labelledby` pointing to the dialog title element

---

## Page Layout System

### Breakpoints

```
mobile:   < 768px   (primary target)
tablet:   768–1023px
desktop:  ≥ 1024px
```

### Layout Containers

```tsx
'min-h-screen bg-[--color-surface-raised]' // page wrapper
'max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8' // content container
'py-8 md:py-12' // section spacing
'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' // card grid
```

### Page Structure

```
Mobile:                          Desktop:
┌─────────────────────┐          ┌──────────┬──────────────────────┐
│  Header (56px)      │          │          │  Top bar (56px)      │
├─────────────────────┤          │ Sidebar  ├──────────────────────┤
│                     │          │ (240px)  │                      │
│  Content Area       │          │          │  Content Area        │
│  pb-20 for tab bar  │          │          │                      │
├─────────────────────┤          └──────────┴──────────────────────┘
│  Bottom Tab Bar     │
│  (fixed, 60px)      │
└─────────────────────┘
```

---

## Localisation

Supported locales: **`ja`** (Japanese, default) · **`en`** (English) · **`zh-Hans`** (Simplified Chinese)

### Locale Setup (Next.js App Router)

```ts
// next.config.ts
i18n: {
  locales: ['ja', 'en', 'zh'],
  defaultLocale: 'ja',
}

// app/[locale]/layout.tsx — set data-locale on <html> for CSS overrides
<html lang={locale} data-locale={locale}>
```

Legacy unprefixed routes must redirect to `/ja/` equivalents via `next.config.ts` `redirects`.

### Font Rendering

```css
body {
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  line-height: var(--leading-body);
}
```

### UI Copy Guidelines

Use `useCopy()` from `@mori/ui` to get locale-aware strings. Never hardcode copy in components.

| Pattern | `ja` | `en` | `zh-Hans` |
|---------|------|------|-----------|
| Save action | 保存する | Save | 保存 |
| Delete action | 削除する | Delete | 删除 |
| Cancel | キャンセル | Cancel | 取消 |
| Loading | 処理中... | Loading... | 处理中... |
| Success | ✓ 保存しました | ✓ Saved | ✓ 已保存 |
| Error | エラーが発生しました。もう一度お試しください。 | Something went wrong. Please try again. | 发生错误，请重试。 |
| Empty state | まだデータがありません | No data yet | 暂无数据 |
| Destructive hint | この操作は取り消せません。 | This action cannot be undone. | 此操作无法撤消。 |

**Rules:**
- Japanese actions end in `する` — `保存する`, `削除する`, `追加する` (never `保存`, `削除`)
- Destructive action always on the RIGHT in confirm dialogs — all locales
- `zh-Hans` copy is marked `// TODO: zh-Hans review` until human-reviewed

### Date & Number Formatting

Use `formatDate` and `formatCurrency` from `src/lib/locale/format.ts`:

```tsx
import { formatDate, formatCurrency } from '@mori/ui'

formatDate(new Date('2025-01-28'), 'ja')       // → 2025年1月28日(火)
formatDate(new Date('2025-01-28'), 'en')       // → Tuesday, January 28, 2025
formatDate(new Date('2025-01-28'), 'zh-Hans')  // → 2025年1月28日 星期二

formatCurrency(1980, 'ja')        // → ¥1,980  (all locales — products are JPY-priced)
formatCurrency(1980, 'en')        // → ¥1,980
formatCurrency(1980, 'zh-Hans')   // → ¥1,980

// Time (24-hour, all locales)
const formatTime = (date: Date, locale: string) =>
  new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hour12: false }).format(date)
// → 09:00
```

---

## Accessibility

```
Colour contrast:  WCAG AA — 4.5:1 body text, 3:1 large text / UI
Focus indicators: ring-2 ring-[--color-brand] ring-offset-2 — always visible
Touch targets:    Minimum 44×44px on mobile
ARIA labels:      Required on all icon-only buttons and form inputs
Keyboard nav:     All interactive elements reachable by Tab key
```

---

## File & Folder Structure

```
my-product/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx          ← sidebar/nav shell
│   │   └── [feature]/page.tsx
│   ├── api/
│   │   └── [route]/route.ts
│   ├── globals.css             ← all CSS tokens defined here
│   └── layout.tsx              ← root layout, font loading
├── components/
│   ├── ui/                     ← shadcn/ui base (Mori-customised)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── [feature]/              ← feature-specific components
│   └── shared/                 ← shared across features
├── lib/
│   ├── supabase/
│   │   ├── client.ts           ← browser client
│   │   └── server.ts           ← server client
│   ├── stripe.ts
│   └── utils.ts
├── hooks/                      ← custom React hooks
├── types/                      ← TypeScript type definitions
├── public/
│   └── locales/ja/             ← Japanese string files (if using i18n)
├── .env.local                  ← never commit
├── .env.example                ← commit this
└── PROJECT.md                  ← product-specific version (extends this doc)
```

---

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APP_NAME=

# Optional
SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=
```

---

## Locale Persistence (Supabase)

Add a `locale` column to `user_preferences` so the user's locale follows them across devices:

```sql
-- Migration: add locale preference to user_preferences
alter table user_preferences
  add column if not exists locale text default 'ja';
```

**Pattern:**
1. On login: read `user_preferences.locale`, redirect to `/<locale>/dashboard`
2. When user switches locale (e.g. via a language picker): update `user_preferences.locale` and reload

```ts
// On locale switch
await supabase
  .from('user_preferences')
  .upsert({ user_id: userId, locale: newLocale })
router.push(`/${newLocale}${pathname}`)
```

---

## Code Quality Rules

```
TypeScript:    Strict mode. No `any`. Explicit return types on all functions.
Components:    Functional only. No class components.
State:         useState for local. No global state manager in MVP.
Data fetching: Server Components for initial data. Client Components for interactivity.
Error handling: Every async function wrapped in try/catch. User-facing errors in Japanese.
Comments:      In English. Explain WHY, not WHAT.
Naming:
  Files:       kebab-case        (shift-table.tsx)
  Components:  PascalCase        (ShiftTable)
  Functions:   camelCase         (getShiftsByDate)
  Constants:   SCREAMING_SNAKE   (MAX_STAFF_PER_SHIFT)
  Types:       PascalCase        (ShiftEntry, not Shift)
```

---

## Compliance Requirements (Japan)

Required before accepting payments:

| Page                              | Japanese Name            | Required By    |
| --------------------------------- | ------------------------ | -------------- |
| Privacy Policy                    | プライバシーポリシー     | 個人情報保護法 |
| Terms of Service                  | 利用規約                 | Best practice  |
| Specified Commercial Transactions | 特定商取引法に基づく表記 | 特定商取引法   |

---

## Product-Specific Extensions

Each product maintains its own `PROJECT.md` that imports this document and extends it:

```markdown
# ShiftMate — PROJECT.md

> Extends: Mori Design System PROJECT.md (read that first)

## Product-specific tokens

--color-shift-morning: #FEF9C3;
--color-shift-evening: #EDE9FE;
```

---

## Last Updated

2026-03-31

_Owner: Albert (横浜)_
_Products: ShiftMate · FaxBridge · (future)_
