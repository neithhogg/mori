import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Inbox } from 'lucide-react'
import { EmptyState } from '../empty-state'

describe('EmptyState', () => {
  describe('heading-only render', () => {
    it('shows the heading', () => {
      render(<EmptyState heading="まだシフトがありません" />)
      expect(screen.getByText('まだシフトがありません')).toBeInTheDocument()
    })

    it('does not render an icon', () => {
      const { container } = render(<EmptyState heading="x" />)
      expect(container.querySelector('svg')).toBeNull()
    })

    it('does not render a description', () => {
      render(<EmptyState heading="x" />)
      // only one text node — the heading
      expect(screen.queryByText(/まだ項目/)).not.toBeInTheDocument()
    })

    it('does not render a button', () => {
      render(<EmptyState heading="x" />)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })

  describe('full render', () => {
    it('renders icon, heading, description, and button when all props provided', () => {
      const onClick = vi.fn()
      render(
        <EmptyState
          heading="まだシフトがありません"
          description="シフトを追加してください"
          icon={Inbox}
          action={{ label: '追加する', onClick }}
        />
      )
      expect(screen.getByText('まだシフトがありません')).toBeInTheDocument()
      expect(screen.getByText('シフトを追加してください')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '追加する' })).toBeInTheDocument()
      expect(document.querySelector('svg')).toBeTruthy()
    })
  })

  describe('icon', () => {
    it('renders SVG with 48px dimensions when icon prop supplied', () => {
      const { container } = render(<EmptyState heading="x" icon={Inbox} />)
      const svg = container.querySelector('svg')
      expect(svg).toBeTruthy()
      expect(svg?.getAttribute('width')).toBe('48')
      expect(svg?.getAttribute('height')).toBe('48')
    })

    it('does not render svg when icon omitted', () => {
      const { container } = render(<EmptyState heading="x" />)
      expect(container.querySelector('svg')).toBeNull()
    })
  })

  describe('description', () => {
    it('renders description when provided', () => {
      render(<EmptyState heading="x" description="説明文テスト" />)
      expect(screen.getByText('説明文テスト')).toBeInTheDocument()
    })

    it('does not render description when omitted', () => {
      render(<EmptyState heading="x" />)
      expect(screen.queryByText('説明文テスト')).not.toBeInTheDocument()
    })
  })

  describe('CTA action', () => {
    it('invokes onClick exactly once when button clicked', () => {
      const onClick = vi.fn()
      render(<EmptyState heading="x" action={{ label: '追加する', onClick }} />)
      fireEvent.click(screen.getByRole('button', { name: '追加する' }))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('does not render a button when action omitted', () => {
      render(<EmptyState heading="x" />)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })
})
