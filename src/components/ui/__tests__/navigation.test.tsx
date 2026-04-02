import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import type { SVGProps } from 'react'
import { BottomTabBar, Sidebar } from '../navigation'

// Minimal SVG icon stub — avoids lucide-react dependency in tests.
const HomeIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg {...props} data-testid="icon-home" />
)
const CalendarIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg {...props} data-testid="icon-calendar" />
)

const tabItems = [
  { key: 'home', icon: HomeIcon, label: 'ホーム', isActive: true },
  { key: 'shift', icon: CalendarIcon, label: 'シフト', isActive: false },
]

const sidebarItems = [
  { key: 'shift', icon: CalendarIcon, label: 'シフト管理', isActive: true },
  { key: 'staff', icon: HomeIcon, label: 'スタッフ一覧', isActive: false },
]

describe('BottomTabBar', () => {
  describe('structure', () => {
    it('renders a nav element', () => {
      render(<BottomTabBar items={tabItems} />)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('renders all tab items', () => {
      render(<BottomTabBar items={tabItems} />)
      expect(screen.getByText('ホーム')).toBeInTheDocument()
      expect(screen.getByText('シフト')).toBeInTheDocument()
    })

    it('has fixed bottom positioning class', () => {
      render(<BottomTabBar items={tabItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav.className).toContain('fixed')
      expect(nav.className).toContain('bottom-0')
    })

    it('has h-[60px] height', () => {
      render(<BottomTabBar items={tabItems} />)
      expect(screen.getByRole('navigation').className).toContain('h-[60px]')
    })
  })

  describe('active state', () => {
    it('active tab has brand text color', () => {
      render(<BottomTabBar items={tabItems} />)
      const homeBtn = screen.getByRole('button', { name: /ホーム/ })
      expect(homeBtn.className).toContain('text-(--color-brand)')
    })

    it('inactive tab has tertiary text color', () => {
      render(<BottomTabBar items={tabItems} />)
      const shiftBtn = screen.getByRole('button', { name: /シフト/ })
      expect(shiftBtn.className).toContain('text-(--color-ink-tertiary)')
    })

    it('active tab has aria-current="page"', () => {
      render(<BottomTabBar items={tabItems} />)
      expect(screen.getByRole('button', { name: /ホーム/ })).toHaveAttribute('aria-current', 'page')
    })

    it('inactive tab has no aria-current', () => {
      render(<BottomTabBar items={tabItems} />)
      expect(screen.getByRole('button', { name: /シフト/ })).not.toHaveAttribute('aria-current')
    })
  })

  describe('touch target', () => {
    it('tab items have min-h-[44px] for touch target compliance', () => {
      render(<BottomTabBar items={tabItems} />)
      const btn = screen.getByRole('button', { name: /ホーム/ })
      expect(btn.className).toContain('min-h-[44px]')
    })
  })

  describe('icon + label layout', () => {
    it('icon renders above label (flex-col)', () => {
      render(<BottomTabBar items={tabItems} />)
      const btn = screen.getByRole('button', { name: /ホーム/ })
      expect(btn.className).toContain('flex-col')
    })

    it('renders icon element', () => {
      render(<BottomTabBar items={tabItems} />)
      expect(screen.getAllByTestId('icon-home').length).toBeGreaterThan(0)
    })
  })

  describe('onClick', () => {
    it('calls onClick handler when tab is clicked', () => {
      const onClick = vi.fn()
      const items = [{ key: 'home', icon: HomeIcon, label: 'ホーム', onClick }]
      render(<BottomTabBar items={items} />)
      fireEvent.click(screen.getByRole('button', { name: /ホーム/ }))
      expect(onClick).toHaveBeenCalledOnce()
    })
  })
})

describe('Sidebar', () => {
  describe('structure', () => {
    it('renders a nav element', () => {
      render(<Sidebar items={sidebarItems} />)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('renders all sidebar items', () => {
      render(<Sidebar items={sidebarItems} />)
      expect(screen.getByText('シフト管理')).toBeInTheDocument()
      expect(screen.getByText('スタッフ一覧')).toBeInTheDocument()
    })

    it('has w-[240px] width class', () => {
      render(<Sidebar items={sidebarItems} />)
      expect(screen.getByRole('navigation').className).toContain('w-[240px]')
    })
  })

  describe('active state', () => {
    it('active item has brand-light background', () => {
      render(<Sidebar items={sidebarItems} />)
      const activeBtn = screen.getByRole('button', { name: /シフト管理/ })
      expect(activeBtn.className).toContain('bg-(--color-brand-light)')
      expect(activeBtn.className).toContain('text-(--color-brand-dark)')
    })

    it('inactive item has hover style', () => {
      render(<Sidebar items={sidebarItems} />)
      const inactiveBtn = screen.getByRole('button', { name: /スタッフ一覧/ })
      expect(inactiveBtn.className).toContain('hover:bg-(--color-surface-raised)')
      expect(inactiveBtn.className).toContain('text-(--color-ink-secondary)')
    })

    it('active item has aria-current="page"', () => {
      render(<Sidebar items={sidebarItems} />)
      expect(screen.getByRole('button', { name: /シフト管理/ })).toHaveAttribute(
        'aria-current',
        'page'
      )
    })
  })

  describe('icon + label layout', () => {
    it('icon renders to the left of label (flex-row)', () => {
      render(<Sidebar items={sidebarItems} />)
      const btn = screen.getByRole('button', { name: /シフト管理/ })
      expect(btn.className).toContain('flex')
      expect(btn.className).toContain('items-center')
      // flex-col is NOT present — icon is beside label, not above
      expect(btn.className).not.toContain('flex-col')
    })

    it('renders icon element', () => {
      render(<Sidebar items={sidebarItems} />)
      expect(screen.getAllByTestId('icon-calendar').length).toBeGreaterThan(0)
    })
  })

  describe('onClick', () => {
    it('calls onClick handler when item is clicked', () => {
      const onClick = vi.fn()
      const items = [{ key: 'shift', icon: CalendarIcon, label: 'シフト管理', onClick }]
      render(<Sidebar items={items} />)
      fireEvent.click(screen.getByRole('button', { name: /シフト管理/ }))
      expect(onClick).toHaveBeenCalledOnce()
    })
  })
})
