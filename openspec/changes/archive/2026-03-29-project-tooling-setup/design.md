## Context

The Mori DS repo was initialized as a specification document with no runnable tooling. To enforce the code quality rules it defines (TypeScript strict, no `any`, explicit return types) and serve as a trustworthy template for product repos, the repo itself must be set up with the same standards it prescribes. This is a one-time bootstrapping — there is no migration complexity.

## Goals / Non-Goals

**Goals:**
- Pin Node.js LTS so all contributors use the same runtime
- Establish pnpm as the package manager with npm/yarn blocked
- TypeScript strict config that product repos can extend
- ESLint + Prettier config that enforces PROJECT.md code quality rules
- All tooling runnable via simple `pnpm <script>` commands

**Non-Goals:**
- Building a Next.js app or component library in this repo (product repos do that)
- Setting up Vitest or Playwright (no code to test in this spec repo)
- CI/CD pipeline (separate change)
- Husky or lint-staged pre-commit hooks (can be added later)

## Decisions

### Decision 1: ESLint flat config (eslint.config.mjs) over legacy .eslintrc

ESLint v9+ defaults to flat config. `typescript-eslint` v8+ supports it natively. Using flat config avoids deprecated APIs and aligns with the ecosystem direction. All new projects should use flat config.

### Decision 2: typescript-eslint strict preset over recommended

PROJECT.md requires no `any` and explicit return types — these are not in the `recommended` preset. The `strict` preset includes `no-explicit-any`, `explicit-function-return-type`, and other rules that match our requirements exactly. The `stylistic` preset adds import ordering and naming conventions — included for consistency.

### Decision 3: prettier-plugin-tailwindcss included from day one

Tailwind class order is non-obvious and a common source of noisy diffs. Including the plugin at tooling setup means product repos that extend this config get class sorting automatically. Cost is negligible (one dev dependency).

### Decision 4: tsconfig.json targets ES2022 with bundler module resolution

Next.js 14 uses a bundler (webpack/turbopack) so `"moduleResolution": "bundler"` is the correct setting. `"target": "ES2022"` covers all modern browser features used in the stack (async/await, optional chaining, nullish coalescing) without polyfilling. Product repos extend this and override `"lib"` and `"jsx"` as needed.

### Decision 5: .npmrc with `only-allow=pnpm` and `engine-strict=true`

`only-allow pnpm` in the `preinstall` script is the idiomatic way to block npm/yarn. `engine-strict=true` in `.npmrc` ensures the Node version constraint in `package.json` `engines` field is enforced rather than just warned.

## Risks / Trade-offs

- `explicit-function-return-type` can feel verbose for simple arrow functions. Mitigation: the rule allows inferring return types on short inline callbacks — only top-level exported functions require explicit annotations.
- pnpm workspace setup adds minimal overhead for a spec-only repo. Mitigation: `pnpm-workspace.yaml` with no packages declared is effectively a no-op until products are added.

## Migration Plan

1. Run `pnpm install` after files are created
2. Run `pnpm lint` — expected to pass (no `.ts` files exist yet)
3. Run `pnpm typecheck` — expected to pass (no `.ts` files exist yet)
4. Commit lockfile and all config files together

No rollback needed — all changes are additive config files.
