import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Dialog } from '../dialog'

// jsdom does not implement showModal / close — mock them so useEffect calls succeed.
beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute('open', '')
  })
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open')
  })
})

const defaultProps = {
  open: true,
  onClose: vi.fn(),
  title: 'テストダイアログ',
}

describe('Dialog', () => {
  describe('open / close', () => {
    it('calls showModal when open is true', () => {
      render(<Dialog {...defaultProps} />)
      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
    })

    it('calls close when open is false', () => {
      const { rerender } = render(<Dialog {...defaultProps} open={true} />)
      rerender(<Dialog {...defaultProps} open={false} />)
      expect(HTMLDialogElement.prototype.close).toHaveBeenCalled()
    })
  })

  describe('title and aria-labelledby', () => {
    it('renders dialog title', () => {
      render(<Dialog {...defaultProps} />)
      expect(screen.getByText('テストダイアログ')).toBeInTheDocument()
    })

    it('dialog element has aria-labelledby pointing to title id', () => {
      render(<Dialog {...defaultProps} />)
      const dialog = document.querySelector('dialog')
      const titleId = dialog?.getAttribute('aria-labelledby') ?? ''
      expect(titleId).toBeTruthy()
      const titleEl = document.getElementById(titleId)
      expect(titleEl?.textContent).toBe('テストダイアログ')
    })

    it('renders subtitle when provided', () => {
      render(<Dialog {...defaultProps} subtitle="サブタイトル" />)
      expect(screen.getByText('サブタイトル')).toBeInTheDocument()
    })
  })

  describe('ESC key (cancel event)', () => {
    it('calls onClose when cancel event fires', () => {
      const onClose = vi.fn()
      render(<Dialog {...defaultProps} onClose={onClose} />)
      const dialog = document.querySelector('dialog')
      expect(dialog).toBeTruthy()
      fireEvent(
        dialog as HTMLDialogElement,
        new Event('cancel', { bubbles: false, cancelable: true })
      )
      expect(onClose).toHaveBeenCalledOnce()
    })

    it('does not call onClose on cancel when disableOutsideClose is true', () => {
      const onClose = vi.fn()
      render(<Dialog {...defaultProps} onClose={onClose} disableOutsideClose />)
      const dialog = document.querySelector('dialog')
      expect(dialog).toBeTruthy()
      fireEvent(
        dialog as HTMLDialogElement,
        new Event('cancel', { bubbles: false, cancelable: true })
      )
      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe('overlay click', () => {
    it('calls onClose when overlay is clicked', () => {
      const onClose = vi.fn()
      render(<Dialog {...defaultProps} onClose={onClose} />)
      // The overlay is the div with aria-hidden="true"
      const overlay = document.querySelector('[aria-hidden="true"]') as HTMLElement
      fireEvent.click(overlay)
      expect(onClose).toHaveBeenCalledOnce()
    })

    it('does not call onClose on overlay click when disableOutsideClose is true', () => {
      const onClose = vi.fn()
      render(<Dialog {...defaultProps} onClose={onClose} disableOutsideClose />)
      const overlay = document.querySelector('[aria-hidden="true"]') as HTMLElement
      fireEvent.click(overlay)
      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe('mobile bottom-sheet classes', () => {
    it('panel has rounded-t and rounded-b-none for mobile bottom-sheet', () => {
      render(<Dialog {...defaultProps} />)
      const panel = document.querySelector('[class*="rounded-t-"]') as HTMLElement
      expect(panel?.className).toContain('rounded-t-(--radius-xl)')
      expect(panel?.className).toContain('rounded-b-none')
    })
  })

  describe('confirm variant', () => {
    const confirmProps = {
      open: true,
      onClose: vi.fn(),
      title: '本当に削除しますか？',
      variant: 'confirm' as const,
      actionLabel: '削除する',
      onAction: vi.fn(),
    }

    it('renders キャンセル button on the left', () => {
      render(<Dialog {...confirmProps} />)
      expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument()
    })

    it('renders action button with provided label', () => {
      render(<Dialog {...confirmProps} />)
      expect(screen.getByRole('button', { name: '削除する' })).toBeInTheDocument()
    })

    it('キャンセル button calls onClose', () => {
      const onClose = vi.fn()
      render(<Dialog {...confirmProps} onClose={onClose} />)
      fireEvent.click(screen.getByRole('button', { name: 'キャンセル' }))
      expect(onClose).toHaveBeenCalledOnce()
    })

    it('action button calls onAction', () => {
      const onAction = vi.fn()
      render(<Dialog {...confirmProps} onAction={onAction} />)
      fireEvent.click(screen.getByRole('button', { name: '削除する' }))
      expect(onAction).toHaveBeenCalledOnce()
    })

    it('destructive prop adds 取り消し不能 copy', () => {
      render(<Dialog {...confirmProps} destructive />)
      expect(screen.getByText('この操作は取り消せません。')).toBeInTheDocument()
    })

    it('no 取り消し不能 copy when destructive is not set', () => {
      render(<Dialog {...confirmProps} />)
      expect(screen.queryByText('この操作は取り消せません。')).not.toBeInTheDocument()
    })
  })

  describe('loading state (confirm)', () => {
    const confirmProps = {
      open: true,
      onClose: vi.fn(),
      title: '削除しますか？',
      variant: 'confirm' as const,
      actionLabel: '削除する',
      onAction: vi.fn(),
      isLoading: true,
    }

    it('action button shows 処理中... when loading', () => {
      render(<Dialog {...confirmProps} />)
      expect(screen.getByText('処理中...')).toBeInTheDocument()
    })

    it('キャンセル button is disabled when loading', () => {
      render(<Dialog {...confirmProps} />)
      expect(screen.getByRole('button', { name: 'キャンセル' })).toBeDisabled()
    })

    it('action button is disabled when loading', () => {
      render(<Dialog {...confirmProps} />)
      // Action button shows 処理中... and is disabled
      const buttons = screen.getAllByRole('button')
      const actionBtn = buttons.find(
        (b) =>
          b.hasAttribute('disabled') && b !== screen.getByRole('button', { name: 'キャンセル' })
      )
      expect(actionBtn).toBeTruthy()
    })
  })
})
