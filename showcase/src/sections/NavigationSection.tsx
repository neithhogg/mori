import { useState, type JSX } from 'react'
import { BottomTabBar, Sidebar } from '@mori/components/ui/navigation'
import type { TabItem, SidebarNavItem } from '@mori/components/ui/navigation'
import { Home, Calendar, Users, FileText, Settings, Bell } from 'lucide-react'
import { SectionWrapper } from '../components/SectionWrapper'
import { VarBlock } from '../components/VarBlock'

const SIDEBAR_ITEMS: SidebarNavItem[] = [
  { key: 'home', icon: Home, label: 'ホーム' },
  { key: 'shift', icon: Calendar, label: 'シフト管理' },
  { key: 'staff', icon: Users, label: 'スタッフ一覧' },
  { key: 'reports', icon: FileText, label: 'レポート' },
  { key: 'notifications', icon: Bell, label: '通知' },
  { key: 'settings', icon: Settings, label: '設定' },
]

const TAB_ITEMS: Omit<TabItem, 'isActive' | 'onClick'>[] = [
  { key: 'home', icon: Home, label: 'ホーム' },
  { key: 'shift', icon: Calendar, label: 'シフト' },
  { key: 'staff', icon: Users, label: 'スタッフ' },
  { key: 'settings', icon: Settings, label: '設定' },
]

export function NavigationSection(): JSX.Element {
  const [activeSidebar, setActiveSidebar] = useState('home')
  const [activeTab, setActiveTab] = useState('home')

  const sidebarItems = SIDEBAR_ITEMS.map((item) => ({
    ...item,
    isActive: item.key === activeSidebar,
    onClick: () => {
      setActiveSidebar(item.key)
    },
  }))

  const tabItems = TAB_ITEMS.map((item) => ({
    ...item,
    isActive: item.key === activeTab,
    onClick: () => {
      setActiveTab(item.key)
    },
  }))

  return (
    <SectionWrapper id="navigation" num="07" titleEn="Navigation" titleJa="ナビゲーション">
      <VarBlock label="Sidebar — Desktop (≥768px)">
        <div
          className="w-[240px] overflow-hidden rounded-xl"
          style={{ border: '1px solid var(--color-border)' }}
        >
          <Sidebar items={sidebarItems} />
        </div>
      </VarBlock>

      <VarBlock label="BottomTabBar — Mobile (≤768px)">
        {/* The BottomTabBar is normally position:fixed. We override it to relative
            so it renders inline within the showcase frame. */}
        <div
          className="relative overflow-hidden rounded-xl"
          style={{ border: '1px solid var(--color-border)' }}
        >
          <BottomTabBar items={tabItems} className="!relative !rounded-xl !border-t-0" />
        </div>
        <p className="mt-3 text-xs" style={{ color: 'var(--color-ink-tertiary)' }}>
          ※ 実際の使用時は画面下部に固定されます（position: fixed）
        </p>
      </VarBlock>
    </SectionWrapper>
  )
}
