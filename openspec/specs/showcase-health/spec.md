### Requirement: Showcase passes lint with zero errors
The showcase source files SHALL conform to all ESLint rules enforced by the project's `eslint.config.mjs`. Running `pnpm lint` MUST exit with code 0.

#### Scenario: Array type syntax is consistent
- **WHEN** `pnpm lint` is run on the repository
- **THEN** no `@typescript-eslint/array-type` violations are reported in any showcase file

### Requirement: Showcase passes typecheck with zero errors
All TypeScript files under `showcase/` SHALL resolve their imports correctly. Running `pnpm typecheck` MUST exit with code 0.

#### Scenario: React types are available
- **WHEN** `pnpm typecheck` is run after `pnpm install`
- **THEN** no TS2307 or TS7026 errors are reported for showcase source files

### Requirement: Tests pass after showcase fixes
Running `pnpm test` MUST exit with code 0 and no test suite SHALL regress as a result of changes in this fix.

#### Scenario: Existing test suite is unaffected
- **WHEN** `pnpm test` is run after the lint fix is applied
- **THEN** all previously passing tests continue to pass
