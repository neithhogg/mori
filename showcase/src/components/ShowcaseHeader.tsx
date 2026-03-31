import type { JSX } from 'react'

const STATS = [
  { value: '7', label: 'コンポーネント' },
  { value: '48', label: 'デザイントークン' },
  { value: '2', label: 'プロダクト' },
]

export function ShowcaseHeader(): JSX.Element {
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
      <p className="mb-8 text-base leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
        日本の中小企業向けSaaSプロダクトの共有デザイン言語。
        <br />
        ShiftMate と FaxBridge を支えるコンポーネントライブラリ。
      </p>
      <div className="flex gap-8">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p
              className="text-3xl leading-none font-bold tabular-nums"
              style={{ color: 'var(--color-brand)' }}
            >
              {stat.value}
            </p>
            <p className="mt-1 text-xs" style={{ color: 'var(--color-ink-tertiary)' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </header>
  )
}
