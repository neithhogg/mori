import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Skeleton } from '../skeleton'

describe('Skeleton', () => {
  describe('base classes', () => {
    it('applies animate-pulse class', () => {
      const { container } = render(<Skeleton />)
      expect(container.firstChild).toHaveClass('animate-pulse')
    })

    it('applies sunken background token', () => {
      const { container } = render(<Skeleton />)
      expect((container.firstChild as HTMLElement).className).toContain(
        'bg-(--color-surface-sunken)'
      )
    })

    it('applies medium radius token', () => {
      const { container } = render(<Skeleton />)
      expect((container.firstChild as HTMLElement).className).toContain('rounded-(--radius-md)')
    })

    it('does not use a spinner or rotation animation', () => {
      const { container } = render(<Skeleton />)
      expect((container.firstChild as HTMLElement).className).not.toContain('animate-spin')
    })
  })

  describe('className merging', () => {
    it('merges custom dimensions with base classes', () => {
      const { container } = render(<Skeleton className="h-6 w-48" />)
      const el = container.firstChild as HTMLElement
      expect(el.className).toContain('w-48')
      expect(el.className).toContain('h-6')
      expect(el.className).toContain('animate-pulse')
    })
  })

  describe('native prop forwarding', () => {
    it('forwards aria-label', () => {
      const { container } = render(<Skeleton aria-label="読み込み中" />)
      expect(container.firstChild).toHaveAttribute('aria-label', '読み込み中')
    })
  })
})
