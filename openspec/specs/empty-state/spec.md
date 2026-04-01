# empty-state Specification

## Purpose
Define the requirements for the Mori `EmptyState` component — a centred zero-data layout used across all products when a list or view has no content to display.

## Requirements

### Requirement: EmptyState component renders a centred zero-data layout
`src/components/ui/empty-state.tsx` SHALL export an `EmptyState` React functional component and an `EmptyStateProps` TypeScript interface. The component SHALL render a vertically and horizontally centred layout containing an optional icon, a required heading, an optional description, and an optional CTA button. All colour and spacing values SHALL reference CSS custom property tokens — no hardcoded hex or px values.

#### Scenario: Minimal render with heading only
- **WHEN** `<EmptyState heading="まだシフトがありません" />` is rendered
- **THEN** the heading text SHALL be visible in the DOM
- **THEN** no icon, description, or button SHALL be rendered

#### Scenario: Full render with all props
- **WHEN** `<EmptyState heading="まだシフトがありません" description="シフトを追加してください" icon={CalendarIcon} action={{ label: "追加する", onClick: fn }} />` is rendered
- **THEN** an SVG icon, the heading, the description, and a button labeled "追加する" SHALL all be present in the DOM

---

### Requirement: Icon slot accepts a Lucide icon component
The `icon` prop SHALL accept a `LucideIcon` component reference (i.e., `React.ComponentType<React.SVGProps<SVGSVGElement>>`). When provided, the icon SHALL render at 48×48px using `--color-ink-tertiary`. When omitted, no icon element SHALL be rendered.

#### Scenario: Icon renders with correct dimensions
- **WHEN** `<EmptyState heading="x" icon={InboxIcon} />` is rendered
- **THEN** the rendered SVG element SHALL have `width="48"` and `height="48"` attributes (or equivalent CSS)

#### Scenario: No icon when prop omitted
- **WHEN** `<EmptyState heading="x" />` is rendered
- **THEN** no `<svg>` element SHALL appear in the output

---

### Requirement: Heading is required and rendered as a prominent text element
The `heading` prop SHALL be a required `string`. It SHALL render as a visible text node styled with `--color-ink` at the `--text-lg` size and `--font-weight-semibold` weight. Line height SHALL use `--leading-snug`.

#### Scenario: Heading text appears in DOM
- **WHEN** `<EmptyState heading="テスト見出し" />` is rendered
- **THEN** `getByText("テスト見出し")` SHALL resolve successfully

---

### Requirement: Description is optional and rendered as secondary text
The `description` prop SHALL be an optional `string`. When provided, it SHALL render below the heading with `--color-ink-secondary` and `--text-sm` size. When omitted, no description element SHALL appear.

#### Scenario: Description renders when provided
- **WHEN** `<EmptyState heading="x" description="説明文" />` is rendered
- **THEN** `getByText("説明文")` SHALL resolve successfully

#### Scenario: Description absent when omitted
- **WHEN** `<EmptyState heading="x" />` is rendered
- **THEN** no element with a description role or description-class SHALL appear

---

### Requirement: CTA renders as a primary Button when action prop is provided
The `action` prop SHALL be an optional object `{ label: string; onClick: () => void }`. When provided, the component SHALL render a `Button` with `variant="primary"` and `size="md"` labelled with `action.label`. Clicking the button SHALL invoke `action.onClick`.

#### Scenario: CTA button is clickable
- **WHEN** `<EmptyState heading="x" action={{ label: "追加する", onClick: mockFn }} />` is rendered and the button is clicked
- **THEN** `mockFn` SHALL have been called exactly once

#### Scenario: No button when action omitted
- **WHEN** `<EmptyState heading="x" />` is rendered
- **THEN** no `<button>` element SHALL appear in the output

---

### Requirement: Component is exported from the public API
`src/index.ts` SHALL export both `EmptyState` and `EmptyStateProps`.

#### Scenario: Named exports are available
- **WHEN** a consumer imports `{ EmptyState, EmptyStateProps }` from the package root
- **THEN** TypeScript SHALL resolve both without error

---

### Requirement: EmptyState is demonstrated in the component showcase
A new `EmptyStateSection` SHALL be added to the showcase (`showcase/src/sections/empty-state-section.tsx`) and rendered in `showcase/src/App.tsx`. It SHALL demonstrate at minimum: (1) heading only, (2) heading + icon + description + CTA, (3) heading + icon, no CTA.

#### Scenario: Showcase section renders all variants
- **WHEN** the showcase is loaded in a browser
- **THEN** three distinct EmptyState examples SHALL be visible on screen
