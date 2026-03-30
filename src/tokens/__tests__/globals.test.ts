import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect, beforeEach } from 'vitest'

const TOKEN_FILE = join(import.meta.dirname, '..', 'globals.css')

// All token names as defined verbatim in PROJECT.md — any drift here is a bug.
const COLOUR_TOKENS = [
  '--color-brand',
  '--color-brand-light',
  '--color-brand-dark',
  '--color-ink',
  '--color-ink-secondary',
  '--color-ink-tertiary',
  '--color-surface',
  '--color-surface-raised',
  '--color-surface-sunken',
  '--color-border',
  '--color-border-strong',
  '--color-info',
  '--color-info-light',
  '--color-success',
  '--color-success-light',
  '--color-warning',
  '--color-warning-light',
  '--color-error',
  '--color-error-light',
] as const // 19 colour tokens (brand: 3, neutrals: 3, surfaces: 3, borders: 2, semantic: 8)

const TYPOGRAPHY_TOKENS = [
  '--font-sans',
  '--font-mono',
  '--text-xs',
  '--text-sm',
  '--text-base',
  '--text-lg',
  '--text-xl',
  '--text-2xl',
  '--text-3xl',
  '--text-4xl',
  '--font-normal',
  '--font-medium',
  '--font-semibold',
] as const // 13 typography tokens

const SPACING_TOKENS = [
  '--space-1',
  '--space-2',
  '--space-3',
  '--space-4',
  '--space-5',
  '--space-6',
  '--space-8',
  '--space-10',
  '--space-12',
  '--space-16',
] as const // 10 spacing tokens

const RADIUS_TOKENS = [
  '--radius-sm',
  '--radius-md',
  '--radius-lg',
  '--radius-xl',
  '--radius-full',
] as const // 5 radius tokens

const SHADOW_TOKENS = ['--shadow-sm', '--shadow-md', '--shadow-lg'] as const // 3 shadow tokens

const MOTION_TOKENS = [
  '--duration-fast',
  '--duration-base',
  '--duration-slow',
  '--ease-default',
  '--ease-in',
  '--ease-out',
] as const // 6 motion tokens

const ALL_TOKENS = [
  ...COLOUR_TOKENS,
  ...TYPOGRAPHY_TOKENS,
  ...SPACING_TOKENS,
  ...RADIUS_TOKENS,
  ...SHADOW_TOKENS,
  ...MOTION_TOKENS,
]

describe('src/tokens/globals.css', () => {
  let css: string

  // Read once — all tests share the same string to avoid redundant I/O.
  it('file exists and is non-empty', () => {
    expect(existsSync(TOKEN_FILE)).toBe(true)
    css = readFileSync(TOKEN_FILE, 'utf-8')
    expect(css.trim().length).toBeGreaterThan(0)
  })

  describe('token groups', () => {
    beforeEach(() => {
      css = readFileSync(TOKEN_FILE, 'utf-8')
    })

    it('colour group — representative token present', () => {
      expect(css).toContain('--color-brand:')
    })

    it('typography group — representative token present', () => {
      expect(css).toContain('--font-sans:')
    })

    it('spacing group — representative token present', () => {
      expect(css).toContain('--space-4:')
    })

    it('radius group — representative token present', () => {
      expect(css).toContain('--radius-md:')
    })

    it('shadow group — representative token present', () => {
      expect(css).toContain('--shadow-md:')
    })

    it('motion group — representative token present', () => {
      expect(css).toContain('--duration-base:')
    })
  })

  describe('token completeness', () => {
    beforeEach(() => {
      css = readFileSync(TOKEN_FILE, 'utf-8')
    })

    it.each(ALL_TOKENS)('defines %s', (token) => {
      expect(css).toContain(`${token}:`)
    })

    it('total token count matches PROJECT.md specification', () => {
      // Count unique CSS custom property declarations in the file.
      const matches = css.match(/--[\w-]+:/g) ?? []
      const unique = new Set(matches)
      // 19 colour + 13 typography + 10 spacing + 5 radius + 3 shadow + 6 motion = 56
      expect(unique.size).toBe(ALL_TOKENS.length)
    })
  })

  describe('no hardcoded values outside :root', () => {
    beforeEach(() => {
      css = readFileSync(TOKEN_FILE, 'utf-8')
    })

    it('all hex colour values live exclusively inside the :root block', () => {
      // Strip the :root { … } block, then check the remainder has no hex colours.
      const withoutRoot = css.replace(/:root\s*\{[^}]*\}/s, '')
      const hexPattern = /#[0-9a-fA-F]{3,8}\b/g
      const matches = withoutRoot.match(hexPattern) ?? []
      expect(matches).toHaveLength(0)
    })

    // Deliberate failure to verify CI catches test errors — remove before merge
    it('CI_VERIFY: intentional failure', () => {
      expect(true).toBe(false)
    })
  })
})
