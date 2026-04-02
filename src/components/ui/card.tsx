import type { ComponentPropsWithoutRef, JSX } from 'react'
import { cn } from '../../lib/cn'

export type CardVariant = 'base' | 'interactive' | 'highlighted'

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  variant?: CardVariant
}

// p-4 on mobile, p-5 on sm+ — matches StatCard's inner padding so grids align
const BASE = 'bg-(--color-surface) border border-(--color-border) rounded-(--radius-lg) p-4 sm:p-5'

const VARIANT_CLASSES: Record<CardVariant, string> = {
  base: '',
  interactive: 'cursor-pointer transition-shadow duration-200 hover:shadow-(--shadow-md)',
  highlighted: 'border-(--color-brand) border-2',
}

export function Card({ variant = 'base', className, children, ...props }: CardProps): JSX.Element {
  return (
    <div {...props} className={cn(BASE, VARIANT_CLASSES[variant], className)}>
      {children}
    </div>
  )
}
