import type { JSX } from 'react'
import { useLocale } from '../lib/locale'
import type { Locale } from '../lib/locale'
import { cn } from '@mori/lib/cn'

const LOCALES: { key: Locale; label: string }[] = [
  { key: 'ja', label: 'JA' },
  { key: 'en', label: 'EN' },
  { key: 'zh-Hans', label: 'ZH' },
]

export function LocaleSwitcher(): JSX.Element {
  const { locale, setLocale } = useLocale()

  return (
    <div
      className="flex items-center gap-1 rounded-lg p-1"
      style={{ background: 'var(--color-surface-sunken)' }}
    >
      {LOCALES.map(({ key, label }) => {
        const isActive = locale === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => {
              setLocale(key)
            }}
            className={cn(
              'flex-1 rounded-md px-2 py-1 text-[0.625rem] font-semibold tracking-wide',
              'transition-all duration-150',
              isActive
                ? 'text-(--color-brand-dark)'
                : 'text-(--color-ink-tertiary) hover:text-(--color-ink-secondary)'
            )}
            style={
              isActive
                ? {
                    background: 'var(--color-surface)',
                    boxShadow: 'var(--shadow-sm)',
                    color: 'var(--color-brand-dark)',
                  }
                : undefined
            }
            aria-pressed={isActive}
            aria-label={`Switch to ${label}`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
