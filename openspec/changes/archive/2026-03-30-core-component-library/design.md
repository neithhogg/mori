## Context

`src/` currently contains only the token CSS file and an empty barrel export. The design system is unusable by products until React components exist. All seven components are fully specified in PROJECT.md — this change transcribes those specs into TypeScript without inventing new behaviour.

## Goals / Non-Goals

**Goals:**
- Ship all seven core components as importable `.tsx` files
- Every component references only existing CSS variable tokens — no hardcoded values
- Components are copy-paste ready (shadcn/ui model): products own their copy
- Full accessibility: ARIA attributes, keyboard nav, focus management
- Vitest tests covering rendering, variant switching, and critical a11y attributes

**Non-Goals:**
- Storybook or visual documentation (separate change)
- npm package publishing / versioning (products copy files for now)
- Dark mode tokens (not in PROJECT.md scope)
- Animation beyond CSS transitions (Framer Motion is out of scope for MVP)
- FormField wrapper composing Label + Input + error into one component (products compose themselves)

## Decisions

### shadcn/ui copy-paste model, not a published package

**Decision:** Components live in `src/components/ui/` and products copy the files into their own repo rather than importing from a published `@mori/ui` package.

**Why:** Publishing a package requires versioning, changelogs, and semver discipline across two repos simultaneously. The copy-paste model (shadcn/ui's own approach) lets each product own its customisations and avoids version-lock friction at this stage. If both products diverge from each other, that's fine — they extend Mori, not constrain it.

**Alternative considered:** npm workspace monorepo with ShiftMate and FaxBridge as packages. Rejected — too much infrastructure overhead for a two-product MVP.

### `cn()` utility for class merging

**Decision:** Introduce a minimal `src/lib/cn.ts` using `clsx` + `tailwind-merge` for class composition in components.

**Why:** Tailwind class conflicts (e.g. `rounded-md` overridden by `rounded-lg`) silently produce wrong styles without `tailwind-merge`. Products will always want to pass `className` overrides. This is the standard shadcn/ui pattern and keeps component code clean.

### Dialog focus trap via native `<dialog>` element

**Decision:** Implement `Dialog` using the native HTML `<dialog>` element with `showModal()` / `close()` rather than a div-based custom implementation.

**Why:** Native `<dialog>` provides built-in focus trapping, ESC key handling, and top-layer stacking without any JavaScript for those behaviours. It has full browser support (Chrome 37+, Firefox 98+, Safari 15.4+). Avoids adding a focus-trap library dependency.

**Mobile bottom-sheet:** On `< 768px`, the dialog renders anchored to `bottom-0` with `rounded-t-[--radius-xl]` via a CSS media query class toggle. No JS needed — the native dialog overlays the full viewport and the panel CSS positions it.

### No `React.forwardRef` for MVP

**Decision:** Components do not expose `ref` via `forwardRef`.

**Why:** None of the component specs in PROJECT.md require programmatic focus control from outside the component. Adding `forwardRef` everywhere is speculative complexity. It can be added per-component if a product identifies a need.

### Lucide React for icons

**Decision:** Add `lucide-react` as a peer dependency.

**Why:** Lucide is already referenced in PROJECT.md as the icon library. Navigation and empty state components require icons. The library is tree-shakeable so unused icons have zero bundle cost.

## Risks / Trade-offs

- **Native `<dialog>` backdrop styling** — `::backdrop` is not styleable with Tailwind. The overlay dimming uses a `<div>` overlay inside the dialog instead. → Mitigation: The div overlay pattern is standard and tested.
- **No published package** — When Mori tokens change, products must manually update their copied files. → Mitigation: Acceptable at MVP stage. A package can be introduced in Phase 2 when the API stabilises.
- **`tailwind-merge` + `clsx` bundle cost** — Adds ~3kB gzipped to each product. → Mitigation: Both libraries are standard in the shadcn/ui ecosystem; cost is known and accepted.
