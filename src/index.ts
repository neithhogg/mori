// Mori Design System — public API
//
// Design tokens (CSS custom properties):
//   Products import src/tokens/globals.css in their app/globals.css:
//   @import '../path/to/@mori/design-system/src/tokens/globals.css';
//
// Components (copy-paste model — shadcn/ui pattern):
//   Products copy individual files from src/components/ui/ into their own repo.
//   cn() utility should be copied alongside components.

// ── Utility ───────────────────────────────────────────────────────────────────
export { cn } from './lib/cn'

// ── Localisation ──────────────────────────────────────────────────────────────
export type { Locale } from './lib/locale/types'
export { LocaleProvider, useLocale } from './lib/locale/context'
export type { CopyKeys } from './lib/locale/copy'
export { MoriCopy, useCopy } from './lib/locale/hooks'
export { formatDate, formatCurrency } from './lib/locale/format'

// ── Components ────────────────────────────────────────────────────────────────
export { Button } from './components/ui/button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/ui/button'

export { Input } from './components/ui/input'
export type { InputProps } from './components/ui/input'

export { Card } from './components/ui/card'
export type { CardProps, CardVariant } from './components/ui/card'

export { Badge } from './components/ui/badge'
export type { BadgeProps, BadgeVariant } from './components/ui/badge'

export { Skeleton } from './components/ui/skeleton'
export type { SkeletonProps } from './components/ui/skeleton'

export { Dialog } from './components/ui/dialog'
export type { DialogProps } from './components/ui/dialog'

export { BottomTabBar, Sidebar } from './components/ui/navigation'
export type {
  BottomTabBarProps,
  SidebarProps,
  TabItem,
  SidebarNavItem,
  IconComponent,
} from './components/ui/navigation'

export { EmptyState } from './components/ui/empty-state'
export type { EmptyStateProps } from './components/ui/empty-state'
