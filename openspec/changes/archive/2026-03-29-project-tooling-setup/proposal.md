## Why

The Mori DS repo has no Node.js tooling — no package manager config, no pinned Node version, no linter. Before any product repo can use this spec as a reference or template, the repo itself needs a consistent, reproducible environment that enforces the same code quality rules it prescribes.

## What Changes

- `.nvmrc` added — pins Node.js to latest LTS (v22)
- `package.json` added — pnpm workspace, scripts for lint/typecheck/format
- `pnpm-workspace.yaml` added — marks repo root as pnpm workspace
- `.npmrc` added — `engine-strict=true`, pnpm settings
- `tsconfig.json` added — TypeScript strict config matching PROJECT.md rules
- ESLint flat config added (`eslint.config.mjs`) — TypeScript strict rules + Prettier integration
- `.prettierrc` added — consistent formatting (single quotes, 100-char line width, Tailwind plugin)
- All lint/format/typecheck runnable via `pnpm lint`, `pnpm format`, `pnpm typecheck`

## Capabilities

### New Capabilities
- `node-version-config`: `.nvmrc` pinning Node LTS so all contributors and CI use the same runtime
- `package-manager-config`: pnpm workspace root with scripts, engines field, and `.npmrc`
- `typescript-config`: `tsconfig.json` with strict mode matching PROJECT.md code quality rules
- `lint-config`: ESLint flat config (typescript-eslint + prettier) enforcing PROJECT.md conventions

### Modified Capabilities

## Impact

- New files at repo root: `.nvmrc`, `package.json`, `pnpm-workspace.yaml`, `.npmrc`, `tsconfig.json`, `eslint.config.mjs`, `.prettierrc`
- `pnpm install` required after implementation
- No existing files modified
