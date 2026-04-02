import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ActivityTimeline, type TimelineEvent } from '../activity-timeline'

const now = new Date()
const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000)
const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)

const events: TimelineEvent[] = [
  {
    id: '1',
    icon: <span>📄</span>,
    description: 'FAXを受信しました',
    timestamp: fiveMinAgo,
  },
  {
    id: '2',
    icon: <span>✅</span>,
    description: 'データを抽出しました',
    timestamp: twoHoursAgo,
  },
]

describe('ActivityTimeline', () => {
  describe('event render', () => {
    it('renders all event descriptions', () => {
      render(<ActivityTimeline events={events} />)
      expect(screen.getByText('FAXを受信しました')).toBeInTheDocument()
      expect(screen.getByText('データを抽出しました')).toBeInTheDocument()
    })

    it('renders event icons', () => {
      render(<ActivityTimeline events={events} />)
      expect(screen.getByText('📄')).toBeInTheDocument()
      expect(screen.getByText('✅')).toBeInTheDocument()
    })
  })

  describe('order', () => {
    it('desc order renders newest event first (default)', () => {
      render(<ActivityTimeline events={events} />)
      const items = screen.getAllByRole('listitem')
      expect(items[0].textContent).toContain('FAXを受信しました')
    })

    it('asc order renders oldest event first', () => {
      render(<ActivityTimeline events={events} order="asc" />)
      const items = screen.getAllByRole('listitem')
      expect(items[0].textContent).toContain('データを抽出しました')
    })
  })

  describe('relative timestamp', () => {
    it('shows "5分前" for an event 5 minutes ago', () => {
      render(<ActivityTimeline events={[events[0]]} />)
      expect(screen.getByText('5分前')).toBeInTheDocument()
    })

    it('shows "2時間前" for an event 2 hours ago', () => {
      render(<ActivityTimeline events={[events[1]]} />)
      expect(screen.getByText('2時間前')).toBeInTheDocument()
    })
  })

  describe('aria-label on timestamp', () => {
    it('includes absolute Japanese date/time in aria-label', () => {
      render(<ActivityTimeline events={[events[0]]} />)
      const timeEl = screen.getByRole('time')
      // aria-label should be the full formatted date string
      const ariaLabel = timeEl.getAttribute('aria-label') ?? ''
      // Should contain Japanese era/year pattern and 年
      expect(ariaLabel).toMatch(/年/)
    })

    it('sets title attribute equal to aria-label', () => {
      render(<ActivityTimeline events={[events[0]]} />)
      const timeEl = screen.getByRole('time')
      expect(timeEl.getAttribute('title')).toBe(timeEl.getAttribute('aria-label'))
    })
  })

  describe('loading state', () => {
    it('renders default 4 skeleton items when isLoading', () => {
      render(<ActivityTimeline events={[]} isLoading />)
      const items = screen.getAllByRole('listitem')
      expect(items.length).toBe(4)
    })

    it('respects skeletonCount prop', () => {
      render(<ActivityTimeline events={[]} isLoading skeletonCount={2} />)
      const items = screen.getAllByRole('listitem')
      expect(items.length).toBe(2)
    })

    it('does not render real events when loading', () => {
      render(<ActivityTimeline events={events} isLoading />)
      expect(screen.queryByText('FAXを受信しました')).not.toBeInTheDocument()
    })
  })
})
