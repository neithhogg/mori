import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Input } from '../input'

describe('Input', () => {
  describe('base styles', () => {
    it('applies sunken background class', () => {
      const { container } = render(<Input />)
      const input = container.querySelector('input')
      expect(input?.className).toContain('bg-(--color-surface-sunken)')
    })

    it('applies full width class', () => {
      const { container } = render(<Input />)
      expect(container.querySelector('input')?.className).toContain('w-full')
    })
  })

  describe('label', () => {
    it('renders label element when label prop provided', () => {
      render(<Input label="店舗名" />)
      expect(screen.getByText('店舗名')).toBeInTheDocument()
    })

    it('links label to input via htmlFor / id', () => {
      render(<Input label="店舗名" id="shop-name" />)
      const label = screen.getByText('店舗名')
      expect(label.tagName).toBe('LABEL')
      expect(label).toHaveAttribute('for', 'shop-name')
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'shop-name')
    })

    it('auto-generates id when not provided (label still links)', () => {
      render(<Input label="メールアドレス" />)
      const label = screen.getByText('メールアドレス')
      const input = screen.getByRole('textbox')
      expect(label).toHaveAttribute('for', input.id)
      expect(input.id).toBeTruthy()
    })

    it('does not render label element when label prop is absent', () => {
      render(<Input placeholder="入力してください" />)
      expect(screen.queryByRole('label')).not.toBeInTheDocument()
    })
  })

  describe('error state', () => {
    it('applies error border class when error prop provided', () => {
      const { container } = render(<Input error="必須項目です" />)
      expect(container.querySelector('input')?.className).toContain('border-(--color-error)')
    })

    it('applies error focus ring class when error prop provided', () => {
      const { container } = render(<Input error="必須項目です" />)
      expect(container.querySelector('input')?.className).toContain('focus:ring-(--color-error)')
    })

    it('renders error message below input', () => {
      render(<Input error="正しいメールアドレスを入力してください" />)
      expect(screen.getByText('正しいメールアドレスを入力してください')).toBeInTheDocument()
    })

    it('error message has alert role', () => {
      render(<Input error="エラーメッセージ" />)
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('does not render error element when error prop is absent', () => {
      render(<Input />)
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  describe('helper text', () => {
    it('renders helper text when helperText prop provided', () => {
      render(<Input helperText="半角英数字で入力してください" />)
      expect(screen.getByText('半角英数字で入力してください')).toBeInTheDocument()
    })

    it('does not render helper text when prop is absent', () => {
      render(<Input />)
      // No helper or error paragraphs
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  describe('native prop forwarding', () => {
    it('forwards placeholder to input element', () => {
      render(<Input placeholder="例：tanaka@example.com" />)
      expect(screen.getByPlaceholderText('例：tanaka@example.com')).toBeInTheDocument()
    })

    it('forwards type to input element', () => {
      render(<Input type="email" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
    })

    it('forwards disabled to input element', () => {
      render(<Input disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })
  })
})
