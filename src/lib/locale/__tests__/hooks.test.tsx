import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LocaleProvider } from '../context'
import { useCopy } from '../hooks'
import type { Locale } from '../types'

function CopyDisplay({ field }: { field: string }): JSX.Element {
  const copy = useCopy()
  // Navigate the nested copy object using a dot-path like "action.save"
  const parts = field.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = parts.reduce((obj: any, key) => obj[key], copy) as string
  return <span data-testid="copy">{value}</span>
}

function renderWithLocale(locale: Locale, field: string): void {
  render(
    <LocaleProvider locale={locale}>
      <CopyDisplay field={field} />
    </LocaleProvider>
  )
}

describe('useCopy', () => {
  it('returns Japanese copy for ja locale', () => {
    renderWithLocale('ja', 'action.save')
    expect(screen.getByTestId('copy').textContent).toBe('保存する')
  })

  it('returns English copy for en locale', () => {
    renderWithLocale('en', 'action.save')
    expect(screen.getByTestId('copy').textContent).toBe('Save')
  })

  it('returns Chinese copy for zh-Hans locale', () => {
    renderWithLocale('zh-Hans', 'action.save')
    expect(screen.getByTestId('copy').textContent).toBe('保存')
  })

  it('returns Japanese loading text', () => {
    renderWithLocale('ja', 'status.loading')
    expect(screen.getByTestId('copy').textContent).toBe('処理中...')
  })

  it('returns English loading text', () => {
    renderWithLocale('en', 'status.loading')
    expect(screen.getByTestId('copy').textContent).toBe('Loading...')
  })

  it('returns Japanese empty default', () => {
    renderWithLocale('ja', 'empty.default')
    expect(screen.getByTestId('copy').textContent).toBe('まだデータがありません')
  })

  it('returns English empty default', () => {
    renderWithLocale('en', 'empty.default')
    expect(screen.getByTestId('copy').textContent).toBe('No data yet')
  })
})
