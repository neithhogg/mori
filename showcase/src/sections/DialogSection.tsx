import { useState, type JSX } from 'react'
import { Dialog } from '@mori/components/ui/dialog'
import { Button } from '@mori/components/ui/button'
import { SectionWrapper } from '../components/SectionWrapper'
import { VarBlock } from '../components/VarBlock'

// Static panel preview — renders the dialog panel visually without using the native <dialog>
// element or showModal(), so it fits inline in the showcase without modal behaviour.
function DialogPreview({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle?: string
  children?: React.ReactNode
  footer: React.ReactNode
}): JSX.Element {
  return (
    <div
      className="w-full max-w-sm rounded-xl"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div className="px-6 pt-6 pb-2">
        <p className="text-base font-semibold" style={{ color: 'var(--color-ink)' }}>
          {title}
        </p>
        {subtitle !== undefined && (
          <p className="mt-1 text-sm" style={{ color: 'var(--color-ink-secondary)' }}>
            {subtitle}
          </p>
        )}
      </div>
      <div
        className="px-6 py-4 text-sm leading-relaxed"
        style={{ color: 'var(--color-ink-secondary)' }}
      >
        {children}
      </div>
      <div className="flex justify-end gap-3 px-6 pt-2 pb-6">{footer}</div>
    </div>
  )
}

export function DialogSection(): JSX.Element {
  const [defaultOpen, setDefaultOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [destructiveOpen, setDestructiveOpen] = useState(false)
  const [loadingOpen, setLoadingOpen] = useState(false)

  return (
    <SectionWrapper id="dialog" num="06" titleEn="Dialog" titleJa="ダイアログ">
      <VarBlock label="default — Custom Footer">
        <div className="flex flex-wrap items-start gap-6">
          <DialogPreview
            title="シフトを編集"
            subtitle="2024年3月15日（金）の変更内容を確認してください。"
            footer={
              <>
                <Button variant="secondary" size="sm">
                  キャンセル
                </Button>
                <Button size="sm">保存する</Button>
              </>
            }
          >
            編集内容がここに表示されます。
          </DialogPreview>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDefaultOpen(true)
              }}
            >
              ライブデモを開く →
            </Button>
          </div>
        </div>
        <Dialog
          open={defaultOpen}
          onClose={() => {
            setDefaultOpen(false)
          }}
          title="シフトを編集"
          subtitle="2024年3月15日（金）の変更内容を確認してください。"
          footer={
            <Button
              onClick={() => {
                setDefaultOpen(false)
              }}
            >
              保存する
            </Button>
          }
        >
          <p>編集フォームの内容がここに入ります。</p>
        </Dialog>
      </VarBlock>

      <VarBlock label="confirm — キャンセル + アクション">
        <div className="flex flex-wrap items-start gap-6">
          <DialogPreview
            title="変更を保存しますか？"
            footer={
              <>
                <Button variant="secondary" size="sm">
                  キャンセル
                </Button>
                <Button size="sm">保存する</Button>
              </>
            }
          >
            保存されていない変更があります。このまま続けると変更が失われます。
          </DialogPreview>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setConfirmOpen(true)
              }}
            >
              ライブデモを開く →
            </Button>
          </div>
        </div>
        <Dialog
          open={confirmOpen}
          onClose={() => {
            setConfirmOpen(false)
          }}
          variant="confirm"
          title="変更を保存しますか？"
          actionLabel="保存する"
          onAction={() => {
            setConfirmOpen(false)
          }}
        >
          保存されていない変更があります。このまま続けると変更が失われます。
        </Dialog>
      </VarBlock>

      <VarBlock label="confirm + destructive — 取り消し不能な操作">
        <div className="flex flex-wrap items-start gap-6">
          <DialogPreview
            title="スタッフを削除"
            footer={
              <>
                <Button variant="secondary" size="sm">
                  キャンセル
                </Button>
                <Button variant="destructive" size="sm">
                  削除する
                </Button>
              </>
            }
          >
            <p className="mb-2 font-medium" style={{ color: 'var(--color-ink)' }}>
              この操作は取り消せません。
            </p>
            田中 花子 さんのアカウントと全データが完全に削除されます。
          </DialogPreview>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDestructiveOpen(true)
              }}
            >
              ライブデモを開く →
            </Button>
          </div>
        </div>
        <Dialog
          open={destructiveOpen}
          onClose={() => {
            setDestructiveOpen(false)
          }}
          variant="confirm"
          title="スタッフを削除"
          actionLabel="削除する"
          destructive
          onAction={() => {
            setDestructiveOpen(false)
          }}
        >
          田中 花子 さんのアカウントと全データが完全に削除されます。
        </Dialog>
      </VarBlock>

      <VarBlock label="isLoading — 処理中の状態">
        <div className="flex flex-wrap items-start gap-6">
          <DialogPreview
            title="請求情報を更新中"
            footer={
              <>
                <Button variant="secondary" size="sm" disabled>
                  キャンセル
                </Button>
                <Button isLoading size="sm">
                  更新する
                </Button>
              </>
            }
          >
            クレジットカード情報を処理しています。しばらくお待ちください。
          </DialogPreview>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setLoadingOpen(true)
              }}
            >
              ライブデモを開く →
            </Button>
          </div>
        </div>
        <Dialog
          open={loadingOpen}
          onClose={() => {
            setLoadingOpen(false)
          }}
          variant="confirm"
          title="請求情報を更新中"
          actionLabel="更新する"
          isLoading
          onAction={() => {
            setLoadingOpen(false)
          }}
        >
          クレジットカード情報を処理しています。しばらくお待ちください。
        </Dialog>
      </VarBlock>
    </SectionWrapper>
  )
}
