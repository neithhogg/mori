import type { JSX } from 'react'
import { Card } from '@mori/components/ui/card'
import { SectionWrapper } from '../components/SectionWrapper'
import { VarBlock } from '../components/VarBlock'

export function CardSection(): JSX.Element {
  return (
    <SectionWrapper id="card" num="03" titleEn="Card" titleJa="カード">
      <VarBlock label="base — Default Surface">
        <div className="max-w-xs">
          <Card>
            <p
              className="mb-1 text-sm font-semibold"
              style={{ color: 'var(--color-ink)' }}
            >
              今月の売上
            </p>
            <p
              className="text-2xl font-bold tabular-nums"
              style={{ color: 'var(--color-brand)' }}
            >
              ¥1,280,000
            </p>
            <p
              className="mt-1 text-xs"
              style={{ color: 'var(--color-ink-tertiary)' }}
            >
              前月比 +12.4%
            </p>
          </Card>
        </div>
      </VarBlock>

      <VarBlock label="interactive — Hover Shadow">
        <div className="grid max-w-sm grid-cols-2 gap-3">
          {['青山店', '渋谷店'].map((name) => (
            <Card key={name} variant="interactive">
              <p
                className="text-sm font-semibold"
                style={{ color: 'var(--color-ink)' }}
              >
                {name}
              </p>
              <p
                className="mt-1 text-xs"
                style={{ color: 'var(--color-ink-tertiary)' }}
              >
                スタッフ 8名
              </p>
            </Card>
          ))}
        </div>
      </VarBlock>

      <VarBlock label="highlighted — Brand Border">
        <div className="max-w-xs">
          <Card variant="highlighted">
            <div className="flex items-center justify-between">
              <p
                className="text-sm font-semibold"
                style={{ color: 'var(--color-ink)' }}
              >
                プレミアムプラン
              </p>
              <span
                className="rounded-full px-2 py-0.5 text-xs font-medium"
                style={{
                  background: 'var(--color-brand-light)',
                  color: 'var(--color-brand-dark)',
                }}
              >
                現在のプラン
              </span>
            </div>
            <p
              className="mt-2 text-xs leading-relaxed"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              無制限のスタッフ登録、高度な分析機能、優先サポートが含まれます。
            </p>
          </Card>
        </div>
      </VarBlock>
    </SectionWrapper>
  )
}
