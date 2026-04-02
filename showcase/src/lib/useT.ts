import { useLocale } from './locale'
import { translations } from './translations'
import type { Translations } from './translations'

/** Returns the full translations object for the currently active locale. */
export function useT(): Translations {
  const { locale } = useLocale()
  return translations[locale]
}
