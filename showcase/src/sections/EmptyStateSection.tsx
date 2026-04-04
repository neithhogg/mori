import type { JSX } from 'react'
import { Inbox, Search, FolderOpen } from 'lucide-react'
import { EmptyState } from '@mori/components/ui/empty-state'
import { SectionWrapper } from '../components/SectionWrapper'
import { VarBlock } from '../components/VarBlock'
import { useT } from '../lib/useT'

export function EmptyStateSection(): JSX.Element {
  const t = useT()

  return (
    <SectionWrapper
      id="empty-state"
      num="08"
      titleEn="Empty State"
      titleJa={t.sectionSubtitleEmptyState}
    >
      <VarBlock label="Heading Only">
        <EmptyState heading={t.emptyNoData} />
      </VarBlock>

      <VarBlock label="Icon + Heading + Description + CTA">
        <EmptyState
          icon={Inbox}
          heading={t.emptyNoShiftHeading}
          description={t.emptyNoShiftDesc}
          action={{
            label: t.emptyNoShiftCta,
            onClick: () => {
              /* showcase only */
            },
          }}
        />
      </VarBlock>

      <VarBlock label="Icon + Heading, No CTA">
        <EmptyState icon={Search} heading={t.emptySearchHeading} description={t.emptySearchDesc} />
      </VarBlock>

      <VarBlock label="Different Context — FaxBridge">
        <EmptyState
          icon={FolderOpen}
          heading={t.emptyFaxHeading}
          description={t.emptyFaxDesc}
          action={{
            label: t.emptyFaxCta,
            onClick: () => {
              /* showcase only */
            },
          }}
        />
      </VarBlock>
    </SectionWrapper>
  )
}
