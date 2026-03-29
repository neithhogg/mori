# Project Journal

A running record of decisions, pivots, and future direction.
Append — never overwrite. Run /project-sync to add new entries.

---

## 2026-03-29 — Project initialized

### Why this project

Japanese small business owners (restaurants, retail, manufacturers) are not tech-savvy. They are busy, stressed, and skeptical of new software. Mori DS exists to give every product built for this market a shared design language that feels natural, simple, and trustworthy — 自然・簡単・信頼 — out of the box.

Two products are being built simultaneously (ShiftMate and FaxBridge), making a shared design system essential to avoid duplicating design decisions and drifting apart visually or behaviourally.

### Key decisions made today

**TypeScript strict mode** — enforces correct token usage across components shared between products. The cost in boilerplate is worth the safety in a multi-product codebase.

**Next.js 14 App Router** — Server Components reduce client-side JavaScript, which matters for mobile users on Japanese mobile networks. This also enables a clean separation between data-fetching (server) and interactive (client) components.

**CSS Variables + Tailwind** — the token system (`--color-brand`, `--space-4`, etc.) is defined once in `globals.css` and shared across ShiftMate and FaxBridge. Each product can extend it with product-specific tokens without forking the base.

**shadcn/ui copy-paste model** — components live in the repo, so Mori customisations are owned outright. No fighting a component library's override system.

**Supabase** — eliminates separate auth service and object storage. Reduces moving parts for a small team shipping two products.

**No Framer Motion in MVP** — Tailwind transitions only. Keeps bundle size down and avoids over-engineering for users who don't expect or notice complex animations.

**No global state manager in MVP** — `useState` only. Defer Zustand or similar until the complexity genuinely demands it.

**Mobile-first at 390px** — Japanese SMB owners use smartphones as their primary device. Desktop is secondary.

### Future vision

- iOS app (SwiftUI) in Phase 2, after web validation, with design tokens mapped 1:1 from Mori web tokens
- Additional products beyond ShiftMate and FaxBridge can be bootstrapped directly from this document
- Potential extraction of Mori DS components into a standalone package if the product suite grows significantly
