import { useEffect, useState, type JSX } from 'react'

const NAV_ITEMS = [
  { id: 'btn', num: '01', en: 'Button', ja: 'ボタン' },
  { id: 'input', num: '02', en: 'Input', ja: 'テキスト入力' },
  { id: 'card', num: '03', en: 'Card', ja: 'カード' },
  { id: 'badge', num: '04', en: 'Badge', ja: 'バッジ・タグ' },
  { id: 'skeleton', num: '05', en: 'Skeleton', ja: 'ローディング' },
  { id: 'dialog', num: '06', en: 'Dialog', ja: 'ダイアログ' },
  { id: 'navigation', num: '07', en: 'Navigation', ja: 'ナビゲーション' },
]

export function ShowcaseSidebar(): JSX.Element {
  const [activeId, setActiveId] = useState('btn')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id)
        })
      },
      { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <aside
      className="sticky top-0 h-screen w-[256px] shrink-0 flex flex-col overflow-y-auto"
      style={{
        background: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
        scrollbarWidth: 'none',
      }}
    >
      {/* Brand */}
      <div
        className="px-6 py-6"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ background: 'var(--color-brand)' }}
          >
            森
          </div>
          <div>
            <p
              className="text-sm font-semibold leading-none"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              Mori DS
            </p>
            <p className="mt-0.5 text-[0.625rem]" style={{ color: 'var(--color-ink-tertiary)' }}>
              v0.1.0 · Component Showcase
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 pt-5">
        <p
          className="px-3 pb-3 text-[0.625rem] font-semibold uppercase tracking-[0.14em]"
          style={{ color: 'var(--color-ink-tertiary)' }}
        >
          コンポーネント一覧
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150 no-underline"
              style={{
                background: isActive ? 'var(--color-brand-light)' : 'transparent',
                color: isActive ? 'var(--color-brand-dark)' : 'var(--color-ink-secondary)',
              }}
            >
              <span
                className="shrink-0 font-mono text-[0.625rem]"
                style={{
                  color: isActive ? 'var(--color-brand)' : 'var(--color-ink-tertiary)',
                }}
              >
                {item.num}
              </span>
              <span>
                <span className="block font-medium leading-none">{item.en}</span>
                <span
                  className="mt-0.5 block text-[0.625rem] leading-none"
                  style={{ color: isActive ? 'var(--color-brand)' : 'var(--color-ink-tertiary)' }}
                >
                  {item.ja}
                </span>
              </span>
            </a>
          )
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-6 py-4 text-[0.625rem]"
        style={{
          borderTop: '1px solid var(--color-border)',
          color: 'var(--color-ink-tertiary)',
        }}
      >
        自然・簡単・信頼
      </div>
    </aside>
  )
}
