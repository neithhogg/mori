## Context

The Mori DS repo defines all design tokens in `PROJECT.md` as documentation, but no CSS file exists to ship them. The `src/` directory contains only an empty `src/index.ts`. Before any product (ShiftMate, FaxBridge) can reference `--color-brand` or `--space-4` in their Tailwind config or component styles, those variables must exist in an importable CSS artifact. This change creates that file — nothing more.

## Goals / Non-Goals

**Goals:**
- Ship all 6 token groups from PROJECT.md as CSS custom properties on `:root`
- Place the file at `src/tokens/globals.css` so it is distinct from product-level `app/globals.css`
- Write Vitest tests that assert token completeness and naming fidelity
- Keep the implementation trivial — a single CSS file with zero runtime cost

**Non-Goals:**
- Tailwind config extension or `theme.extend` integration (product repos own their Tailwind config)
- TypeScript token name literals or type-safe token references (not needed until a component library ships)
- Dark mode token variants (not defined in PROJECT.md — future change)
- SCSS variables, CSS-in-JS, or any runtime token system
- iOS token mapping (Phase 2 — out of scope)

## Decisions

### Decision 1: Single `src/tokens/globals.css` file over per-group files

Splitting tokens into `colors.css`, `typography.css`, etc. would require products to import multiple files and manage the order. A single flat file is simpler to consume (`@import '@mori/design-system/tokens'`) and easier to audit for drift against PROJECT.md. The file is small enough (~80 lines) that splitting adds no value.

### Decision 2: CSS custom properties on `:root` over Tailwind `theme.extend`

Tailwind config extension locks tokens to Tailwind's utility class system. CSS custom properties work in any context — Tailwind, plain CSS, inline styles, and eventually SwiftUI (via a mapping step). The PROJECT.md constraint "CSS variables for all tokens — never hardcode hex or px values" implies CSS custom properties, not Tailwind config values.

### Decision 3: Products consume via `@import` — no package export yet

The mori repo has no `package.json` `exports` field and `src/index.ts` exports nothing. Rather than adding a package export prematurely, products copy or `@import` the file directly. The `src/index.ts` comment is updated to note the token file exists. Package export can be added in a future change when the design system becomes a proper npm package.

### Decision 4: Vitest tests read the CSS file as a string

Testing CSS custom property presence is straightforward: read `globals.css` as a string and assert each required token name appears. A regex test checks for accidental hardcoded hex values outside of comments. This is a build-time correctness check, not a browser rendering test.

## Risks / Trade-offs

- **Token drift** — PROJECT.md is the source of truth; if tokens are added to PROJECT.md without updating `globals.css`, they silently go missing → Mitigation: the Vitest test suite asserts every token name and count; failing tests block implementation from being archived.
- **`@import` path changes** — if the repo is restructured, product import paths break → Mitigation: document the import path in `JOURNAL.md`; address when package exports are added.

## Migration Plan

1. Create `src/tokens/` directory
2. Create `src/tokens/globals.css` with all 6 token groups
3. Create `src/tokens/__tests__/globals.test.ts` with Vitest assertions
4. Update `src/index.ts` comment
5. Run `pnpm typecheck` — must pass with 0 errors
6. Run `pnpm test` (once Vitest is configured) — all token assertions pass

Rollback: delete `src/tokens/` — no other files are affected.
