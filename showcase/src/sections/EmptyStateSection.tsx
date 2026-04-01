import type { JSX } from 'react'
import { Inbox, Search, FolderOpen } from 'lucide-react'
import { EmptyState } from '@mori/components/ui/empty-state'
import { SectionWrapper } from '../components/SectionWrapper'
import { VarBlock } from '../components/VarBlock'

export function EmptyStateSection(): JSX.Element {
  return (
    <SectionWrapper id="empty-state" num="08" titleEn="Empty State" titleJa="空の状態">
      <VarBlock label="Heading Only">
        <EmptyState heading="まだデータがありません" />
      </VarBlock>

      <VarBlock label="Icon + Heading + Description + CTA">
        <EmptyState
          icon={Inbox}
          heading="まだシフトがありません"
          description="シフトを追加して、スタッフのスケジュールを管理しましょう。"
          action={{
            label: 'シフトを追加する',
            onClick: () => {
              /* showcase only */
            },
          }}
        />
      </VarBlock>

      <VarBlock label="Icon + Heading, No CTA">
        <EmptyState
          icon={Search}
          heading="検索結果がありません"
          description="別のキーワードでお試しください。"
        />
      </VarBlock>

      <VarBlock label="Different Context — FaxBridge">
        <EmptyState
          icon={FolderOpen}
          heading="まだFAXが届いていません"
          description="FAXが受信されると、ここに表示されます。"
          action={{
            label: '設定を確認する',
            onClick: () => {
              /* showcase only */
            },
          }}
        />
      </VarBlock>
    </SectionWrapper>
  )
}
