# Tasks: github-actions-ci

## 1. Workflow File

- [ ] 1.1 Create `.github/` and `.github/workflows/` directories
- [ ] 1.2 Create `.github/workflows/ci.yml` with trigger on `pull_request` (opened, synchronize, reopened) and `push` to `main`
- [ ] 1.3 Add `test` job: checkout → setup pnpm 9 → setup Node 22 with pnpm cache → `pnpm install --frozen-lockfile` → `pnpm test`
- [ ] 1.4 Add `lint` job: same steps → `pnpm lint`
- [ ] 1.5 Add `typecheck` job: same steps → `pnpm typecheck`
- [ ] 1.6 Add `format` job: same steps → `pnpm format:check`

## 2. Branch Protection (Manual — GitHub UI)

These steps must be completed manually by a repository admin after the workflow file is merged and at least one CI run has completed (so the check names are registered with GitHub).

- [ ] 2.1 Go to the repository on GitHub → **Settings** → **Branches**
- [ ] 2.2 Click **Add branch protection rule**
- [ ] 2.3 Set **Branch name pattern** to `main`
- [ ] 2.4 Enable **Require a pull request before merging**
- [ ] 2.5 Enable **Require status checks to pass before merging**
- [ ] 2.6 Search for and add required status checks: `Test`, `Lint`, `Typecheck`, `Format`
- [ ] 2.7 Enable **Require branches to be up to date before merging**
- [ ] 2.8 Click **Save changes**

## 3. Verification

- [ ] 3.1 Push the branch containing `.github/workflows/ci.yml` and open a pull request — confirm four CI checks appear in the PR checks section
- [ ] 3.2 Confirm all four checks pass on a clean branch
- [ ] 3.3 Push a branch with a deliberate test failure — confirm the `Test` check fails and the PR cannot merge (after branch protection is configured)
- [ ] 3.4 Confirm the `Lint`, `Typecheck`, and `Format` checks pass independently of the failing `Test` check
