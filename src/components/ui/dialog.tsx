import { useEffect, useId, useRef, type JSX, type ReactNode } from 'react'
import { Button } from './button'
import { cn } from '../../lib/cn'

// ── Types ──────────────────────────────────────────────────────────────────────

interface DialogBaseProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
  disableOutsideClose?: boolean
}

interface DialogDefaultProps extends DialogBaseProps {
  variant?: 'default'
  /** Footer slot — consumer composes action buttons for the default variant. */
  footer?: ReactNode
}

interface DialogConfirmProps extends DialogBaseProps {
  variant: 'confirm'
  actionLabel: string
  onAction: () => void
  /** Styles the action button as destructive and prepends 取り消し不能 copy. */
  destructive?: boolean
  isLoading?: boolean
}

export type DialogProps = DialogDefaultProps | DialogConfirmProps

// ── Component ─────────────────────────────────────────────────────────────────

export function Dialog(props: DialogProps): JSX.Element {
  const { open, onClose, title, subtitle, children, className, disableOutsideClose = false } = props

  const dialogRef = useRef<HTMLDialogElement>(null)
  const generatedTitleId = useId()
  const titleId = generatedTitleId

  // Open / close the native dialog via showModal / close.
  // showModal() places the dialog in the top layer with a built-in focus trap.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      if (!dialog.open) dialog.showModal()
    } else {
      if (dialog.open) dialog.close()
    }
  }, [open])

  // The native <dialog> fires a 'cancel' event on ESC key press and then closes
  // itself. We intercept it to call onClose (or block it when disableOutsideClose).
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleCancel = (e: Event): void => {
      e.preventDefault() // prevent native self-close — we control the state
      if (!disableOutsideClose) {
        onClose()
      }
    }

    dialog.addEventListener('cancel', handleCancel)
    return () => {
      dialog.removeEventListener('cancel', handleCancel)
    }
  }, [disableOutsideClose, onClose])

  // Overlay click: a click on the dim overlay (not the panel) should close.
  const handleOverlayClick = (): void => {
    if (!disableOutsideClose) {
      onClose()
    }
  }

  const isConfirm = props.variant === 'confirm'

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      // Reset UA dialog styles so we can position freely inside.
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        border: 'none',
        padding: 0,
        background: 'transparent',
        overflow: 'visible',
      }}
      className="z-50 m-0"
    >
      {/* Dim overlay — clicking this closes the dialog (unless disabled) */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
        onClick={handleOverlayClick}
      />

      {/* Panel container — pointer-events-none so only the panel receives clicks */}
      <div className="pointer-events-none fixed inset-0 flex items-end justify-center md:items-center md:p-4">
        <div
          className={cn(
            // Panel base
            'pointer-events-auto relative w-full bg-[--color-surface]',
            'border border-[--color-border] shadow-[--shadow-lg]',
            // Mobile: bottom sheet — slides up from bottom edge
            'rounded-t-[--radius-xl] rounded-b-none',
            // Desktop: centered card
            'md:max-w-md md:rounded-[--radius-xl]',
            className
          )}
          // Stop click propagation so panel clicks don't reach the overlay handler.
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-2">
            <h2 id={titleId} className="font-[--font-semibold] text-lg text-[--color-ink]">
              {title}
            </h2>
            {subtitle !== undefined && (
              <p className="mt-1 text-sm text-[--color-ink-secondary]">{subtitle}</p>
            )}
          </div>

          {/* Body */}
          <div className="px-6 py-4 text-sm leading-relaxed text-[--color-ink-secondary]">
            {/* Destructive confirm always includes the 取り消し不能 notice */}
            {isConfirm && props.destructive === true && (
              <p className="mb-3 text-[--color-ink]">この操作は取り消せません。</p>
            )}
            {children}
          </div>

          {/* Footer */}
          {isConfirm ? (
            // Confirm footer: キャンセル on the left, action on the right (Japanese convention)
            <div className="flex justify-end gap-3 px-6 pt-2 pb-6">
              <Button variant="secondary" disabled={props.isLoading === true} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                variant={props.destructive === true ? 'destructive' : 'primary'}
                isLoading={props.isLoading === true}
                onClick={props.onAction}
              >
                {props.actionLabel}
              </Button>
            </div>
          ) : (
            props.footer !== undefined && (
              <div className="flex justify-end gap-3 px-6 pt-2 pb-6">{props.footer}</div>
            )
          )}
        </div>
      </div>
    </dialog>
  )
}
