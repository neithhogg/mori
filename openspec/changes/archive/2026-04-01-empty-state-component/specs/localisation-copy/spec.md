## ADDED Requirements

### Requirement: MoriCopy catalogue includes a generic empty-state description key
`src/lib/locale/copy.ts` SHALL add the key `empty.description` to the `CopyKeys` interface and provide translations for all three locales. This key provides a generic description for zero-data screens when no product-specific description is available.

| Key | `ja` | `en` | `zh-Hans` |
|-----|------|------|-----------|
| `empty.description` | `まだ項目が登録されていません。` | `No items have been added yet.` | `还没有添加任何项目。` |

The `zh-Hans` value SHALL be accompanied by a `// TODO: zh-Hans review` comment per the existing convention.

#### Scenario: New key present for all locales
- **WHEN** the `MoriCopy` object is type-checked after the addition
- **THEN** TypeScript SHALL confirm that `ja`, `en`, and `zh-Hans` each have an `empty.description` property with a non-empty string value

#### Scenario: Missing key on CopyKeys is a compile error
- **WHEN** code references `copy[locale].empty.description` on a `CopyKeys` type that does not include the key
- **THEN** TypeScript SHALL emit a property-not-found error, confirming the type is updated
