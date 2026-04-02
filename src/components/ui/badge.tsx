import type { ComponentPropsWithoutRef, JSX } from 'react'
import { cn } from '../../lib/cn'

export type BadgeVariant = 'green' | 'amber' | 'red' | 'blue' | 'gray' | 'brand'

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  variant?: BadgeVariant
}

const BASE = 'inline-flex items-center px-2 py-0.5 rounded-(--radius-sm) text-xs font-medium'

// All values reference CSS variable tokens — no hardcoded colours.
const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  green: 'bg-(--color-success-light) text-(--color-success)',
  amber: 'bg-(--color-warning-light) text-(--color-warning)',
  red: 'bg-(--color-error-light) text-(--color-error)',
  blue: 'bg-(--color-info-light) text-(--color-info)',
  gray: 'bg-(--color-surface-sunken) text-(--color-ink-secondary)',
  brand: 'bg-(--color-brand-light) text-(--color-brand-dark)',
}

export function Badge({
  variant = 'gray',
  className,
  children,
  ...props
}: BadgeProps): JSX.Element {
  return (
    <span {...props} className={cn(BASE, VARIANT_CLASSES[variant], className)}>
      {children}
    </span>
  )
}
