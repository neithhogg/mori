import {
  createContext,
  useContext,
  useState,
  useEffect,
  type JSX,
  type ReactNode,
} from 'react'

export type Locale = 'ja' | 'en' | 'zh-Hans'

const STORAGE_KEY = 'mori-showcase-locale'
const DEFAULT_LOCALE: Locale = 'ja'

interface LocaleContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => undefined,
})

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'ja' || stored === 'en' || stored === 'zh-Hans') return stored
  } catch {
    // localStorage unavailable (SSR / private mode)
  }
  return DEFAULT_LOCALE
}

export function LocaleProvider({ children }: { children: ReactNode }): JSX.Element {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  // Sync data-locale attribute → activates CSS token overrides
  useEffect(() => {
    document.documentElement.dataset.locale = locale
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // ignore
    }
  }, [locale])

  function setLocale(l: Locale): void {
    setLocaleState(l)
  }

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext)
}
