import { useState, useRef, useEffect, type JSX, type ReactNode } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { Skeleton } from './skeleton'
import { cn } from '../../lib/cn'

export interface ColumnDef<T> {
  key: keyof T
  header: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => ReactNode
}

type SortDirection = 'asc' | 'desc' | null

export interface DataTableProps<T extends object> {
  columns: ColumnDef<T>[]
  data: T[]
  isLoading?: boolean
  skeletonRowCount?: number
  emptyState?: ReactNode
  className?: string
}

function sortData<T>(data: T[], key: keyof T, direction: SortDirection): T[] {
  if (!direction) return data
  return [...data].sort((a, b) => {
    const av = a[key]
    const bv = b[key]
    if (av === bv) return 0
    const cmp = av < bv ? -1 : 1
    return direction === 'asc' ? cmp : -cmp
  })
}

export function DataTable<T extends object>({
  columns,
  data,
  isLoading = false,
  skeletonRowCount = 5,
  emptyState,
  className,
}: DataTableProps<T>): JSX.Element {
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Detect horizontal overflow to show the fade gradient
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const check = (): void => {
      setIsOverflowing(el.scrollWidth > el.clientWidth)
    }
    check()

    // ResizeObserver is not available in all environments (e.g. jsdom in tests)
    if (typeof ResizeObserver === 'undefined') return undefined
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [columns, data])

  function handleSort(key: keyof T): void {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir('asc')
    } else if (sortDir === 'asc') {
      setSortDir('desc')
    } else if (sortDir === 'desc') {
      setSortKey(null)
      setSortDir(null)
    }
  }

  const displayData = sortKey ? sortData(data, sortKey, sortDir) : data

  const isEmpty = !isLoading && data.length === 0

  return (
    <div className={cn('relative', className)}>
      {/* Right-edge fade gradient when content overflows horizontally */}
      {isOverflowing && !isEmpty && (
        <div
          className="pointer-events-none absolute top-0 right-0 z-[var(--z-dropdown)] h-full w-8"
          style={{
            background: 'linear-gradient(to right, transparent, var(--color-surface-raised))',
          }}
          aria-hidden
        />
      )}

      <div ref={scrollRef} className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {columns.map((col, colIdx) => (
                <th
                  key={String(col.key)}
                  scope="col"
                  className={cn(
                    'px-3 py-2.5 text-left text-xs font-semibold whitespace-nowrap',
                    // Sticky header
                    'sticky top-0 z-[var(--z-sticky)]',
                    // Sticky first column header needs to beat both sticky rows and sticky body cells
                    colIdx === 0 && 'sticky left-0 z-[var(--z-overlay)]',
                    col.sortable && 'cursor-pointer select-none',
                  )}
                  style={{
                    background: 'var(--color-surface)',
                    color: 'var(--color-ink-secondary)',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  aria-sort={
                    col.sortable && sortKey === col.key
                      ? sortDir === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : col.sortable
                        ? 'none'
                        : undefined
                  }
                >
                  <span className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <span style={{ color: 'var(--color-ink-tertiary)' }}>
                        {sortKey === col.key && sortDir === 'asc' ? (
                          <ChevronUp size={12} aria-hidden />
                        ) : sortKey === col.key && sortDir === 'desc' ? (
                          <ChevronDown size={12} aria-hidden />
                        ) : (
                          <ChevronsUpDown size={12} aria-hidden />
                        )}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              Array.from({ length: skeletonRowCount }, (_, rowIdx) => (
                <tr key={rowIdx}>
                  {columns.map((col, colIdx) => (
                    <td
                      key={String(col.key)}
                      className={cn('px-3 py-2.5', colIdx === 0 && 'sticky left-0')}
                      style={{
                        background: 'var(--color-surface)',
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : isEmpty ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-10 text-center text-sm"
                  style={{ color: 'var(--color-ink-tertiary)' }}
                >
                  {emptyState ?? 'まだデータがありません'}
                </td>
              </tr>
            ) : (
              displayData.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="transition-colors duration-100"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={String(col.key)}
                      className={cn(
                        'px-3 py-2.5 whitespace-nowrap',
                        colIdx === 0 && 'sticky left-0',
                      )}
                      style={{
                        color: 'var(--color-ink)',
                        background: 'var(--color-surface)',
                      }}
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
