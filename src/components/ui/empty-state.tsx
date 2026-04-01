import type { ComponentType, JSX, SVGProps } from 'react'
import { Button } from './button'

// Using ComponentType<SVGProps<SVGSVGElement>> keeps EmptyState decoupled from
// lucide-react's specific types — any icon library that exports SVG components works.
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

export interface EmptyStateProps {
  /** Required heading text — callers must provide a meaningful, context-specific string. */
  heading: string
  /** Optional secondary description rendered below the heading. */
  description?: string
  /** Optional Lucide (or any SVG) icon component. Rendered at 48×48px. */
  icon?: IconComponent
  /** Optional primary CTA rendered as a Button. */
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({
  heading,
  description,
  icon: Icon,
  action,
}: EmptyStateProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      {Icon && (
        <Icon
          width={48}
          height={48}
          style={{ color: 'var(--color-ink-tertiary)' }}
          aria-hidden="true"
        />
      )}

      <div className="flex flex-col gap-2">
        <p
          style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-semibold)',
            color: 'var(--color-ink)',
            lineHeight: 'var(--leading-heading)',
          }}
        >
          {heading}
        </p>

        {description && (
          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-ink-secondary)',
              lineHeight: 'var(--leading-body)',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {action && (
        <Button variant="primary" size="md" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
