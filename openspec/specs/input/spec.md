## ADDED Requirements

### Requirement: Input renders base styles
The `Input` component SHALL render a full-width `<input>` element with the Mori sunken-background style. All class strings MUST reference CSS variable tokens — no hardcoded values.

#### Scenario: Default render
- **WHEN** `<Input />` is rendered with no additional props
- **THEN** the element has classes including `w-full h-10 px-3 bg-[--color-surface-sunken] border border-[--color-border] rounded-[--radius-md]`

### Requirement: Input shows error state
The `Input` component SHALL accept an `error` string prop. When provided, the border and focus ring MUST switch to `--color-error` and the error message MUST be rendered below the input in `--color-error` at `--text-xs`.

#### Scenario: Error present
- **WHEN** `<Input error="この項目は必須です" />` is rendered
- **THEN** the input element has `border-[--color-error] focus:border-[--color-error] focus:ring-[--color-error]` classes and a `<p>` below it contains `この項目は必須です`

#### Scenario: No error
- **WHEN** `error` prop is undefined or empty string
- **THEN** the input uses default border classes and no error `<p>` is rendered

### Requirement: Input shows helper text
The `Input` component SHALL accept a `helperText` string prop. When provided, helper text MUST be rendered below the input (and below any error message) in `--color-ink-tertiary` at `--text-xs`.

#### Scenario: Helper text present
- **WHEN** `<Input helperText="半角英数字で入力してください" />` is rendered
- **THEN** a `<p>` below the input contains `半角英数字で入力してください` with classes referencing `--color-ink-tertiary` and `--text-xs`

### Requirement: Input forwards label via htmlFor
The `Input` component SHALL accept a `label` string prop and render a `<label>` element above the input. The label MUST be linked to the input via `htmlFor` / `id`. Label MUST use `--text-sm`, `--font-medium`, `--color-ink-secondary`.

#### Scenario: Label rendered
- **WHEN** `<Input label="メールアドレス" id="email" />` is rendered
- **THEN** a `<label htmlFor="email">メールアドレス</label>` appears above the input

### Requirement: Input forwards native props
The `Input` component SHALL forward all standard `<input>` HTML attributes (type, placeholder, disabled, value, onChange, etc.) to the underlying `<input>` element.

#### Scenario: Placeholder forwarded
- **WHEN** `<Input placeholder="例: tanaka@example.com" />` is rendered
- **THEN** the `<input>` element has `placeholder="例: tanaka@example.com"`
