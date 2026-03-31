import { useLocale } from './context'
import { MoriCopy } from './copy'
import type { CopyKeys } from './copy'

export { MoriCopy }

// Returns the copy catalogue for the active locale.
// Components must use this hook rather than importing MoriCopy directly
// so that locale changes propagate reactively.
export function useCopy(): CopyKeys {
  const locale = useLocale()
  return MoriCopy[locale]
}
