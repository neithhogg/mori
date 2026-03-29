# package-manager-config Specification

## Purpose
TBD - created by archiving change project-tooling-setup. Update Purpose after archive.
## Requirements
### Requirement: pnpm is the sole package manager for the repository

The repository SHALL use pnpm as the package manager. npm and yarn MUST be blocked via `.npmrc` and the `engines` field in `package.json`.

#### Scenario: pnpm install succeeds at repo root

- **WHEN** a developer runs `pnpm install`
- **THEN** dependencies SHALL be installed into `node_modules`
- **AND** a `pnpm-lock.yaml` SHALL be created or updated

#### Scenario: npm install is blocked

- **WHEN** a developer runs `npm install`
- **THEN** npm SHALL exit with an error due to `engine-strict=true` and engines mismatch or `only-allow pnpm` preinstall script

### Requirement: package.json defines project scripts for lint, format, and typecheck

The `package.json` SHALL include scripts that developers and CI can run uniformly.

#### Scenario: Lint script runs ESLint

- **WHEN** `pnpm lint` is executed
- **THEN** ESLint SHALL run against all `.ts`, `.tsx`, `.mjs` files in the repo
- **AND** exit non-zero if any lint errors are found

#### Scenario: Format script runs Prettier

- **WHEN** `pnpm format` is executed
- **THEN** Prettier SHALL format all supported files in-place

#### Scenario: Format check script exits non-zero on unformatted files

- **WHEN** `pnpm format:check` is executed
- **THEN** Prettier SHALL check files without writing
- **AND** exit non-zero if any files would be reformatted

#### Scenario: Typecheck script runs tsc without emitting

- **WHEN** `pnpm typecheck` is executed
- **THEN** `tsc --noEmit` SHALL run and exit non-zero if any type errors exist

### Requirement: pnpm-workspace.yaml marks the repo as a pnpm workspace root

The repository SHALL include `pnpm-workspace.yaml` so that product repos can eventually be added as workspace packages.

#### Scenario: Workspace file exists at root

- **WHEN** `pnpm-workspace.yaml` is read
- **THEN** it SHALL be valid YAML and declare a `packages` array

