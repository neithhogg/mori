# Project Journal

_Last updated: 2026-04-02_

## Current

- [x] Repo initialized with TypeScript, ESLint, Prettier, pnpm
- [x] Dialog component spec added to PROJECT.md
- [x] Design tokens implemented — `src/tokens/globals.css` (57 CSS vars, 65 Vitest tests)
- [x] OpenSpec CLI (@fission-ai/openspec v1.2.0) installed
- [x] Core component library — Button, Input, Card, Badge, Skeleton, Dialog, BottomTabBar, Sidebar (160 Vitest tests)
- [x] React-powered component showcase (`pnpm dev`) — all 7 components with live interactive demos
- [x] Data display components — StatCard, DataTable, ActivityTimeline (added 2026-04-02)
  - **Card padding change**: `p-6` → `p-4 sm:p-5` (mobile 16px / desktop 20px) to align with StatCard's surface treatment. Visual-only; no API change.
  - DataTable uses sticky header + sticky first column + horizontal scroll for mobile data density
  - ActivityTimeline uses `Intl.RelativeTimeFormat('ja-JP')` for relative timestamps; absolute in `aria-label`/`title`

## Future

- [ ] Empty States component
- [ ] Toast / notification component
- [ ] Page layout system spec
- [ ] Japanese localisation utilities (date, currency, time formatters)
- [ ] Shared infrastructure setup (Supabase, Stripe, Vercel, Sentry, PostHog, Resend)
- [ ] Japan legal compliance pages (プライバシーポリシー, 利用規約, 特定商取引法)
- [ ] ShiftMate and FaxBridge product setup
- [ ] Package exports for `@mori/design-system`
