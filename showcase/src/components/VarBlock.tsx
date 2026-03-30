import type { JSX, ReactNode } from 'react'

interface VarBlockProps {
  label: string
  children: ReactNode
  className?: string
}

export function VarBlock({ label, children, className }: VarBlockProps): JSX.Element {
  return (
    <div>
      <p
        className="mb-3 text-xs font-medium uppercase tracking-[0.1em]"
        style={{ color: 'var(--color-ink-tertiary)' }}
      >
        {label}
      </p>
      <div
        className={`rounded-xl p-6 ${className ?? ''}`}
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
