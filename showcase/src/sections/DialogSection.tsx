import { useState, type JSX } from 'react'
import { Dialog } from '@mori/components/ui/dialog'
import { Button } from '@mori/components/ui/button'
import { SectionWrapper } from '../components/SectionWrapper'
import { VarBlock } from '../components/VarBlock'
import { useT } from '../lib/useT'

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
  const t = useT()
  const [defaultOpen, setDefaultOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [destructiveOpen, setDestructiveOpen] = useState(false)
  const [loadingOpen, setLoadingOpen] = useState(false)

  return (
    <SectionWrapper id="dialog" num="06" titleEn="Dialog" titleJa={t.sectionSubtitleDialog}>
      <VarBlock label="default — Custom Footer">
        <div className="flex flex-wrap items-start gap-6">
          <DialogPreview
            title={t.dialogDefaultTitle}
            subtitle={t.dialogDefaultSubtitle}
            footer={
              <>
                <Button variant="secondary" size="sm">
                  {t.dialogCancel}
                </Button>
                <Button size="sm">{t.dialogSave}</Button>
              </>
            }
          >
            {t.dialogDefaultBody}
          </DialogPreview>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDefaultOpen(true)
              }}
            >
              {t.dialogLiveDemo}
            </Button>
          </div>
        </div>
        <Dialog
          open={defaultOpen}
          onClose={() => {
            setDefaultOpen(false)
          }}
          title={t.dialogDefaultTitle}
          subtitle={t.dialogDefaultSubtitle}
          footer={
            <Button
              onClick={() => {
                setDefaultOpen(false)
              }}
            >
              {t.dialogSave}
            </Button>
          }
        >
          <p>{t.dialogDefaultBody}</p>
        </Dialog>
      </VarBlock>

      <VarBlock label={`confirm — ${t.dialogCancel} + action`}>
        <div className="flex flex-wrap items-start gap-6">
          <DialogPreview
            title={t.dialogConfirmTitle}
            footer={
              <>
                <Button variant="secondary" size="sm">
                  {t.dialogCancel}
                </Button>
                <Button size="sm">{t.dialogSave}</Button>
              </>
            }
          >
            {t.dialogConfirmBody}
          </DialogPreview>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setConfirmOpen(true)
              }}
            >
              {t.dialogLiveDemo}
            </Button>
          </div>
        </div>
        <Dialog
          open={confirmOpen}
          onClose={() => {
            setConfirmOpen(false)
          }}
          variant="confirm"
          title={t.dialogConfirmTitle}
          actionLabel={t.dialogSave}
          onAction={() => {
            setConfirmOpen(false)
          }}
        >
          {t.dialogConfirmBody}
        </Dialog>
      </VarBlock>

      <VarBlock label="confirm + destructive">
        <div className="flex flex-wrap items-start gap-6">
          <DialogPreview
            title={t.dialogDestructiveTitle}
            footer={
              <>
                <Button variant="secondary" size="sm">
                  {t.dialogCancel}
                </Button>
                <Button variant="destructive" size="sm">
                  {t.dialogDelete}
                </Button>
              </>
            }
          >
            <p className="mb-2 font-medium" style={{ color: 'var(--color-ink)' }}>
              {t.dialogDestructiveWarning}
            </p>
            {t.dialogDestructiveBody}
          </DialogPreview>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDestructiveOpen(true)
              }}
            >
              {t.dialogLiveDemo}
            </Button>
          </div>
        </div>
        <Dialog
          open={destructiveOpen}
          onClose={() => {
            setDestructiveOpen(false)
          }}
          variant="confirm"
          title={t.dialogDestructiveTitle}
          actionLabel={t.dialogDelete}
          destructive
          onAction={() => {
            setDestructiveOpen(false)
          }}
        >
          {t.dialogDestructiveBody}
        </Dialog>
      </VarBlock>

      <VarBlock label="isLoading">
        <div className="flex flex-wrap items-start gap-6">
          <DialogPreview
            title={t.dialogLoadingTitle}
            footer={
              <>
                <Button variant="secondary" size="sm" disabled>
                  {t.dialogCancel}
                </Button>
                <Button isLoading size="sm">
                  {t.dialogUpdate}
                </Button>
              </>
            }
          >
            {t.dialogLoadingBody}
          </DialogPreview>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setLoadingOpen(true)
              }}
            >
              {t.dialogLiveDemo}
            </Button>
          </div>
        </div>
        <Dialog
          open={loadingOpen}
          onClose={() => {
            setLoadingOpen(false)
          }}
          variant="confirm"
          title={t.dialogLoadingTitle}
          actionLabel={t.dialogUpdate}
          isLoading
          onAction={() => {
            setLoadingOpen(false)
          }}
        >
          {t.dialogLoadingBody}
        </Dialog>
      </VarBlock>
    </SectionWrapper>
  )
}
