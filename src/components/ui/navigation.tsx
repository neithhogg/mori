import type { ComponentType, JSX, SVGProps } from 'react'
import { cn } from '../../lib/cn'

// Using ComponentType<SVGProps<SVGSVGElement>> keeps the nav components
// decoupled from lucide-react's specific types — any icon library works.
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

// ── BottomTabBar ───────────────────────────────────────────────────────────────

export interface TabItem {
  key: string
  icon: IconComponent
  label: string
  isActive?: boolean
  onClick?: () => void
}

export interface BottomTabBarProps {
  items: TabItem[]
  className?: string
}

// Mobile navigation: fixed bottom bar, ≤768px.
// Maximum 4–5 items. Each tab item meets 44×44px minimum touch target.
export function BottomTabBar({ items, className }: BottomTabBarProps): JSX.Element {
  return (
    <nav
      aria-label="タブナビゲーション"
      className={cn(
        'fixed right-0 bottom-0 left-0 h-[60px]',
        'border-t border-[--color-border] bg-[--color-surface]',
        'flex items-stretch',
        className
      )}
    >
      {items.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.key}
            type="button"
            onClick={item.onClick}
            aria-current={item.isActive === true ? 'page' : undefined}
            // min-h-[44px] and flex-1 with the bar's h-[60px] guarantees 44×44px touch target.
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1',
              'min-h-[44px] px-3 py-2',
              'text-[0.625rem] transition-colors duration-200',
              item.isActive === true
                ? 'font-[--font-medium] text-[--color-brand]'
                : 'text-[--color-ink-tertiary]'
            )}
          >
            <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

// ── Sidebar ────────────────────────────────────────────────────────────────────

export interface SidebarNavItem {
  key: string
  icon: IconComponent
  label: string
  isActive?: boolean
  onClick?: () => void
}

export interface SidebarProps {
  items: SidebarNavItem[]
  className?: string
}

// Desktop navigation: left sidebar, ≥768px, 240px wide.
export function Sidebar({ items, className }: SidebarProps): JSX.Element {
  return (
    <nav
      aria-label="サイドバーナビゲーション"
      className={cn('flex w-[240px] flex-col gap-0.5 p-3', className)}
    >
      {items.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.key}
            type="button"
            onClick={item.onClick}
            aria-current={item.isActive === true ? 'page' : undefined}
            className={cn(
              'flex w-full items-center gap-3 px-3 py-2',
              'rounded-[--radius-md] text-sm transition-colors duration-150',
              item.isActive === true
                ? 'bg-[--color-brand-light] font-[--font-medium] text-[--color-brand-dark]'
                : 'text-[--color-ink-secondary] hover:bg-[--color-surface-raised]'
            )}
          >
            <Icon className="h-[18px] w-[18px] flex-shrink-0" aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
