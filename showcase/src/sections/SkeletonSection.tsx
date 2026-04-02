import type { JSX } from 'react'
import { Skeleton } from '@mori/components/ui/skeleton'
import { SectionWrapper } from '../components/SectionWrapper'
import { VarBlock } from '../components/VarBlock'
import { useT } from '../lib/useT'

export function SkeletonSection(): JSX.Element {
  const t = useT()

  return (
    <SectionWrapper id="skeleton" num="05" titleEn="Skeleton" titleJa={t.sectionSubtitleSkeleton}>
      <VarBlock label="Sizes">
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </VarBlock>

      <VarBlock label={t.skeletonCardLabel}>
        <div className="max-w-sm space-y-4">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3.5 w-1/2" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </VarBlock>

      <VarBlock label="List Skeleton">
        <div className="space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg px-4 py-3"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-36" />
              </div>
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
          ))}
        </div>
      </VarBlock>
    </SectionWrapper>
  )
}
