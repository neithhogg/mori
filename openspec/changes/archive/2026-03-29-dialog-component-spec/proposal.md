## Why

The UI Copy Guidelines prescribe a specific confirm dialog pattern (`本当に削除しますか？`) and the Button spec states that destructive actions always require a confirmation dialog — but no Dialog component is specified anywhere in PROJECT.md. Developers bootstrapping ShiftMate or FaxBridge must invent this component from scratch, risking visual and behavioural inconsistency across products.

## What Changes

- A `### Dialog` section added to Component Specifications in `PROJECT.md`
- Covers overlay, panel, header, body, footer/action layout, and the confirm dialog variant
- Tailwind class strings using existing Mori tokens only (no new tokens needed)
- Behavioral rules: close on overlay click, ESC key, focus trap, mobile bottom-sheet variant

## Capabilities

### New Capabilities
- `dialog-base`: Mori-spec Tailwind classes for the Dialog overlay and panel
- `dialog-confirm`: Standardised confirm dialog structure with Japanese copy conventions

### Modified Capabilities

## Impact

- `PROJECT.md`: ~45 lines added to Component Specifications section
