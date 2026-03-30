## ADDED Requirements

### Requirement: Button renders with correct variant classes
The `Button` component SHALL accept a `variant` prop (`primary | secondary | ghost | destructive`) and apply the corresponding Tailwind classes from the Mori spec. All class strings MUST reference CSS variable tokens — no hardcoded hex or px values.

#### Scenario: Primary variant
- **WHEN** `<Button variant="primary">` is rendered
- **THEN** the element has classes `bg-[--color-brand] text-white hover:bg-[--color-brand-dark]`

#### Scenario: Destructive variant
- **WHEN** `<Button variant="destructive">` is rendered
- **THEN** the element has classes `bg-[--color-error] text-white hover:opacity-90`

#### Scenario: Default variant
- **WHEN** no `variant` prop is passed
- **THEN** the button renders as `primary` variant

### Requirement: Button renders with correct size classes
The `Button` component SHALL accept a `size` prop (`sm | md | lg`) and apply height, padding, and text-size classes accordingly.

#### Scenario: Medium size (default)
- **WHEN** no `size` prop is passed
- **THEN** the button has classes `h-10 px-4 text-sm`

#### Scenario: Large size
- **WHEN** `<Button size="lg">` is rendered
- **THEN** the button has classes `h-12 px-6 text-base`

### Requirement: Button shows loading state
The `Button` component SHALL accept an `isLoading` boolean prop. When `true`, it MUST replace the label with a spinner icon and the text `処理中...`, and the button MUST be disabled.

#### Scenario: Loading active
- **WHEN** `isLoading={true}` is passed
- **THEN** the button is `disabled`, shows `処理中...` text, and renders a spinner icon

#### Scenario: Loading inactive
- **WHEN** `isLoading={false}` is passed
- **THEN** the button renders its children normally and is not disabled

### Requirement: Button disabled state
The `Button` component SHALL support the native `disabled` attribute. A disabled button MUST have `opacity-50` and `cursor-not-allowed` classes and MUST NOT trigger click handlers.

#### Scenario: Disabled button
- **WHEN** `disabled={true}` is passed
- **THEN** the button element has `disabled` attribute and applies `disabled:opacity-50 disabled:cursor-not-allowed` classes

### Requirement: Icon-only button requires aria-label
Icon-only `Button` elements (no visible text children) MUST have an `aria-label` prop. The component SHALL pass through `aria-label` to the underlying `<button>` element.

#### Scenario: aria-label forwarded
- **WHEN** `<Button aria-label="削除する">` is rendered with an icon child and no text
- **THEN** the rendered `<button>` element has `aria-label="削除する"`

### Requirement: Button accepts className override
The `Button` component SHALL merge any `className` prop with its base classes using `cn()` so consumers can extend styles without breaking token-based defaults.

#### Scenario: Extra class applied
- **WHEN** `<Button className="w-full">` is rendered
- **THEN** the rendered element has both the base button classes and `w-full`
