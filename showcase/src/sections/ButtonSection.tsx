import type { JSX } from 'react'
import { Button } from '@mori/components/ui/button'
import type { ButtonVariant, ButtonSize } from '@mori/components/ui/button'
import { SectionWrapper } from '../components/SectionWrapper'
import { VarBlock } from '../components/VarBlock'
import { useT } from '../lib/useT'

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'destructive']
const SIZES: ButtonSize[] = ['sm', 'md', 'lg']

const VARIANT_LABELS: Record<ButtonVariant, string> = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'ghost',
  destructive: 'destructive',
}

const SIZE_LABELS: Record<ButtonSize, string> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
}

export function ButtonSection(): JSX.Element {
  const t = useT()

  return (
    <SectionWrapper id="btn" num="01" titleEn="Button" titleJa={t.sectionSubtitleButton}>
      <VarBlock label="Variants">
        <div className="flex flex-wrap items-center gap-3">
          {VARIANTS.map((v) => (
            <Button key={v} variant={v}>
              {VARIANT_LABELS[v]}
            </Button>
          ))}
        </div>
      </VarBlock>

      <VarBlock label="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          {SIZES.map((s) => (
            <Button key={s} size={s}>
              {SIZE_LABELS[s]}
            </Button>
          ))}
        </div>
      </VarBlock>

      <VarBlock label="States — Loading & Disabled">
        <div className="flex flex-wrap items-center gap-3">
          <Button isLoading>{t.btnLoading}</Button>
          <Button variant="secondary" isLoading>
            {t.btnLoading}
          </Button>
          <Button disabled>{t.btnDisabled}</Button>
          <Button variant="secondary" disabled>
            {t.btnDisabled}
          </Button>
        </div>
      </VarBlock>

      <VarBlock label="Variant × Size Matrix">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th
                  className="pr-4 pb-3 text-left text-xs font-medium"
                  style={{ color: 'var(--color-ink-tertiary)' }}
                />
                {SIZES.map((s) => (
                  <th
                    key={s}
                    className="pr-6 pb-3 text-left text-xs font-medium"
                    style={{ color: 'var(--color-ink-tertiary)' }}
                  >
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VARIANTS.map((v) => (
                <tr key={v}>
                  <td
                    className="py-2 pr-4 text-xs font-medium"
                    style={{ color: 'var(--color-ink-tertiary)', width: '100px' }}
                  >
                    {v}
                  </td>
                  {SIZES.map((s) => (
                    <td key={s} className="py-2 pr-6">
                      <Button variant={v} size={s}>
                        {t.btnAction}
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </VarBlock>
    </SectionWrapper>
  )
}
