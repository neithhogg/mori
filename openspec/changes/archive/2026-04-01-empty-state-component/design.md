## Context

The Mori component library has Button, Input, Card, Badge, Skeleton, Dialog, and Navigation, but no standard pattern for zero-data screens. Every time a ShiftMate or FaxBridge view renders an empty list (no shifts scheduled, no faxes received), the product team has to write one-off layouts. This produces inconsistent icon sizes, copy tone, and spacing across views. A shared `EmptyState` component fixes this by codifying the visual pattern once.

The existing `localisation-copy` spec already includes `empty.default` and `empty.search` keys; we extend it with `empty.description` to provide a generic fallback description.

## Goals / Non-Goals

**Goals:**
- Single `EmptyState` component covering all zero-data scenarios in both product repos
- Follows the existing Mori copy-paste component model (shadcn/ui pattern — products own the file)
- All design tokens referenced via CSS variables; no hardcoded values
- Locale-aware default copy via `useCopy()` (heading and description fallbacks)
- Optional Lucide icon slot with consistent sizing (48×48px, `--color-ink-tertiary`)
- Optional CTA using the existing `Button` component
- Vitest tests covering all prop combinations and locale fallbacks
- Showcase section demonstrating icon / no-icon and CTA / no-CTA variants

**Non-Goals:**
- Animated illustrations or Lottie files (MVP uses icons only)
- Context-specific copy built into the component (products pass their own heading/description)
- Full-page error states (separate concern; `EmptyState` is for zero-data, not error conditions)

## Decisions

### 1. Explicit `heading` prop vs. locale-derived default

**Decision:** `heading` is a required prop. Products always pass their own Japanese heading (e.g., `まだシフトがありません`). The component does NOT fall back to `empty.default` copy — that copy is used by product code directly when a generic message is acceptable.

**Rationale:** Empty-state messages are data-domain specific ("No shifts yet" vs. "No faxes received"). Baking a generic fallback into the component would encourage lazy, context-free copy. Requiring `heading` forces product teams to write meaningful messages at each call site.

**Alternative considered:** `heading` optional with `useCopy().empty.default` fallback. Rejected because it hides poor copy behind a reasonable-looking default; code review can't tell whether the heading was intentional.

---

### 2. Icon type — `LucideIcon` component vs. string name

**Decision:** Accept a Lucide icon component reference (`icon?: LucideIcon`) rather than a string icon name.

**Rationale:** Component references are tree-shakeable and type-safe. String names would require a runtime registry or dynamic import — unnecessary complexity for MVP.

**Alternative considered:** `iconName: string` with a Lucide dynamic import. Rejected: adds runtime complexity and breaks tree-shaking.

---

### 3. CTA — render `Button` internally vs. accept ReactNode

**Decision:** Accept a structured `action?: { label: string; onClick: () => void }` prop and render an internal `Button` with `variant="primary"` and `size="md"`.

**Rationale:** Constraining the CTA to a `Button` keeps the visual contract tight — no accidental link-style or ghost CTAs in empty states. Products that need exotic CTA behaviour can omit the prop and render their own button below the component.

**Alternative considered:** `action?: React.ReactNode` — maximum flexibility. Rejected for MVP because it opens the door to inconsistent styling.

---

### 4. `localisation-copy` extension — `empty.description`

**Decision:** Add `empty.description` to `MoriCopy` across all three locales, providing a generic "nothing here yet" message for contexts where a description is needed but no product-specific copy exists.

**Rationale:** The existing `empty.default` serves the heading role. A separate description key avoids overloading the same string in two UI positions with different typographic treatment.

## Risks / Trade-offs

- [Heading always required] → Product teams may pass empty strings to bypass the requirement. Mitigated by TypeScript `string` type (not `string | undefined`) which at least ensures intention, and code-review convention.
- [Fixed CTA variant] → A future design requirement may need a ghost or secondary CTA in empty states. Mitigation: the `action` prop struct can be extended with `variant` later without breaking the interface.
- [Single CTA only] → Some empty states may need two actions. Out of scope for MVP; product can render a second `Button` below the component.

## Migration Plan

No existing code to migrate — this is a net-new component. Products copy `src/components/ui/empty-state.tsx` into their own `components/ui/` directory per the standard Mori copy-paste model.

## Open Questions

None — all decisions are resolved above.
