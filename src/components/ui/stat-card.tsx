import type { JSX } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Skeleton } from './skeleton'
import { cn } from '../../lib/cn'

export type StatCardFormat = 'currency' | 'count' | 'percent'

export interface StatCardDelta {
  value: string
  direction: 'up' | 'down'
}

export interface StatCardProps {
  label: string
  value: string
  delta?: StatCardDelta
  /** Hint used only for ARIA labelling — does not format `value` automatically */
  format?: StatCardFormat
  isLoading?: boolean
  className?: string
}

function buildAriaLabel(label: string, value: string, format: StatCardFormat | undefined, delta: StatCardDelta | undefined): string {
  let formattedValue = value
  if (format === 'currency') formattedValue = `¥${value}`
  if (format === 'percent') formattedValue = `${value}%`

  let ariaLabel = `${label}: ${formattedValue}`
  if (delta) {
    ariaLabel += ` (${delta.direction === 'up' ? '増加' : '減少'} ${delta.value})`
  }
  return ariaLabel
}

export function StatCard({
  label,
  value,
  delta,
  format,
  isLoading = false,
  className,
}: StatCardProps): JSX.Element {
  const ariaLabel = buildAriaLabel(label, value, format, delta)

  return (
    <div
      aria-label={ariaLabel}
      className={cn(
        'bg-(--color-surface) border border-(--color-border) rounded-(--radius-lg) p-4 sm:p-5',
        className,
      )}
    >
      {isLoading ? (
        <>
          <Skeleton className="mb-2 h-3 w-24" />
          <Skeleton className="h-7 w-32" />
        </>
      ) : (
        <>
          <p
            className="mb-1 text-sm"
            style={{ color: 'var(--color-ink-secondary)' }}
          >
            {label}
          </p>
          <p
            className="text-2xl font-bold tabular-nums leading-none"
            style={{ color: 'var(--color-ink)' }}
          >
            {value}
          </p>
          {delta && (
            <div
              className="mt-2 flex items-center gap-1 text-xs font-medium"
              style={{
                color: delta.direction === 'up'
                  ? 'var(--color-success)'
                  : 'var(--color-error)',
              }}
            >
              {delta.direction === 'up' ? (
                <TrendingUp size={12} aria-hidden />
              ) : (
                <TrendingDown size={12} aria-hidden />
              )}
              <span>{delta.value}</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
