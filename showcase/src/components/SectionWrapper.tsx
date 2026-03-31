import type { JSX, ReactNode } from 'react'

interface SectionWrapperProps {
  id: string
  num: string
  titleEn: string
  titleJa: string
  children: ReactNode
}

export function SectionWrapper({
  id,
  num,
  titleEn,
  titleJa,
  children,
}: SectionWrapperProps): JSX.Element {
  return (
    <section id={id} className="mb-20 scroll-mt-8">
      <div className="mb-8 flex items-baseline gap-4">
        <span
          className="font-mono text-xs font-semibold"
          style={{ color: 'var(--color-ink-tertiary)' }}
        >
          {num}
        </span>
        <div>
          <h2 className="text-xl leading-none font-semibold" style={{ color: 'var(--color-ink)' }}>
            {titleEn}
          </h2>
          <p className="mt-1 text-xs" style={{ color: 'var(--color-ink-tertiary)' }}>
            {titleJa}
          </p>
        </div>
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  )
}
