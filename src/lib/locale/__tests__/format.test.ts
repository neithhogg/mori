import { describe, it, expect } from 'vitest'
import { formatDate, formatCurrency } from '../format'

// Use a fixed Tuesday to make weekday assertions deterministic.
// 2025-01-28 is a Tuesday.
const TUESDAY = new Date('2025-01-28T12:00:00Z')

describe('formatDate', () => {
  it('formats a Japanese date', () => {
    const result = formatDate(TUESDAY, 'ja')
    // ja-JP Intl renders: 2025年1月28日(火)
    expect(result).toBe('2025年1月28日(火)')
  })

  it('formats an English date', () => {
    const result = formatDate(TUESDAY, 'en')
    expect(result).toBe('Tuesday, January 28, 2025')
  })

  it('formats a Simplified Chinese date', () => {
    const result = formatDate(TUESDAY, 'zh-Hans')
    // zh-Hans-CN: "2025年1月28日 星期二"
    expect(result).toBe('2025年1月28日 星期二')
  })
})

describe('formatCurrency', () => {
  it('formats ¥1,980 for ja locale', () => {
    expect(formatCurrency(1980, 'ja')).toBe('¥1,980')
  })

  it('formats ¥1,980 for en locale', () => {
    expect(formatCurrency(1980, 'en')).toBe('¥1,980')
  })

  it('formats ¥1,980 for zh-Hans locale', () => {
    expect(formatCurrency(1980, 'zh-Hans')).toBe('¥1,980')
  })

  it('formats larger amounts with comma separators', () => {
    expect(formatCurrency(12980, 'ja')).toBe('¥12,980')
  })
})
