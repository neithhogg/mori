## ADDED Requirements

### Requirement: Confirm dialog follows Japanese destructive-action convention

The confirm dialog variant SHALL display a title, a body message, and two action buttons. The destructive action MUST always appear on the right, matching Japanese UI conventions established in PROJECT.md.

#### Scenario: Button order in confirm dialog

- **WHEN** a confirm Dialog is rendered
- **THEN** the cancel button SHALL appear on the left using the `secondary` variant
- **AND** the confirm button SHALL appear on the right
- **AND** if the action is destructive, the confirm button SHALL use the `destructive` variant

#### Scenario: Default Japanese copy

- **WHEN** no custom copy is provided
- **THEN** the cancel button label SHALL be `キャンセル`
- **AND** the confirm button label SHALL be `削除する` for destructive, `確認する` for neutral

#### Scenario: Loading state during async confirmation

- **WHEN** the user activates the confirm button and the action is pending
- **THEN** the confirm button SHALL show `処理中...` and be disabled
- **AND** the cancel button SHALL also be disabled during the pending state

### Requirement: Confirm dialog communicates irreversibility

Destructive confirm dialogs SHALL include a sub-message warning the user the action cannot be undone.

#### Scenario: Irreversibility warning present

- **WHEN** a confirm Dialog has `variant="destructive"`
- **THEN** the body SHALL include the text `この操作は取り消せません。`
- **AND** the body text color SHALL use `--color-ink-secondary`
