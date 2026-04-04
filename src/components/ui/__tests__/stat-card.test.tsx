import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCard } from '../stat-card'

describe('StatCard', () => {
  describe('basic render', () => {
    it('renders label and value', () => {
      render(<StatCard label="本日の出勤数" value="12" />)
      expect(screen.getByText('本日の出勤数')).toBeInTheDocument()
      expect(screen.getByText('12')).toBeInTheDocument()
    })

    it('applies surface background and large radius', () => {
      const { container } = render(<StatCard label="売上" value="0" />)
      const root = container.firstElementChild as HTMLElement
      expect(root.className).toContain('bg-(--color-surface)')
      expect(root.className).toContain('rounded-(--radius-lg)')
    })
  })

  describe('delta', () => {
    it('shows positive delta with success colour', () => {
      render(<StatCard label="出勤数" value="12" delta={{ value: '+3', direction: 'up' }} />)
      const delta = screen.getByText('+3')
      expect(delta.closest('div')?.style.color).toContain('var(--color-success)')
    })

    it('shows negative delta with error colour', () => {
      render(<StatCard label="出勤数" value="9" delta={{ value: '-2', direction: 'down' }} />)
      const delta = screen.getByText('-2')
      expect(delta.closest('div')?.style.color).toContain('var(--color-error)')
    })

    it('renders no delta element when delta prop is omitted', () => {
      const { container } = render(<StatCard label="出勤数" value="9" />)
      // No TrendingUp/Down SVG icons
      expect(container.querySelectorAll('svg').length).toBe(0)
    })
  })

  describe('loading state', () => {
    it('renders skeletons instead of label and value when isLoading is true', () => {
      render(<StatCard label="出勤数" value="12" isLoading />)
      expect(screen.queryByText('出勤数')).not.toBeInTheDocument()
      expect(screen.queryByText('12')).not.toBeInTheDocument()
    })

    it('shows no spinner when loading', () => {
      const { container } = render(<StatCard label="出勤数" value="12" isLoading />)
      // Skeletons use animate-pulse divs, not spinner SVGs
      expect(container.querySelectorAll('svg').length).toBe(0)
    })
  })

  describe('aria-label', () => {
    it('builds aria-label from label and value with no format', () => {
      render(<StatCard label="出勤数" value="12" />)
      expect(screen.getByLabelText('出勤数: 12')).toBeInTheDocument()
    })

    it('prefixes ¥ for currency format', () => {
      render(<StatCard label="今月の売上" value="198,000" format="currency" />)
      expect(screen.getByLabelText('今月の売上: ¥198,000')).toBeInTheDocument()
    })

    it('suffixes % for percent format', () => {
      render(<StatCard label="稼働率" value="87.5" format="percent" />)
      expect(screen.getByLabelText('稼働率: 87.5%')).toBeInTheDocument()
    })

    it('includes delta direction in aria-label', () => {
      render(<StatCard label="出勤数" value="12" delta={{ value: '+3', direction: 'up' }} />)
      expect(screen.getByLabelText(/増加/)).toBeInTheDocument()
    })
  })
})
