## Why

The design tokens defined in PROJECT.md exist only as documentation — no CSS file ships them as importable custom properties. Before ShiftMate or FaxBridge can reference a single Mori token (`--color-brand`, `--space-4`, etc.), the tokens must exist as a real artifact that products can import. This is the foundational layer everything else builds on.

## What Changes

- `src/tokens/globals.css` created — all 6 token groups from PROJECT.md as CSS custom properties on `:root`
  - Colour palette (brand, neutrals, surfaces, borders, semantic)
  - Typography scale (font families, type scale, font weights)
  - Spacing scale (8px base grid, `--space-1` through `--space-16`)
  - Border radius (`--radius-sm` through `--radius-full`)
  - Shadows (`--shadow-sm`, `--shadow-md`, `--shadow-lg`)
  - Motion (`--duration-*`, `--ease-*`)
- `src/tokens/__tests__/globals.test.ts` created — Vitest tests verifying token presence, naming, and no hardcoded values
- `src/index.ts` updated — comment updated to reflect token file exists

No new tokens are introduced. Values are taken verbatim from PROJECT.md. No existing files are modified beyond `src/index.ts`.

**Platforms:** Web only (Phase 1). iOS token mapping is Phase 2.

**Japanese summary:** デザイントークンをCSSファイルとして実装（ShiftMate・FaxBridgeの共有基盤）

## Capabilities

### New Capabilities
- `design-tokens`: All Mori CSS custom property tokens (`src/tokens/globals.css`) covering colour, typography, spacing, radius, shadows, and motion — the complete token set products must import before using any Mori component

### Modified Capabilities

## Impact

- New file: `src/tokens/globals.css`
- New file: `src/tokens/__tests__/globals.test.ts`
- Modified: `src/index.ts` (comment only)
- No breaking changes — additive only
- Rollback: delete `src/tokens/` directory
