import type { JSX } from 'react'
import { Badge } from '@mori/components/ui/badge'
import type { BadgeVariant } from '@mori/components/ui/badge'
import { SectionWrapper } from '../components/SectionWrapper'
import { VarBlock } from '../components/VarBlock'

const BADGES: Array<{ variant: BadgeVariant; label: string; desc: string }> = [
  { variant: 'green', label: '承認済', desc: 'green — success' },
  { variant: 'amber', label: '保留中', desc: 'amber — warning' },
  { variant: 'red', label: 'エラー', desc: 'red — error' },
  { variant: 'blue', label: '情報', desc: 'blue — info' },
  { variant: 'gray', label: 'アーカイブ', desc: 'gray — neutral' },
  { variant: 'brand', label: 'ブランド', desc: 'brand — primary' },
]

export function BadgeSection(): JSX.Element {
  return (
    <SectionWrapper id="badge" num="04" titleEn="Badge" titleJa="バッジ・タグ">
      <VarBlock label="All Variants">
        <div className="flex flex-wrap gap-3">
          {BADGES.map(({ variant, label }) => (
            <Badge key={variant} variant={variant}>
              {label}
            </Badge>
          ))}
        </div>
      </VarBlock>

      <VarBlock label="In Context — シフト申請一覧">
        <div className="space-y-3">
          {[
            { name: '田中 花子', shift: '月 09:00–17:00', status: '承認済' as const, variant: 'green' as BadgeVariant },
            { name: '鈴木 一郎', shift: '火 10:00–18:00', status: '保留中' as const, variant: 'amber' as BadgeVariant },
            { name: '山田 次郎', shift: '水 08:00–16:00', status: 'エラー' as const, variant: 'red' as BadgeVariant },
          ].map((row) => (
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
