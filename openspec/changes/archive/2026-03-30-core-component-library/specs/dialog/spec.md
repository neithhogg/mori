## ADDED Requirements

### Requirement: Dialog renders overlay and panel
The `Dialog` component SHALL render using the native `<dialog>` element opened with `showModal()`. It MUST include an overlay dimming layer and a panel with header, body, and footer slots.

#### Scenario: Open dialog
- **WHEN** `<Dialog open={true}>` is rendered
- **THEN** the native `<dialog>` element is open and the panel is visible with `bg-[--color-surface] border border-[--color-border] rounded-[--radius-xl] shadow-[--shadow-lg]`

#### Scenario: Closed dialog
- **WHEN** `<Dialog open={false}>` is rendered
- **THEN** the dialog is not open and no panel is visible

### Requirement: Dialog closes on ESC key
The `Dialog` component SHALL close when the user presses the ESC key. The `onClose` callback MUST be called.

#### Scenario: ESC key pressed
- **WHEN** an open dialog receives a keydown event for the Escape key
- **THEN** `onClose` is called

### Requirement: Dialog closes on overlay click (default)
By default the `Dialog` SHALL close when the user clicks the overlay area (outside the panel). The `onClose` callback MUST be called.

#### Scenario: Overlay click
- **WHEN** the user clicks the overlay area outside the panel
- **THEN** `onClose` is called

### Requirement: Dialog disables outside close for destructive confirms
The `Dialog` component SHALL accept a `disableOutsideClose` boolean prop. When `true`, clicking the overlay MUST NOT close the dialog. ESC key MUST also be suppressed.

#### Scenario: disableOutsideClose active
- **WHEN** `disableOutsideClose={true}` and user clicks overlay
- **THEN** `onClose` is NOT called and the dialog remains open

### Requirement: Dialog traps focus
While a `Dialog` is open, keyboard focus MUST remain within the dialog. Tab and Shift+Tab MUST cycle through focusable elements inside the panel only.

#### Scenario: Focus trap active
- **WHEN** an open dialog contains two buttons and focus is on the last button
- **THEN** pressing Tab moves focus to the first focusable element inside the dialog (not outside it)

### Requirement: Dialog restores focus on close
When a `Dialog` closes, focus MUST return to the element that triggered the dialog to open.

#### Scenario: Focus restored
- **WHEN** a dialog is closed
- **THEN** focus is moved back to the element that had focus before the dialog opened

### Requirement: Dialog has aria-labelledby pointing to title
The `Dialog` component SHALL accept a `titleId` prop (or generate one internally) and set `aria-labelledby` on the `<dialog>` element pointing to the title element.

#### Scenario: aria-labelledby set
- **WHEN** a dialog is rendered with a title
- **THEN** the `<dialog>` element has `aria-labelledby` matching the id of the title element

### Requirement: Dialog renders as bottom sheet on mobile
On viewports narrower than 768px, the Dialog panel MUST render anchored to the bottom of the screen with `rounded-t-[--radius-xl] rounded-b-none fixed bottom-0 left-0 right-0` instead of the centered desktop position.

#### Scenario: Mobile bottom sheet
- **WHEN** the dialog is open on a 390px viewport
- **THEN** the panel has bottom-anchored positioning classes

### Requirement: Confirm dialog variant enforces Japanese action order
The `Dialog` component's `variant="confirm"` SHALL render the cancel button on the left and the action button on the right in the footer. Destructive confirm bodies MUST include the text `この操作は取り消せません。`

#### Scenario: Confirm footer order
- **WHEN** `<Dialog variant="confirm">` is rendered
- **THEN** the footer contains キャンセル button on the left and the action button on the right

#### Scenario: Destructive body copy
- **WHEN** `<Dialog variant="confirm" destructive>` is rendered
- **THEN** the body includes the text `この操作は取り消せません。`

### Requirement: Confirm dialog action button shows loading state
While a confirm action is processing, the `Dialog` component SHALL accept an `isLoading` prop. When `true`, the action button MUST show `処理中...` and both buttons MUST be disabled.

#### Scenario: Loading state during confirm
- **WHEN** `isLoading={true}` is passed to a confirm dialog
- **THEN** the action button shows `処理中...` and both the cancel and action buttons have the `disabled` attribute
