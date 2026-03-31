## Why

The Mori showcase (`showcase/`) fails to build, typecheck, or lint because `node_modules` are not installed, and a secondary lint violation in `BadgeSection.tsx` prevents `pnpm lint` from passing even after installation. Fixing this now ensures contributors can run the showcase locally and that CI remains green.

## What Changes

- Document that `pnpm install` must be run before the showcase can operate (dependency state was missing entirely from the repo).
- Fix the lone lint error in `showcase/src/sections/BadgeSection.tsx`: replace the forbidden `Array<T>` generic syntax with the project-standard `T[]` array syntax.
- Verify `pnpm typecheck`, `pnpm lint`, and `pnpm test` all pass after fixes.

## Capabilities

### New Capabilities

_(none — this is a bug fix with no new user-facing capabilities)_

### Modified Capabilities

_(none — no spec-level behaviour changes)_

## Impact

- **File changed**: `showcase/src/sections/BadgeSection.tsx` (line 7 — array type syntax)
- **Environment**: `node_modules` must be present; no code change needed for this, but it is the root cause of cascading TS2307 errors
- **CI**: `pnpm lint` currently exits non-zero; will be green after the fix
- **No breaking changes**; showcase is an internal devtool, not a published package
