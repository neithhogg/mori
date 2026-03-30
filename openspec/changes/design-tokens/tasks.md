## 1. Token File

- [ ] 1.1 Create `src/tokens/` directory
- [ ] 1.2 Create `src/tokens/globals.css` with `:root` block — colour palette tokens (brand, neutrals, surfaces, borders, semantic: 20 properties)
- [ ] 1.3 Add typography tokens to `:root` (font families, type scale xs–4xl, font weights: 13 properties)
- [ ] 1.4 Add spacing tokens to `:root` (`--space-1` through `--space-16`: 10 properties)
- [ ] 1.5 Add border radius tokens to `:root` (`--radius-sm` through `--radius-full`: 5 properties)
- [ ] 1.6 Add shadow tokens to `:root` (`--shadow-sm`, `--shadow-md`, `--shadow-lg`: 3 properties)
- [ ] 1.7 Add motion tokens to `:root` (`--duration-fast/base/slow`, `--ease-default/in/out`: 6 properties)

## 2. Integration

- [ ] 2.1 Update `src/index.ts` comment to note that `src/tokens/globals.css` exists and how to import it

## 3. Tests

- [ ] 3.1 Add `vitest` as a dev dependency in `package.json` and add `"test": "vitest run"` script
- [ ] 3.2 Create `src/tokens/__tests__/globals.test.ts` — test: CSS file exists and is non-empty
- [ ] 3.3 Add test: all 6 token groups are present (check one representative token per group)
- [ ] 3.4 Add test: every required token name from PROJECT.md is defined (assert 57 total: colour 20, typography 13, spacing 10, radius 5, shadow 3, motion 6)
- [ ] 3.5 Add test: no hardcoded hex values appear outside the `:root` block (regex scan)
- [ ] 3.6 Run `pnpm test` — all assertions pass with 0 failures

## 4. Verify

- [ ] 4.1 Run `pnpm typecheck` — exits 0 with no errors
- [ ] 4.2 Run `pnpm lint` — exits 0 with no errors

## 5. Docs

- [ ] 5.1 Add `JOURNAL.md` entry: design tokens implemented at `src/tokens/globals.css`; products import via `@import` in their `app/globals.css`
