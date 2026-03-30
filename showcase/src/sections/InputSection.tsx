import type { JSX } from 'react'
import { Input } from '@mori/components/ui/input'
import { SectionWrapper } from '../components/SectionWrapper'
import { VarBlock } from '../components/VarBlock'

export function InputSection(): JSX.Element {
  return (
    <SectionWrapper id="input" num="02" titleEn="Input" titleJa="テキスト入力">
      <VarBlock label="Default">
        <div className="max-w-sm space-y-4">
          <Input label="店舗名" placeholder="例：青山店" />
          <Input placeholder="ラベルなし" />
        </div>
      </VarBlock>

      <VarBlock label="With Helper Text">
        <div className="max-w-sm">
          <Input
            label="メールアドレス"
            type="email"
            placeholder="example@example.com"
            helperText="ログインに使用するメールアドレスを入力してください。"
          />
        </div>
      </VarBlock>

      <VarBlock label="Error State">
        <div className="max-w-sm space-y-4">
          <Input
            label="電話番号"
            placeholder="090-0000-0000"
            error="正しい電話番号を入力してください。"
          />
          <Input
            label="パスワード"
            type="password"
            placeholder="8文字以上"
            error="パスワードは8文字以上で入力してください。"
            helperText="英数字と記号を組み合わせると安全です。"
          />
        </div>
      </VarBlock>

      <VarBlock label="Disabled">
        <div className="max-w-sm">
          <Input label="登録日" value="2024年3月1日" disabled readOnly />
        </div>
      </VarBlock>
    </SectionWrapper>
  )
}
