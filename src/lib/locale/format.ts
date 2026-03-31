import type { Locale } from './types'

// Maps Mori locale to the BCP 47 tag used by Intl APIs.
const INTL_LOCALE: Record<Locale, string> = {
  ja: 'ja-JP',
  en: 'en-US',
  'zh-Hans': 'zh-Hans-CN',
}

/**
 * Format a date according to locale conventions.
 *
 * ja:       2025年1月28日(火)
 * en:       Tuesday, January 28, 2025
 * zh-Hans:  2025年1月28日 星期二
 */
export function formatDate(date: Date, locale: Locale): string {
  const intlLocale = INTL_LOCALE[locale]

  if (locale === 'ja') {
    return new Intl.DateTimeFormat(intlLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    }).format(date)
  }

  if (locale === 'en') {
    return new Intl.DateTimeFormat(intlLocale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  // zh-Hans: "2025年1月28日 星期二"
  // Intl produces "2025年1月28日星期二" (no space) — we normalise the separator.
  const datePart = new Intl.DateTimeFormat(intlLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)

  const weekdayPart = new Intl.DateTimeFormat(intlLocale, {
    weekday: 'long',
  }).format(date)

  return `${datePart} ${weekdayPart}`
}

/**
 * Format a JPY currency amount.
 *
 * All supported locales display Japanese Yen with no decimal places
 * and a ¥ prefix — e.g. ¥1,980.
 *
 * We prepend ¥ (U+00A5) directly rather than relying on Intl currency
 * formatting because ja-JP returns a fullwidth ¥ (U+FFE5) and zh-Hans
 * returns "JP¥" — neither matches the Mori DS standard.
 */
export function formatCurrency(amount: number, locale: Locale): string {
  const number = new Intl.NumberFormat(INTL_LOCALE[locale], {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
  return `¥${number}`
}
