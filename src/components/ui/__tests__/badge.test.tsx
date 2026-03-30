import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '../badge'

describe('Badge', () => {
  describe('base classes', () => {
    it('always applies base layout classes', () => {
      render(<Badge>出勤済み</Badge>)
      const el = screen.getByText('出勤済み')
      expect(el.className).toContain('inline-flex')
      expect(el.className).toContain('rounded-[--radius-sm]')
      expect(el.className).toContain('text-xs')
      expect(el.className).toContain('font-medium')
    })
  })

  describe('variants', () => {
    it('green variant uses success token pair', () => {
      render(<Badge variant="green">出勤済み</Badge>)
      const el = screen.getByText('出勤済み')
      expect(el.className).toContain('bg-[--color-success-light]')
      expect(el.className).toContain('text-[--color-success]')
    })

    it('amber variant uses warning token pair', () => {
      render(<Badge variant="amber">確認待ち</Badge>)
      const el = screen.getByText('確認待ち')
      expect(el.className).toContain('bg-[--color-warning-light]')
      expect(el.className).toContain('text-[--color-warning]')
    })

    it('red variant uses error token pair', () => {
      render(<Badge variant="red">欠勤</Badge>)
      const el = screen.getByText('欠勤')
      expect(el.className).toContain('bg-[--color-error-light]')
      expect(el.className).toContain('text-[--color-error]')
    })

    it('blue variant uses info token pair', () => {
      render(<Badge variant="blue">新着</Badge>)
      const el = screen.getByText('新着')
      expect(el.className).toContain('bg-[--color-info-light]')
      expect(el.className).toContain('text-[--color-info]')
    })

    it('gray variant uses surface-sunken token pair', () => {
      render(<Badge variant="gray">アーカイブ</Badge>)
      const el = screen.getByText('アーカイブ')
      expect(el.className).toContain('bg-[--color-surface-sunken]')
      expect(el.className).toContain('text-[--color-ink-secondary]')
    })

    it('brand variant uses brand token pair', () => {
      render(<Badge variant="brand">おすすめ</Badge>)
      const el = screen.getByText('おすすめ')
      expect(el.className).toContain('bg-[--color-brand-light]')
      expect(el.className).toContain('text-[--color-brand-dark]')
    })

    it('defaults to gray variant', () => {
      render(<Badge>ラベル</Badge>)
      expect(screen.getByText('ラベル').className).toContain('bg-[--color-surface-sunken]')
    })
  })

  describe('token-only classes', () => {
    it('no hardcoded hex values in any variant class string', () => {
      const variantClasses = Object.values({
        green: 'bg-[--color-success-light] text-[--color-success]',
        amber: 'bg-[--color-warning-light] text-[--color-warning]',
        red: 'bg-[--color-error-light] text-[--color-error]',
        blue: 'bg-[--color-info-light] text-[--color-info]',
        gray: 'bg-[--color-surface-sunken] text-[--color-ink-secondary]',
        brand: 'bg-[--color-brand-light] text-[--color-brand-dark]',
      })
      variantClasses.forEach((cls) => {
        expect(cls).not.toMatch(/#[0-9a-fA-F]{3,8}/)
      })
    })
  })

  describe('className merging', () => {
    it('merges extra className with base classes', () => {
      render(<Badge className="ml-2">タグ</Badge>)
      const el = screen.getByText('タグ')
      expect(el.className).toContain('ml-2')
      expect(el.className).toContain('inline-flex')
    })
  })
})
