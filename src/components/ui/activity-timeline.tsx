import type { JSX, ReactNode } from 'react'
import { Skeleton } from './skeleton'
import { cn } from '../../lib/cn'

export interface TimelineEvent {
  id: string
  icon: ReactNode
  description: string
  timestamp: Date
}

export interface ActivityTimelineProps {
  events: TimelineEvent[]
  /** 'desc' = newest first (default), 'asc' = oldest first */
  order?: 'desc' | 'asc'
  isLoading?: boolean
  skeletonCount?: number
  className?: string
}

const absoluteFormatter = new Intl.DateTimeFormat('ja-JP', {
  dateStyle: 'full',
  timeStyle: 'short',
})

function getRelativeLabel(timestamp: Date): string {
  const diffMs = Date.now() - timestamp.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) return 'たった今'
  if (diffMin < 60) return `${diffMin}分前`
  if (diffHour < 24) return `${diffHour}時間前`
  if (diffDay === 1) return '昨日'
  return `${diffDay}日前`
}

export function ActivityTimeline({
  events,
  order = 'desc',
  isLoading = false,
  skeletonCount = 4,
  className,
}: ActivityTimelineProps): JSX.Element {
  const sorted = order === 'asc' ? [...events].reverse() : events

  if (isLoading) {
    return (
      <ul className={cn('space-y-0', className)} aria-label="アクティビティ読み込み中">
        {Array.from({ length: skeletonCount }, (_, i) => (
          <li key={i} className="flex gap-3">
            {/* Connector + icon column */}
            <div className="flex flex-col items-center">
              {/* Circular icon skeleton */}
              <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
              {/* Connector line */}
              {i < skeletonCount - 1 && (
                <div
                  className="mt-1 w-px flex-1"
                  style={{ background: 'var(--color-border)', minHeight: '1.5rem' }}
                  aria-hidden
                />
              )}
            </div>
            {/* Content */}
            <div className="flex-1 pb-6">
              <Skeleton className="mb-1.5 h-4 w-3/4" />
              <Skeleton className="h-3 w-16" />
            </div>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className={cn('space-y-0', className)}>
      {sorted.map((event, idx) => {
        const relativeLabel = getRelativeLabel(event.timestamp)
        const absoluteLabel = absoluteFormatter.format(event.timestamp)
        const isLast = idx === sorted.length - 1

        return (
          <li key={event.id} className="flex gap-3">
            {/* Connector + icon column */}
            <div className="flex flex-col items-center">
              {/* Icon slot */}
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-ink-secondary)',
                }}
              >
                {event.icon}
              </div>
              {/* Vertical connector line */}
              {!isLast && (
                <div
                  className="mt-1 w-px flex-1"
                  style={{ background: 'var(--color-border)', minHeight: '1.5rem' }}
                  aria-hidden
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <p className="text-sm leading-snug" style={{ color: 'var(--color-ink)' }}>
                {event.description}
              </p>
              <time
                dateTime={event.timestamp.toISOString()}
                title={absoluteLabel}
                aria-label={absoluteLabel}
                className="mt-1 block text-xs"
                style={{ color: 'var(--color-ink-tertiary)' }}
              >
                {relativeLabel}
              </time>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
