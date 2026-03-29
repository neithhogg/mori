## Context

PROJECT.md specifies all other interactive components (Button, Input, Card, Badge, Navigation) but omits Dialog. The Button spec references "confirmation dialogs" for destructive actions without defining one. This design documents the approach for adding the Dialog spec to PROJECT.md.

## Goals / Non-Goals

**Goals:**
- Define Tailwind class strings for Dialog using only existing Mori tokens
- Cover the full component anatomy: overlay, panel, header, body, footer
- Define the confirm dialog variant (the primary use case across both products)
- Follow the same format as every other component spec in PROJECT.md

**Non-Goals:**
- Implementing the component in any product repo (that happens in ShiftMate/FaxBridge)
- Defining a Sheet or Drawer as separate components (mobile bottom-sheet is a Dialog variant)
- Animation beyond Tailwind transitions (no Framer Motion — per MVP constraints)

## Decisions

### Decision 1: shadcn/ui Dialog as the base primitive

shadcn/ui ships a Dialog component (built on Radix UI) that handles focus trapping, ESC, and ARIA out of the box. The spec documents the Mori-customised Tailwind classes on top of that primitive — consistent with how Button, Input, and Card are all specified as Tailwind overlays on shadcn/ui.

### Decision 2: Mobile bottom-sheet is a variant, not a separate component

Rather than specifying a separate `Sheet` component, the Dialog spec includes a mobile variant that switches to a bottom-sheet layout at < 768px. This reduces the component surface area and matches the "simple" principle — one component, one mental model.

### Decision 3: No new design tokens needed

All visual properties (radius, shadow, background, border) map directly to existing tokens. `--radius-xl` was explicitly noted as "modals, sheets" in the token spec — this change validates that intent.

## Spec Format

The Dialog section in PROJECT.md will follow the identical pattern to all other components:

```
### Dialog

type DialogVariant = 'default' | 'confirm'

// Overlay
overlay: '...'

// Panel
base:   '...'
header: '...'
body:   '...'
footer: '...'

// Confirm variant footer
confirm-footer: '...'
```

Followed by **Rules:** bullet list covering behaviour (close triggers, focus trap, mobile sheet, button order).
