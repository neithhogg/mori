# Design: github-actions-ci

## Context

The repository uses pnpm 9 and Node 22. Four quality scripts exist in `package.json`: `test` (Vitest), `lint` (ESLint), `typecheck` (tsc --noEmit), and `format:check` (Prettier). None of these run automatically in response to git events. This change wires them to GitHub Actions.

## Goals / Non-Goals

**Goals:**
- Run `pnpm test`, `pnpm lint`, `pnpm typecheck`, and `pnpm format:check` on every PR and push to `main`
- Use parallel jobs so feedback arrives quickly and failures are attributed to specific checks
- Cache the pnpm store to minimise install time across runs

**Non-Goals:**
- Deployment pipelines (handled in product repos, not the design system)
- Publishing the package to npm
- Matrix testing across multiple Node versions (Node 22 is the only supported version per `.nvmrc`)
- Automated branch protection configuration (GitHub API write access not available; configured manually)

## Decisions

**Decision 1: Four parallel jobs over a single sequential job**

Chosen: Four jobs — `test`, `lint`, `typecheck`, `format`.

Rationale: Parallel jobs run faster on GitHub-hosted runners than sequential steps in a single job. More importantly, each job produces a distinct named status check. Branch protection can then require individual checks (e.g., `test` is required, `format` could be advisory in future). A single job yields only one undifferentiated status check, which makes branch protection less granular and failure attribution less clear.

**Decision 2: `pnpm/action-setup@v4` + `actions/setup-node@v4` with `cache: 'pnpm'`**

Chosen: Run `pnpm/action-setup` before `actions/setup-node` so the node action can detect pnpm and cache the store by lockfile hash.

Rationale: This is the officially documented pnpm caching approach for GitHub Actions. It avoids manual cache key management and integrates with the lockfile automatically.

**Decision 3: `pnpm install --frozen-lockfile`**

Chosen: Use `--frozen-lockfile` for all install steps.

Rationale: Prevents lockfile drift. If `package.json` and `pnpm-lock.yaml` are out of sync, the install fails immediately with a clear error rather than silently regenerating the lockfile and producing an unreproducible build.

**Decision 4: Branch protection as a documented manual step**

Chosen: Document the required GitHub UI steps in `tasks.md`; do not attempt automated configuration.

Rationale: Branch protection rules cannot be stored as a file in the repository. They are stored in GitHub's repository settings and require admin access via the GitHub API. Since this repository does not have CI write access to its own settings, the setup is documented as a manual task.

## Risks / Trade-offs

- Four parallel jobs each install dependencies independently. On a cold cache run this adds ~20–30s per job. For a design system repository with low PR volume, this is acceptable.
- GitHub Actions minutes are consumed per job (4× vs 1 for a single job). For low-volume development this is negligible.
