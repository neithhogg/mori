# Proposal: github-actions-ci

## Why

The Mori Design System repository has all quality tooling in place — Vitest for tests, ESLint for linting, TypeScript strict mode for type safety, and Prettier for formatting — but no automated enforcement. There is no mechanism preventing a pull request from merging with failing tests, lint errors, type errors, or formatting violations. As the design system grows and multiple products (ShiftMate, FaxBridge) depend on it, undetected regressions become costly.

GitHub Actions CI provides an automated quality gate that runs on every PR and every push to `main`, giving contributors fast, clear feedback before changes land.

## What Changes

| File | Change |
|------|--------|
| `.github/workflows/ci.yml` | New — GitHub Actions CI workflow |

## Capabilities

### New Capabilities

- `ci-on-pr`: Automatically run all quality checks (test, lint, typecheck, format) on every pull request open, synchronise, and reopen
- `ci-on-push`: Run the same quality checks on every push to `main`
- `branch-protection`: GitHub branch protection rules that require all four CI status checks to pass before a PR can merge (configured manually via GitHub repository settings)

### Modified Capabilities

_None_

## Impact

- +1 file created: `.github/workflows/ci.yml`
- Platform: Web
- Product scope: Mori Design System repository (neithhogg/mori)
- Rollback: Delete `.github/workflows/ci.yml` and remove branch protection rules in GitHub settings
- 要約: PRとmainブランチへのプッシュ時に自動でテスト・Lint・型チェック・フォーマットチェックを実行するCIワークフローを追加する。
