# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## What This Repo Is

Mori Design System (森, *mori* = forest) is a shared design language and component framework for a suite of SaaS products targeting the Japanese small business market. It defines design tokens, component specs, layout rules, and Japanese localisation standards used across two initial products: **ShiftMate** (shift scheduling for restaurants & retail) and **FaxBridge** (fax-to-digital automation for manufacturers & wholesalers). Every decision must reduce friction, build trust, and feel familiar — not impressive or clever.

**Design Philosophy:** 自然・簡単・信頼 — *Shizen. Kantan. Shinrai. (Natural. Simple. Trustworthy.)*

> Read `PROJECT.md` before writing any code for ShiftMate, FaxBridge, or any future Mori product.

## Commands

### Build
not detected

### Test
not detected

### Lint
not detected

### Run / Start
not detected

*This repo is a design system specification, not a runnable application. Individual products (ShiftMate, FaxBridge) have their own repos with build commands.*

## Architecture

This repo is the single source of truth for the Mori umbrella. `PROJECT.md` defines all tokens, component specs, layout patterns, and Japanese localisation rules. `openspec/` contains OpenSpec change proposals. `JOURNAL.md` tracks decisions and history. Product repos extend this document via their own `PROJECT.md`.

## Tech Stack (per-product)

| Layer | Choice |
|---|---|
| Language | TypeScript (strict — no `any`, explicit return types) |
| Framework | Next.js 14 App Router |
| Styling | Tailwind CSS v3 + CSS Variables |
| Components | shadcn/ui (Mori-customised) |
| Database + Auth | Supabase |
| Hosting | Vercel |
| Payments | Stripe |
| Testing | Vitest + Playwright |

## Code Style

- **TypeScript strict mode** — no `any`, explicit return types on all functions
- **Functional components only** — no class components
- **CSS variables for all tokens** — never hardcode hex or px values
- **shadcn/ui customised to Mori spec** — never used raw
- Files: `kebab-case` · Components: `PascalCase` · Functions: `camelCase` · Constants: `SCREAMING_SNAKE` · Types: `PascalCase`
- Comments in English. Explain WHY, not WHAT.

## Key Conventions

- Mobile-first — 390px primary target; Japanese SMB owners use smartphones
- All user-facing text in Japanese
- Every async function wrapped in try/catch; user-facing errors in Japanese
- Never full-page spinners for data fetching — skeletons only
- No warning toasts — use inline form errors instead
- No global state manager (no Redux/Zustand) in MVP
- Japan legal compliance pages required before accepting payments (プライバシーポリシー, 利用規約, 特定商取引法に基づく表記)

## Out of Scope

- iOS app (Phase 2)
- Framer Motion or page transitions in MVP
- i18n for languages other than Japanese

## Last Updated
2026-03-29
