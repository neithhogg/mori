import type { ComponentPropsWithoutRef, JSX } from 'react'
import { cn } from '../../lib/cn'

export type CardVariant = 'base' | 'interactive' | 'highlighted'

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  variant?: CardVariant
}

const BASE = 'bg-[--color-surface] border border-[--color-border] rounded-[--radius-lg] p-6'

const VARIANT_CLASSES: Record<CardVariant, string> = {
  base: '',
  interactive: 'cursor-pointer transition-shadow duration-200 hover:shadow-[--shadow-md]',
  highlighted: 'border-[--color-brand] border-2',
}

export function Card({ variant = 'base', className, children, ...props }: CardProps): JSX.Element {
  return (
    <div {...props} className={cn(BASE, VARIANT_CLASSES[variant], className)}>
      {children}
    </div>
  )
}
