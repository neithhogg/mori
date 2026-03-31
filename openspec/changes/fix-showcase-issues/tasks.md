## 1. Install Dependencies

- [ ] 1.1 Run `pnpm install` to restore `node_modules` (prerequisite for all checks below)
- [ ] 1.2 Confirm `node_modules` exists and `pnpm typecheck` exits 0 with no errors

## 2. Fix Lint Violation

- [ ] 2.1 In `showcase/src/sections/BadgeSection.tsx` line 7, change `Array<{ variant: BadgeVariant; label: string; desc: string }>` to `{ variant: BadgeVariant; label: string; desc: string }[]`
- [ ] 2.2 Run `pnpm lint` and confirm it exits 0 with no errors

## 3. Verify Full Health

- [ ] 3.1 Run `pnpm typecheck` — must exit 0
- [ ] 3.2 Run `pnpm lint` — must exit 0
- [ ] 3.3 Run `pnpm test` — all tests must pass
- [ ] 3.4 Run `pnpm dev` (or `pnpm build:showcase`) and confirm the showcase renders without console errors

## 4. Commit and Push

- [ ] 4.1 Commit the fix to `showcase/src/sections/BadgeSection.tsx` with a clear message (e.g. `fix(showcase): use T[] array syntax in BadgeSection`)
- [ ] 4.2 Push to branch `claude/run-opsx-propose-k66iV`
