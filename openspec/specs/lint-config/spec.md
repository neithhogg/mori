# lint-config Specification

## Purpose
TBD - created by archiving change project-tooling-setup. Update Purpose after archive.
## Requirements
### Requirement: ESLint flat config enforces TypeScript strict rules

The repository SHALL include `eslint.config.mjs` using ESLint's flat config format with `typescript-eslint` in strict mode. Rules MUST enforce the code quality conventions in PROJECT.md: no `any`, explicit return types, no unused variables.

#### Scenario: ESLint flags use of `any`

- **WHEN** a `.ts` file contains `: any` or `as any`
- **THEN** `pnpm lint` SHALL report an error for `@typescript-eslint/no-explicit-any`

#### Scenario: ESLint flags missing return types

- **WHEN** a `.ts` function lacks an explicit return type annotation
- **THEN** `pnpm lint` SHALL report an error for `@typescript-eslint/explicit-function-return-type`

#### Scenario: ESLint passes on compliant code

- **WHEN** all `.ts`/`.tsx` files have explicit return types and no `any`
- **THEN** `pnpm lint` SHALL exit zero

### Requirement: Prettier integration prevents lint/format conflicts

The ESLint config SHALL include `eslint-config-prettier` to disable all ESLint formatting rules that Prettier owns, preventing conflicts.

#### Scenario: Prettier-formatted file passes lint

- **WHEN** a file is formatted by Prettier and then linted by ESLint
- **THEN** ESLint SHALL NOT report any formatting-related errors

### Requirement: .prettierrc defines consistent formatting

The repository SHALL include a `.prettierrc` file enforcing single quotes, 100-character line width, and Tailwind CSS class sorting via `prettier-plugin-tailwindcss`.

#### Scenario: Prettier sorts Tailwind classes

- **WHEN** `pnpm format` runs on a file with unsorted Tailwind classes
- **THEN** Prettier SHALL reorder the classes to match Tailwind's canonical order

#### Scenario: Prettier enforces single quotes

- **WHEN** `pnpm format` runs on a file using double quotes for strings
- **THEN** Prettier SHALL convert them to single quotes

