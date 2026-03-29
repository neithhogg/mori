# node-version-config Specification

## Purpose
TBD - created by archiving change project-tooling-setup. Update Purpose after archive.
## Requirements
### Requirement: Repository pins Node.js LTS version via .nvmrc

The repository SHALL include a `.nvmrc` file at the root that pins the Node.js version to the latest LTS release, ensuring all contributors and CI environments use the same runtime.

#### Scenario: Developer switches to correct Node version

- **WHEN** a developer runs `nvm use` in the repository root
- **THEN** nvm SHALL switch to the Node version specified in `.nvmrc`
- **AND** the version SHALL be a current LTS release (v22.x)

#### Scenario: .nvmrc contains a valid version string

- **WHEN** `.nvmrc` is read
- **THEN** it SHALL contain a single line with a valid Node version specifier (e.g., `22` or `lts/jod`)

