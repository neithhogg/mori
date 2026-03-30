## ADDED Requirements

### Requirement: BottomTabBar renders on mobile
The `BottomTabBar` component SHALL render a fixed bottom bar visible only on viewports ≤ 768px. It MUST support 4–5 tab items and apply `fixed bottom-0 left-0 right-0` positioning with a height of 60px.

#### Scenario: Default render
- **WHEN** `<BottomTabBar>` is rendered with tab items
- **THEN** the element has `fixed bottom-0 left-0 right-0` and is 60px tall

### Requirement: BottomTabBar tab item shows active state
Each tab item in `BottomTabBar` SHALL accept an `isActive` boolean prop. Active tabs MUST apply `text-[--color-brand] font-medium` instead of the default `text-[--color-ink-tertiary]`.

#### Scenario: Active tab
- **WHEN** a tab item has `isActive={true}`
- **THEN** the tab applies `text-[--color-brand] font-medium` classes

#### Scenario: Inactive tab
- **WHEN** a tab item has `isActive={false}` or no `isActive` prop
- **THEN** the tab applies `text-[--color-ink-tertiary]` classes

### Requirement: BottomTabBar tab items meet touch target size
Each tab item in `BottomTabBar` MUST have a minimum touch target of 44×44px to comply with mobile accessibility requirements.

#### Scenario: Touch target
- **WHEN** a tab item is rendered
- **THEN** its clickable area is at least 44px tall and 44px wide

### Requirement: Sidebar renders on desktop
The `Sidebar` component SHALL render a left-side navigation panel visible only on viewports ≥ 768px with a width of 240px.

#### Scenario: Desktop render
- **WHEN** `<Sidebar>` is rendered on a 1024px viewport
- **THEN** the sidebar is visible with `w-[240px]` and a left-side layout

### Requirement: Sidebar nav item shows active state
Each navigation item in `Sidebar` SHALL accept an `isActive` boolean prop. Active items MUST apply `bg-[--color-brand-light] text-[--color-brand-dark] font-medium`. Inactive items MUST use the hover style `hover:bg-[--color-surface-raised]`.

#### Scenario: Active sidebar item
- **WHEN** a sidebar nav item has `isActive={true}`
- **THEN** it has `bg-[--color-brand-light] text-[--color-brand-dark] font-medium` classes

#### Scenario: Inactive sidebar item hover
- **WHEN** a sidebar nav item has `isActive={false}`
- **THEN** it has `hover:bg-[--color-surface-raised]` and `text-[--color-ink-secondary]` classes

### Requirement: Navigation items accept icon and label
Both `BottomTabBar` tab items and `Sidebar` nav items SHALL accept an `icon` (Lucide React component) and a `label` string prop. The icon renders above the label in tab bar, and to the left in sidebar.

#### Scenario: Icon and label in tab
- **WHEN** a `BottomTabBar` item is rendered with `icon={HomeIcon}` and `label="ホーム"`
- **THEN** the icon renders above the label text `ホーム`

#### Scenario: Icon and label in sidebar
- **WHEN** a `Sidebar` item is rendered with `icon={CalendarIcon}` and `label="シフト管理"`
- **THEN** the icon renders to the left of the label text `シフト管理`
