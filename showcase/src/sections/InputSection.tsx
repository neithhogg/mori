import type { JSX } from 'react'
import { Input } from '@mori/components/ui/input'
import { SectionWrapper } from '../components/SectionWrapper'
import { VarBlock } from '../components/VarBlock'
import { useT } from '../lib/useT'

export function InputSection(): JSX.Element {
  const t = useT()

  return (
    <SectionWrapper id="input" num="02" titleEn="Input" titleJa={t.sectionSubtitleInput}>
      <VarBlock label="Default">
        <div className="max-w-sm space-y-4">
          <Input label={t.inputLabelStoreName} placeholder={t.inputPlaceholderStoreName} />
          <Input placeholder={t.inputPlaceholderNoLabel} />
        </div>
      </VarBlock>

      <VarBlock label="With Helper Text">
        <div className="max-w-sm">
          <Input
            label={t.inputLabelEmail}
            type="email"
            placeholder="example@example.com"
            helperText={t.inputHelperEmail}
          />
        </div>
      </VarBlock>

      <VarBlock label="Error State">
        <div className="max-w-sm space-y-4">
          <Input
            label={t.inputLabelPhone}
            placeholder={t.inputPlaceholderPhone}
            error={t.inputErrorPhone}
          />
          <Input
            label={t.inputLabelPassword}
            type="password"
            placeholder={t.inputPlaceholderPassword}
            error={t.inputErrorPassword}
            helperText={t.inputHelperPassword}
          />
        </div>
      </VarBlock>

      <VarBlock label="Disabled">
        <div className="max-w-sm">
          <Input label={t.inputLabelRegistered} value={t.inputValueRegistered} disabled readOnly />
        </div>
      </VarBlock>
    </SectionWrapper>
  )
}
