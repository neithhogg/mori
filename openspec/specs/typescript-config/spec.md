# typescript-config Specification

## Purpose
TBD - created by archiving change project-tooling-setup. Update Purpose after archive.
## Requirements
### Requirement: tsconfig.json enables TypeScript strict mode

The repository SHALL include a `tsconfig.json` at the root that enables strict mode with no `any` types, matching the code quality rules in PROJECT.md. This config SHALL serve as the base that product repos extend.

#### Scenario: tsc --noEmit passes on strict-compliant code

- **WHEN** a `.ts` file with explicit return types and no `any` is typechecked
- **THEN** `tsc --noEmit` SHALL exit zero

#### Scenario: tsc --noEmit fails on implicit any

- **WHEN** a `.ts` file uses an implicit `any` (e.g., function parameter without a type annotation)
- **THEN** `tsc --noEmit` SHALL exit non-zero with a type error

### Requirement: tsconfig.json is extendable by product repos

The root `tsconfig.json` SHALL be structured so Next.js product repos can extend it via `"extends": "../../mori/tsconfig.json"` (or equivalent relative path).

#### Scenario: Product repo tsconfig extends mori base

- **WHEN** a product repo's `tsconfig.json` sets `"extends"` to the mori base config
- **THEN** all strict settings SHALL be inherited
- **AND** the product repo SHALL be able to override individual compiler options

