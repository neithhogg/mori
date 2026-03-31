## ADDED Requirements

### Requirement: Per-locale font stack tokens are defined
`src/tokens/globals.css` SHALL define locale-specific font stack overrides scoped to `[data-locale]` attributes on `<html>`. These override the default CJK-optimised stack when the locale is `en`.

Font stack rules:

| Locale selector | `--font-body` | `--font-heading` |
|-----------------|---------------|-----------------|
| `:root` (default, CJK) | `'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Noto Sans JP', 'Yu Gothic', sans-serif` | same as body |
| `[data-locale="en"]` | `'Inter', 'Helvetica Neue', Arial, sans-serif` | `'Inter', 'Helvetica Neue', Arial, sans-serif` |
| `[data-locale="zh-Hans"]` | `'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif` | same as body |

The `[data-locale="ja"]` selector SHALL NOT override `:root` (Japanese uses the default).

#### Scenario: English font stack applied
- **WHEN** `<html data-locale="en">` is rendered
- **THEN** `--font-body` SHALL resolve to the Latin stack starting with `'Inter'`

#### Scenario: Chinese font stack applied
- **WHEN** `<html data-locale="zh-Hans">` is rendered
- **THEN** `--font-body` SHALL resolve to the CJK stack starting with `'PingFang SC'`

#### Scenario: Japanese uses default
- **WHEN** `<html data-locale="ja">` or `<html>` (no attribute) is rendered
- **THEN** `--font-body` SHALL resolve to the default Hiragino/Noto stack from `:root`

---

### Requirement: Per-locale line-height tokens are defined
`globals.css` SHALL define `--leading-body` and `--leading-heading` overrides per locale. CJK scripts require looser line-height than Latin for readability.

Line-height rules:

| Locale selector | `--leading-body` | `--leading-heading` |
|-----------------|-----------------|---------------------|
| `:root` (CJK default) | `1.8` | `1.4` |
| `[data-locale="en"]` | `1.6` | `1.25` |
| `[data-locale="zh-Hans"]` | `1.8` | `1.4` |

All components using body text MUST reference `var(--leading-body)` rather than a hardcoded `line-height` value.

#### Scenario: English line-height is tighter
- **WHEN** `<html data-locale="en">` is rendered
- **THEN** `--leading-body` SHALL resolve to `1.6`

#### Scenario: CJK line-height is looser
- **WHEN** `<html data-locale="ja">` or `<html data-locale="zh-Hans">` is rendered
- **THEN** `--leading-body` SHALL resolve to `1.8`

---

### Requirement: All components reference line-height via token
Every Mori component that sets `line-height` on body text SHALL use `var(--leading-body)`. Components that set `line-height` on heading text SHALL use `var(--leading-heading)`. Hardcoded numeric `line-height` values on text elements SHALL NOT appear in component source.

#### Scenario: No hardcoded line-height in components
- **WHEN** component source files under `src/components/` are audited
- **THEN** no element with visible text SHALL have a hardcoded `line-height` CSS property — each SHALL reference `--leading-body` or `--leading-heading`

---

### Requirement: No web fonts are loaded by the design system
The Mori DS token file SHALL NOT include `@font-face` rules or external font `@import` statements. Font loading is the responsibility of each product repo (e.g. via Next.js `next/font`). The design system only defines which font family names to reference in the stack.

#### Scenario: No @font-face in globals.css
- **WHEN** `src/tokens/globals.css` is parsed
- **THEN** it SHALL contain zero `@font-face` blocks and zero `@import` statements loading external font URLs
