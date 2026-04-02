import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from '../card'

describe('Card', () => {
  describe('base classes', () => {
    it('always applies surface background', () => {
      render(<Card>content</Card>)
      expect(screen.getByText('content').className).toContain('bg-(--color-surface)')
    })

    it('always applies large radius', () => {
      render(<Card>content</Card>)
      expect(screen.getByText('content').className).toContain('rounded-(--radius-lg)')
    })
  })

  describe('variants', () => {
    it('base variant has no extra classes', () => {
      render(<Card variant="base">base</Card>)
      const el = screen.getByText('base')
      expect(el.className).not.toContain('cursor-pointer')
      expect(el.className).not.toContain('border-(--color-brand)')
    })

    it('interactive variant adds cursor-pointer and hover shadow', () => {
      render(<Card variant="interactive">interactive</Card>)
      const el = screen.getByText('interactive')
      expect(el.className).toContain('cursor-pointer')
      expect(el.className).toContain('hover:shadow-(--shadow-md)')
    })

    it('highlighted variant uses brand border with border-2', () => {
      render(<Card variant="highlighted">highlighted</Card>)
      const el = screen.getByText('highlighted')
      expect(el.className).toContain('border-(--color-brand)')
      expect(el.className).toContain('border-2')
    })

    it('defaults to base variant', () => {
      render(<Card>default</Card>)
      const el = screen.getByText('default')
      expect(el.className).not.toContain('cursor-pointer')
    })
  })

  describe('className merging', () => {
    it('merges extra className with base classes', () => {
      render(<Card className="mt-4">content</Card>)
      const el = screen.getByText('content')
      expect(el.className).toContain('mt-4')
      expect(el.className).toContain('bg-(--color-surface)')
    })
  })

  describe('children', () => {
    it('renders children', () => {
      render(
        <Card>
          <span>田中商店</span>
        </Card>
      )
      expect(screen.getByText('田中商店')).toBeInTheDocument()
    })
  })
})
