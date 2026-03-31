import { createContext, useContext, type ReactNode } from 'react'
import type { Locale } from './types'

const LocaleContext = createContext<Locale | null>(null)

interface LocaleProviderProps {
  locale: Locale
  children: ReactNode
}

export function LocaleProvider({ locale, children }: LocaleProviderProps): JSX.Element {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

// Throws a descriptive error when called outside a provider so misconfigured
// product roots are caught immediately rather than silently falling back.
export function useLocale(): Locale {
  const locale = useContext(LocaleContext)
  if (locale === null) {
    throw new Error('useLocale must be used inside LocaleProvider')
  }
  return locale
}
