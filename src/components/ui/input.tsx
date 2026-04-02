import { useId, type JSX } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../../lib/cn'

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string
  error?: string
  helperText?: string
}

const BASE =
  'w-full h-10 px-3 bg-(--color-surface-sunken) border border-(--color-border) ' +
  'rounded-(--radius-md) text-sm text-(--color-ink) placeholder:text-(--color-ink-tertiary) ' +
  'transition-colors duration-200 ' +
  'focus:outline-none focus:border-(--color-brand) focus:ring-1 focus:ring-(--color-brand) ' +
  'disabled:opacity-50 disabled:cursor-not-allowed'

const ERROR_CLASSES =
  'border-(--color-error) focus:border-(--color-error) focus:ring-(--color-error)'

export function Input({
  label,
  error,
  helperText,
  id,
  className,
  ...props
}: InputProps): JSX.Element {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex flex-col gap-1">
      {label !== undefined && (
        <label
          htmlFor={inputId}
          className="font-(--font-medium) text-sm text-(--color-ink-secondary)"
        >
          {label}
        </label>
      )}
      <input
        {...props}
        id={inputId}
        className={cn(BASE, error !== undefined && ERROR_CLASSES, className)}
      />
      {error !== undefined && (
        <p className="text-xs text-(--color-error)" role="alert">
          {error}
        </p>
      )}
      {helperText !== undefined && (
        <p className="text-xs text-(--color-ink-tertiary)">{helperText}</p>
      )}
    </div>
  )
}
