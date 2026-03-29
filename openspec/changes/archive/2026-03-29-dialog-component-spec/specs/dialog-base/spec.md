## ADDED Requirements

### Requirement: Dialog overlay and panel render with Mori tokens

The Dialog component SHALL render a full-screen overlay behind a centered panel. All colours, radii, and shadows MUST reference CSS variable tokens — no hardcoded values.

#### Scenario: Dialog opens with correct visual treatment

- **WHEN** a Dialog is opened
- **THEN** the overlay SHALL be `fixed inset-0 bg-black/40 backdrop-blur-sm z-50`
- **AND** the panel SHALL use `bg-[--color-surface] rounded-[--radius-xl] shadow-[--shadow-lg] w-full max-w-md mx-4`
- **AND** the panel SHALL be vertically centered on desktop via `flex items-center justify-center`

#### Scenario: Dialog opens with an entrance transition

- **WHEN** a Dialog transitions from closed to open
- **THEN** the overlay SHALL fade in using `transition-opacity duration-200`
- **AND** the panel SHALL scale in using `transition-all duration-200 ease-out scale-95 → scale-100`

### Requirement: Dialog closes via standard interactions

The Dialog SHALL close when the user presses ESC, clicks the overlay, or activates an explicit close control.

#### Scenario: User presses ESC key

- **WHEN** the Dialog is open and the user presses the ESC key
- **THEN** the Dialog SHALL close

#### Scenario: User clicks outside the panel

- **WHEN** the Dialog is open and the user clicks the overlay (not the panel)
- **THEN** the Dialog SHALL close

#### Scenario: Close is suppressed for destructive confirms

- **WHEN** the Dialog variant is `confirm` and `disableOutsideClose` is set
- **THEN** clicking the overlay SHALL NOT close the Dialog
- **AND** ESC SHALL NOT close the Dialog

### Requirement: Focus is trapped inside an open Dialog

The Dialog SHALL trap keyboard focus within the panel while open, and restore focus to the trigger element when closed.

#### Scenario: Tab key cycles within Dialog

- **WHEN** the Dialog is open and the user presses Tab
- **THEN** focus SHALL cycle through focusable elements inside the panel only
- **AND** focus SHALL NOT reach elements behind the overlay

#### Scenario: Focus restored on close

- **WHEN** the Dialog closes
- **THEN** focus SHALL return to the element that triggered the Dialog

### Requirement: Dialog adapts to mobile viewport as a bottom sheet

On viewports narrower than 768px the Dialog panel SHALL render as a bottom sheet rather than a centered modal.

#### Scenario: Mobile bottom-sheet layout

- **WHEN** the viewport is < 768px
- **THEN** the panel SHALL be `fixed bottom-0 left-0 right-0 rounded-t-[--radius-xl] rounded-b-none`
- **AND** the panel SHALL slide in from the bottom using `translate-y-full → translate-y-0 transition-transform duration-300`
