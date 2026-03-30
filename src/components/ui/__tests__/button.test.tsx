import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button', () => {
  describe('variants', () => {
    it('primary variant applies brand background', () => {
      render(<Button variant="primary">保存する</Button>)
      expect(screen.getByRole('button').className).toContain('bg-[--color-brand]')
    })

    it('secondary variant applies border', () => {
      render(<Button variant="secondary">キャンセル</Button>)
      expect(screen.getByRole('button').className).toContain('border-[--color-border]')
    })

    it('ghost variant is transparent', () => {
      render(<Button variant="ghost">詳細を見る</Button>)
      expect(screen.getByRole('button').className).toContain('bg-transparent')
    })

    it('destructive variant uses error color', () => {
      render(<Button variant="destructive">削除する</Button>)
      expect(screen.getByRole('button').className).toContain('bg-[--color-error]')
    })

    it('defaults to primary when no variant provided', () => {
      render(<Button>保存する</Button>)
      expect(screen.getByRole('button').className).toContain('bg-[--color-brand]')
    })
  })

  describe('sizes', () => {
    it('sm size applies h-8', () => {
      render(<Button size="sm">保存する</Button>)
      expect(screen.getByRole('button').className).toContain('h-8')
    })

    it('md size applies h-10 (default)', () => {
      render(<Button>保存する</Button>)
      expect(screen.getByRole('button').className).toContain('h-10')
    })

    it('lg size applies h-12', () => {
      render(<Button size="lg">保存する</Button>)
      expect(screen.getByRole('button').className).toContain('h-12')
    })
  })

  describe('loading state', () => {
    it('shows 処理中... when loading', () => {
      render(<Button isLoading>保存する</Button>)
      expect(screen.getByText('処理中...')).toBeInTheDocument()
    })

    it('hides children text when loading', () => {
      render(<Button isLoading>保存する</Button>)
      expect(screen.queryByText('保存する')).not.toBeInTheDocument()
    })

    it('is disabled when loading', () => {
      render(<Button isLoading>保存する</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('renders spinner svg when loading', () => {
      const { container } = render(<Button isLoading>保存する</Button>)
      expect(container.querySelector('svg')).toBeTruthy()
    })
  })

  describe('disabled state', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>保存する</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('accessibility', () => {
    it('forwards aria-label to the button element', () => {
      render(<Button aria-label="削除する" />)
      expect(screen.getByRole('button', { name: '削除する' })).toBeInTheDocument()
    })
  })

  describe('className merging', () => {
    it('merges extra className with base classes', () => {
      render(<Button className="w-full">保存する</Button>)
      const btn = screen.getByRole('button')
      expect(btn.className).toContain('w-full')
      expect(btn.className).toContain('bg-[--color-brand]')
    })
  })
})
