import type { JSX } from 'react'
import { useT } from '../lib/useT'

const STATS = [
  { value: '7',  labelKey: 'statComponents' as const },
  { value: '48', labelKey: 'statTokens'     as const },
  { value: '2',  labelKey: 'statProducts'   as const },
]

export function ShowcaseHeader(): JSX.Element {
  const t = useT()

  return (
    <header className="mb-16 pb-12" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <p
        className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase"
        style={{ color: 'var(--color-brand)' }}
      >
        Design System
      </p>
      <h1
        className="mb-3 text-5xl leading-none font-bold tracking-tight"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
      >
        森
        <span
          className="ml-4 text-3xl font-medium tracking-normal"
          style={{ color: 'var(--color-ink-secondary)' }}
        >
          Mori
        </span>
      </h1>
      <p
        className="mb-8 text-base leading-relaxed whitespace-pre-line"
        style={{ color: 'var(--color-ink-secondary)' }}
      >
        {t.headerSubtitle}
      </p>
      <div className="flex gap-8">
        {STATS.map((stat) => (
          <div key={stat.labelKey}>
            <p
              className="text-3xl leading-none font-bold tabular-nums"
              style={{ color: 'var(--color-brand)' }}
            >
              {stat.value}
            </p>
            <p className="mt-1 text-xs" style={{ color: 'var(--color-ink-tertiary)' }}>
              {t[stat.labelKey]}
            </p>
          </div>
        ))}
      </div>
    </header>
  )
}
