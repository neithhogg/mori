import { useEffect, useState, type JSX } from 'react'
import { LocaleSwitcher } from './LocaleSwitcher'
import { useT } from '../lib/useT'

const NAV_KEYS = [
  { id: 'btn',         num: '01', en: 'Button',      jaKey: 'sectionSubtitleButton'      },
  { id: 'input',       num: '02', en: 'Input',       jaKey: 'sectionSubtitleInput'       },
  { id: 'card',        num: '03', en: 'Card',        jaKey: 'sectionSubtitleCard'        },
  { id: 'badge',       num: '04', en: 'Badge',       jaKey: 'sectionSubtitleBadge'       },
  { id: 'skeleton',    num: '05', en: 'Skeleton',    jaKey: 'sectionSubtitleSkeleton'    },
  { id: 'dialog',      num: '06', en: 'Dialog',      jaKey: 'sectionSubtitleDialog'      },
  { id: 'navigation',  num: '07', en: 'Navigation',  jaKey: 'sectionSubtitleNavigation'  },
  { id: 'empty-state', num: '08', en: 'Empty State', jaKey: 'sectionSubtitleEmptyState'  },
] as const

export function ShowcaseSidebar(): JSX.Element {
  const t = useT()
  const [activeId, setActiveId] = useState('btn')

  useEffect(() => {
    // Keep track of which sections are currently intersecting
    const intersecting = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            intersecting.add(e.target.id)
          } else {
            intersecting.delete(e.target.id)
          }
        })

        // Out of all currently intersecting sections, find the one furthest down the page
        // by finding its index in NAV_KEYS.
        let activeIdx = -1
        NAV_KEYS.forEach((item, idx) => {
          if (intersecting.has(item.id)) {
            activeIdx = idx
          }
        })

        const activeItem = NAV_KEYS[activeIdx]
        if (activeItem) {
          setActiveId(activeItem.id)
        }
      },
      { threshold: 0.1, rootMargin: '-10% 0px -40% 0px' }
    )
    NAV_KEYS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <aside
      className="sticky top-0 flex h-screen w-[256px] shrink-0 flex-col overflow-y-auto"
      style={{
        background: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
        scrollbarWidth: 'none',
      }}
    >
      {/* Brand */}
      <div className="px-6 py-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ background: 'var(--color-brand)' }}
          >
            森
          </div>
          <div>
            <p
              className="text-sm leading-none font-semibold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              Mori DS
            </p>
            <p className="mt-0.5 text-[0.625rem]" style={{ color: 'var(--color-ink-tertiary)' }}>
              v0.1.0 · Component Showcase
            </p>
          </div>
        </div>

        {/* Locale switcher */}
        <div className="mt-4">
          <LocaleSwitcher />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 pt-5">
        <p
          className="px-3 pb-3 text-[0.625rem] font-semibold tracking-[0.14em] uppercase"
          style={{ color: 'var(--color-ink-tertiary)' }}
        >
          {t.sidebarComponentList}
        </p>
        {NAV_KEYS.map((item) => {
          const isActive = activeId === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm no-underline transition-colors duration-150"
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
                <span className="block leading-none font-medium">{item.en}</span>
                <span
                  className="mt-0.5 block text-[0.625rem] leading-none"
                  style={{ color: isActive ? 'var(--color-brand)' : 'var(--color-ink-tertiary)' }}
                >
                  {t[item.jaKey]}
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
        {t.sidebarTagline}
      </div>
    </aside>
  )
}
