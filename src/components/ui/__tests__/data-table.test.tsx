import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DataTable, type ColumnDef } from '../data-table'

interface Row {
  name: string
  shift: string
  count: number
}

const columns: ColumnDef<Row>[] = [
  { key: 'name', header: '名前', sortable: true },
  { key: 'shift', header: 'シフト' },
  { key: 'count', header: '日数', sortable: true },
]

const data: Row[] = [
  { name: '田中 花子', shift: '月', count: 5 },
  { name: '鈴木 一郎', shift: '火', count: 3 },
  { name: '山田 次郎', shift: '水', count: 7 },
]

describe('DataTable', () => {
  describe('render', () => {
    it('renders column headers', () => {
      render(<DataTable columns={columns} data={data} />)
      expect(screen.getByText('名前')).toBeInTheDocument()
      expect(screen.getByText('シフト')).toBeInTheDocument()
      expect(screen.getByText('日数')).toBeInTheDocument()
    })

    it('renders all data rows', () => {
      render(<DataTable columns={columns} data={data} />)
      expect(screen.getByText('田中 花子')).toBeInTheDocument()
      expect(screen.getByText('鈴木 一郎')).toBeInTheDocument()
      expect(screen.getByText('山田 次郎')).toBeInTheDocument()
    })

    it('uses custom render function when provided', () => {
      const customColumns: ColumnDef<Row>[] = [
        {
          key: 'name',
          header: '名前',
          render: (v) => <strong data-testid="custom">{String(v)}</strong>,
        },
      ]
      render(<DataTable columns={customColumns} data={data} />)
      expect(screen.getAllByTestId('custom').length).toBe(3)
    })
  })

  describe('sort cycle', () => {
    it('sorts ascending on first click', () => {
      render(<DataTable columns={columns} data={data} />)
      const th = screen.getByText('名前').closest('th')
      if (!th) throw new Error('th not found')
      fireEvent.click(th)
      const cells = screen
        .getAllByRole('cell')
        .filter((c) => ['田中 花子', '山田 次郎', '鈴木 一郎'].includes(c.textContent ?? ''))
      expect(cells[0].textContent).toBe('山田 次郎') // ア行
    })

    it('sorts descending on second click', () => {
      render(<DataTable columns={columns} data={data} />)
      const th = screen.getByText('日数').closest('th')
      if (!th) throw new Error('th not found')
      fireEvent.click(th) // asc: 3, 5, 7
      fireEvent.click(th) // desc: 7, 5, 3
      const cells = screen
        .getAllByRole('cell')
        .filter((c) => ['5', '3', '7'].includes(c.textContent ?? ''))
      expect(cells[0].textContent).toBe('7')
    })

    it('clears sort on third click', () => {
      render(<DataTable columns={columns} data={data} />)
      const th = screen.getByText('名前').closest('th')
      if (!th) throw new Error('th not found')
      fireEvent.click(th)
      fireEvent.click(th)
      fireEvent.click(th)
      // After clearing, original order: 田中, 鈴木, 山田
      const rows = screen.getAllByRole('row').slice(1) // skip header
      expect(rows[0].textContent).toContain('田中 花子')
    })

    it('sets aria-sort ascending after first click', () => {
      render(<DataTable columns={columns} data={data} />)
      const th = screen.getByText('名前').closest('th')
      if (!th) throw new Error('th not found')
      fireEvent.click(th)
      expect(th.getAttribute('aria-sort')).toBe('ascending')
    })
  })

  describe('empty state', () => {
    it('shows default Japanese fallback when data is empty and no emptyState prop', () => {
      render(<DataTable columns={columns} data={[]} />)
      expect(screen.getByText('まだデータがありません')).toBeInTheDocument()
    })

    it('shows custom emptyState slot when provided', () => {
      render(<DataTable columns={columns} data={[]} emptyState={<span>カスタム空状態</span>} />)
      expect(screen.getByText('カスタム空状態')).toBeInTheDocument()
    })
  })

  describe('loading state', () => {
    it('renders default 5 skeleton rows when isLoading is true', () => {
      const { container } = render(<DataTable columns={columns} data={data} isLoading />)
      // Each skeleton row has `columns.length` skeleton cells; count animate-pulse divs
      const skeletons = container.querySelectorAll('.animate-pulse')
      expect(skeletons.length).toBe(5 * columns.length)
    })

    it('respects skeletonRowCount prop', () => {
      const { container } = render(
        <DataTable columns={columns} data={data} isLoading skeletonRowCount={3} />
      )
      const skeletons = container.querySelectorAll('.animate-pulse')
      expect(skeletons.length).toBe(3 * columns.length)
    })

    it('does not render data rows when loading', () => {
      render(<DataTable columns={columns} data={data} isLoading />)
      expect(screen.queryByText('田中 花子')).not.toBeInTheDocument()
    })
  })
})
