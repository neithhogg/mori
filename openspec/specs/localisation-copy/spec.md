# localisation-copy Specification

## Purpose
Define the requirements for the Mori copy catalogue — the typed `MoriCopy` object, `useCopy()` hook, Simplified Chinese review process, and universal confirmation dialog button-order convention.

## Requirements

### Requirement: MoriCopy catalogue covers all standard UI patterns
`src/lib/locale/copy.ts` SHALL export a `MoriCopy` object with the shape `Record<Locale, CopyKeys>`. The `CopyKeys` type SHALL be a TypeScript interface covering every standard UI pattern listed below. Accessing a key that does not exist on `CopyKeys` SHALL be a compile error.

Standard UI patterns that MUST be covered:

| Key | `ja` | `en` | `zh-Hans` |
|-----|------|------|-----------|
| `action.save` | `保存する` | `Save` | `保存` |
| `action.delete` | `削除する` | `Delete` | `删除` |
| `action.cancel` | `キャンセル` | `Cancel` | `取消` |
| `action.add` | `追加する` | `Add` | `添加` |
| `action.edit` | `編集する` | `Edit` | `编辑` |
| `action.confirm` | `確認する` | `Confirm` | `确认` |
| `action.close` | `閉じる` | `Close` | `关闭` |
| `action.back` | `戻る` | `Back` | `返回` |
| `action.next` | `次へ` | `Next` | `下一步` |
| `action.submit` | `送信する` | `Submit` | `提交` |
| `status.loading` | `処理中...` | `Loading...` | `处理中...` |
| `status.saving` | `保存中...` | `Saving...` | `保存中...` |
| `status.success` | `✓ 保存しました` | `✓ Saved` | `✓ 已保存` |
| `status.error` | `エラーが発生しました。もう一度お試しください。` | `Something went wrong. Please try again.` | `发生错误，请重试。` |
| `empty.default` | `まだデータがありません` | `No data yet` | `暂无数据` |
| `empty.search` | `検索結果がありません` | `No results found` | `未找到结果` |
| `confirm.destructiveHint` | `この操作は取り消せません。` | `This action cannot be undone.` | `此操作无法撤消。` |
| `dialog.close` | `閉じる` | `Close` | `关闭` |
| `pagination.previous` | `前へ` | `Previous` | `上一页` |
| `pagination.next` | `次へ` | `Next` | `下一页` |

#### Scenario: All keys present for all locales
- **WHEN** the `MoriCopy` object is type-checked
- **THEN** TypeScript SHALL confirm that every `Locale` key maps to a complete `CopyKeys` object with no missing properties

#### Scenario: Missing key is a compile error
- **WHEN** code accesses `copy[locale].nonExistentKey`
- **THEN** TypeScript SHALL emit a property-not-found error

---

### Requirement: Copy is consumed via the `useCopy()` hook
`src/lib/locale/hooks.ts` SHALL export a `useCopy(): CopyKeys` hook. It MUST call `useLocale()` internally and return `MoriCopy[locale]`. Components MUST use this hook to access copy strings rather than importing `MoriCopy` directly.

#### Scenario: Hook returns locale-appropriate copy
- **WHEN** `useCopy()` is called inside a `LocaleProvider` with locale `'en'`
- **THEN** `copy.action.save` SHALL equal `'Save'`

#### Scenario: Hook returns Japanese copy by default
- **WHEN** `useCopy()` is called inside a `LocaleProvider` with locale `'ja'`
- **THEN** `copy.status.loading` SHALL equal `'処理中...'`

---

### Requirement: Simplified Chinese copy is marked for human review
All `zh-Hans` values in `MoriCopy` SHALL be accompanied by a `// TODO: zh-Hans review` comment in source until a native Simplified Chinese speaker has reviewed and approved the copy. The build SHALL NOT fail due to these comments.

#### Scenario: Review flag present on zh-Hans entries
- **WHEN** `src/lib/locale/copy.ts` is read
- **THEN** each `zh-Hans` copy entry SHALL have a `// TODO: zh-Hans review` comment on the same or preceding line

---

### Requirement: Destructive confirmation layout follows locale convention
In all locales, the destructive action button SHALL appear on the RIGHT side of a confirmation dialog footer. Cancel SHALL appear on the LEFT. This rule is not locale-specific but is codified here as a universal convention.

#### Scenario: Confirm dialog button order
- **WHEN** a destructive confirm dialog renders in any locale
- **THEN** the button order (left to right) SHALL be: [Cancel / キャンセル / 取消] then [Delete / 削除する / 删除]
