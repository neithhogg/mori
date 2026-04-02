import type { ComponentPropsWithoutRef, JSX } from 'react'
import { cn } from '../../lib/cn'

export type SkeletonProps = ComponentPropsWithoutRef<'div'>

// Shimmer-only loading placeholder — spinners are prohibited per Mori design rules.
// Callers set explicit dimensions via className (e.g. "w-48 h-4").
// Without explicit dimensions the skeleton fills container width with default height.
export function Skeleton({ className, ...props }: SkeletonProps): JSX.Element {
  return (
    <div
      {...props}
      className={cn('animate-pulse rounded-(--radius-md) bg-(--color-surface-sunken)', className)}
    />
  )
}
