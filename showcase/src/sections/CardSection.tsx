import type { JSX } from 'react'
import { Card } from '@mori/components/ui/card'
import { SectionWrapper } from '../components/SectionWrapper'
import { VarBlock } from '../components/VarBlock'
import { useT } from '../lib/useT'

export function CardSection(): JSX.Element {
  const t = useT()

  return (
    <SectionWrapper id="card" num="03" titleEn="Card" titleJa={t.sectionSubtitleCard}>
      <VarBlock label="base — Default Surface">
        <div className="max-w-xs">
          <Card>
            <p className="mb-1 text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>
              {t.cardSalesLabel}
            </p>
            <p className="text-2xl font-bold tabular-nums" style={{ color: 'var(--color-brand)' }}>
              ¥1,280,000
            </p>
            <p className="mt-1 text-xs" style={{ color: 'var(--color-ink-tertiary)' }}>
              {t.cardSalesSubLabel}
            </p>
          </Card>
        </div>
      </VarBlock>

      <VarBlock label="interactive — Hover Shadow">
        <div className="grid max-w-sm grid-cols-2 gap-3">
          {[t.cardStore1, t.cardStore2].map((name) => (
            <Card key={name} variant="interactive">
              <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>
                {name}
              </p>
              <p className="mt-1 text-xs" style={{ color: 'var(--color-ink-tertiary)' }}>
                {t.cardStaffCount}
              </p>
            </Card>
          ))}
        </div>
      </VarBlock>

      <VarBlock label="highlighted — Brand Border">
        <div className="max-w-xs">
          <Card variant="highlighted">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>
                {t.cardPlanLabel}
              </p>
              <span
                className="rounded-full px-2 py-0.5 text-xs font-medium"
                style={{
                  background: 'var(--color-brand-light)',
                  color: 'var(--color-brand-dark)',
                }}
              >
                {t.cardPlanBadge}
              </span>
            </div>
            <p
              className="mt-2 text-xs leading-relaxed"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              {t.cardPlanDesc}
            </p>
          </Card>
        </div>
      </VarBlock>
    </SectionWrapper>
  )
}
