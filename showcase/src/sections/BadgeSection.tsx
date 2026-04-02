import type { JSX } from 'react'
import { Badge } from '@mori/components/ui/badge'
import type { BadgeVariant } from '@mori/components/ui/badge'
import { SectionWrapper } from '../components/SectionWrapper'
import { VarBlock } from '../components/VarBlock'
import { useT } from '../lib/useT'

export function BadgeSection(): JSX.Element {
  const t = useT()

  const BADGES: { variant: BadgeVariant; label: string; desc: string }[] = [
    { variant: 'green', label: t.badgeLabelGreen, desc: 'green — success' },
    { variant: 'amber', label: t.badgeLabelAmber, desc: 'amber — warning' },
    { variant: 'red',   label: t.badgeLabelRed,   desc: 'red — error'    },
    { variant: 'blue',  label: t.badgeLabelBlue,  desc: 'blue — info'    },
    { variant: 'gray',  label: t.badgeLabelGray,  desc: 'gray — neutral' },
    { variant: 'brand', label: t.badgeLabelBrand, desc: 'brand — primary' },
  ]

  const ROWS = [
    { name: t.badgeRow1Name, shift: t.badgeRow1Shift, status: t.badgeRow1Status, variant: 'green' as BadgeVariant },
    { name: t.badgeRow2Name, shift: t.badgeRow2Shift, status: t.badgeRow2Status, variant: 'amber' as BadgeVariant },
    { name: t.badgeRow3Name, shift: t.badgeRow3Shift, status: t.badgeRow3Status, variant: 'red'   as BadgeVariant },
  ]

  return (
    <SectionWrapper id="badge" num="04" titleEn="Badge" titleJa={t.sectionSubtitleBadge}>
      <VarBlock label="All Variants">
        <div className="flex flex-wrap gap-3">
          {BADGES.map(({ variant, label }) => (
            <Badge key={variant} variant={variant}>
              {label}
            </Badge>
          ))}
        </div>
      </VarBlock>

      <VarBlock label={t.badgeContextTitle}>
        <div className="space-y-3">
          {ROWS.map((row) => (
            <div
              key={row.name}
              className="flex items-center justify-between rounded-lg px-4 py-3"
              style={{
                background: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>
                  {row.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-ink-tertiary)' }}>
                  {row.shift}
                </p>
              </div>
              <Badge variant={row.variant}>{row.status}</Badge>
            </div>
          ))}
        </div>
      </VarBlock>
    </SectionWrapper>
  )
}
