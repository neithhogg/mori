## Context

The Mori showcase is a Vite + React app inside `showcase/` used to visually verify all design-system components against Mori tokens. It is an internal devtool — not a published npm package.

Two problems were found:

1. **Missing `node_modules`** — The repo was cloned (or reset) without running `pnpm install`, so every `import` from `react`, `@types/react`, etc. resolves to nothing. TypeScript emits ~80+ TS2307 / TS7026 errors as a cascade. Running `pnpm install` resolves all of them.

2. **Lint violation in `BadgeSection.tsx`** — Line 7 declares a constant using `Array<T>` generic syntax, which is forbidden by the `@typescript-eslint/array-type` rule set to `"array"`. All other files in the repo consistently use `T[]`. This is a mechanical one-line fix.

## Goals / Non-Goals

**Goals:**
- `pnpm typecheck` exits 0 with no errors
- `pnpm lint` exits 0 with no errors
- `pnpm test` continues to pass
- The showcase renders correctly in the browser after `pnpm dev`

**Non-Goals:**
- Adding new showcase sections or components
- Changing any design token, component API, or spec
- Setting up CI automation for dependency installation (separate concern)

## Decisions

**Fix `Array<T>` → `T[]` in BadgeSection.tsx**

The ESLint rule `@typescript-eslint/array-type` is already configured to enforce `T[]` syntax project-wide. The `Array<T>` usage was a simple oversight. The fix is a single character-level edit with no functional impact.

Alternatives considered:
- Disable the rule for that line with `// eslint-disable-next-line` — rejected; the rule exists for a reason and the fix is trivial.
- Change the rule to `"generic"` — rejected; the rest of the codebase uses `T[]` and we won't change convention to match one outlier.

**No code change needed for the dependency issue**

`pnpm install` is the fix. The `package.json` already declares all correct dependencies (`react`, `@types/react`, `@types/react-dom`, etc.). The issue is purely environmental.

## Risks / Trade-offs

- [Risk] Future contributors may re-encounter the "missing node_modules" problem if they forget to install after cloning.
  → Mitigation: Out of scope for this change; a `postclone` script or README note is a separate improvement.

- [Risk] The lint fix is so small it could be missed in review.
  → Mitigation: Tasks doc calls it out explicitly by file and line number.
