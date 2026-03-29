## 1. Node Version

- [x] 1.1 Create `.nvmrc` with `22` (Node.js LTS)

## 2. Package Manager

- [x] 2.1 Create `package.json` with name, version, engines (node >=22, pnpm >=9), scripts (lint, format, format:check, typecheck), and preinstall only-allow pnpm
- [x] 2.2 Create `.npmrc` with `engine-strict=true` and `shamefully-hoist=false`
- [x] 2.3 Create `pnpm-workspace.yaml` with empty packages array

## 3. TypeScript

- [x] 3.1 Add `typescript` as devDependency in package.json
- [x] 3.2 Create `tsconfig.json` — strict mode, ES2022 target, bundler module resolution, no emit

## 4. Lint & Format

- [x] 4.1 Add ESLint and typescript-eslint devDependencies (eslint, typescript-eslint, eslint-config-prettier)
- [x] 4.2 Add Prettier devDependencies (prettier, prettier-plugin-tailwindcss)
- [x] 4.3 Create `eslint.config.mjs` — flat config with typescript-eslint strict + stylistic presets and prettier integration
- [x] 4.4 Create `.prettierrc` — singleQuote, printWidth 100, tailwindcss plugin, trailingComma es5

## 5. Install & Verify

- [x] 5.1 Run `pnpm install` to generate lockfile
- [x] 5.2 Run `pnpm lint` — confirm exits zero
- [x] 5.3 Run `pnpm typecheck` — confirm exits zero
