import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LocaleProvider, useLocale } from '../context'
import type { Locale } from '../types'

function LocaleDisplay(): JSX.Element {
  const locale = useLocale()
  return <span data-testid="locale">{locale}</span>
}

describe('LocaleProvider', () => {
  it('renders children', () => {
    render(
      <LocaleProvider locale="ja">
        <span>child</span>
      </LocaleProvider>
    )
    expect(screen.getByText('child')).toBeDefined()
  })

  it.each<Locale>(['ja', 'en', 'zh-Hans'])('provides locale %s to descendants', (locale) => {
    render(
      <LocaleProvider locale={locale}>
        <LocaleDisplay />
      </LocaleProvider>
    )
    expect(screen.getByTestId('locale').textContent).toBe(locale)
  })
})

describe('useLocale', () => {
  it('throws a descriptive error when called outside a provider', () => {
    // Suppress the React error boundary console output during this test
    const consoleError = console.error
    console.error = (): void => {
      /* suppress React error boundary output */
    }
    expect(() => render(<LocaleDisplay />)).toThrow('useLocale must be used inside LocaleProvider')
    console.error = consoleError
  })
})
