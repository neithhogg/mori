import type { ComponentPropsWithoutRef, JSX } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-[--color-brand] text-white hover:bg-[--color-brand-dark]',
  secondary:
    'bg-white border border-[--color-border] text-[--color-ink] hover:bg-[--color-surface-raised]',
  ghost: 'bg-transparent text-[--color-ink-secondary] hover:bg-[--color-surface-raised]',
  destructive: 'bg-[--color-error] text-white hover:opacity-90',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

const BASE =
  'inline-flex items-center justify-center gap-2 font-medium rounded-[--radius-md] ' +
  'transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-brand]'

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      {...props}
      disabled={isLoading || disabled === true}
      className={cn(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          <span>処理中...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
