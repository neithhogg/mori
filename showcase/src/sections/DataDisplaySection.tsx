import type { JSX } from 'react'
import { FileText, CheckCircle, Package } from 'lucide-react'
import { StatCard } from '@mori/components/ui/stat-card'
import { DataTable, type ColumnDef } from '@mori/components/ui/data-table'
import { ActivityTimeline, type TimelineEvent } from '@mori/components/ui/activity-timeline'
import { SectionWrapper } from '../components/SectionWrapper'
import { VarBlock } from '../components/VarBlock'
import { useT } from '../lib/useT'

interface StaffRow {
  name: string
  shift: string
  days: number
  status: string
}

const STAFF_DATA: StaffRow[] = [
  { name: '田中 花子', shift: '月・水・金', days: 3, status: '承認済' },
  { name: '鈴木 一郎', shift: '火・木', days: 2, status: '保留中' },
  { name: '山田 次郎', shift: '月〜金', days: 5, status: '承認済' },
  { name: '佐藤 美咲', shift: '土・日', days: 2, status: '承認済' },
]

const NOW = Date.now()
const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: '1',
    icon: <FileText size={14} />,
    description: 'FAXを受信しました — 鈴木商事株式会社',
    timestamp: new Date(NOW - 5 * 60 * 1000),
  },
  {
    id: '2',
    icon: <CheckCircle size={14} />,
    description: 'データを自動抽出しました（発注番号 #2041）',
    timestamp: new Date(NOW - 2 * 60 * 60 * 1000),
  },
  {
    id: '3',
    icon: <Package size={14} />,
    description: '発注書を承認しました — 山田工業',
    timestamp: new Date(NOW - 26 * 60 * 60 * 1000),
  },
]

export function DataDisplaySection(): JSX.Element {
  const t = useT()

  const columns: ColumnDef<StaffRow>[] = [
    { key: 'name', header: t.dataTableName, sortable: true },
    { key: 'shift', header: t.dataTableShift },
    { key: 'days', header: t.dataTableDays, sortable: true },
    { key: 'status', header: t.dataTableStatus },
  ]

  return (
    <SectionWrapper
      id="data-display"
      num="09"
      titleEn="Data Display"
      titleJa={t.sectionSubtitleDataDisplay}
    >
      {/* StatCard */}
      <VarBlock label="StatCard — KPI metrics">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            label={t.statCardShiftsLabel}
            value="12"
            delta={{ value: '+3', direction: 'up' }}
            format="count"
          />
          <StatCard
            label={t.statCardRevenueLabel}
            value="198,000"
            delta={{ value: '-5.2%', direction: 'down' }}
            format="currency"
          />
          <StatCard label={t.statCardFaxLabel} value="4" format="count" />
        </div>
      </VarBlock>

      {/* StatCard loading */}
      <VarBlock label="StatCard — isLoading skeleton">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard label="" value="" isLoading />
          <StatCard label="" value="" isLoading />
          <StatCard label="" value="" isLoading />
        </div>
      </VarBlock>

      {/* DataTable */}
      <VarBlock label="DataTable — sortable, sticky header">
        <DataTable columns={columns} data={STAFF_DATA} />
      </VarBlock>

      {/* DataTable empty */}
      <VarBlock label="DataTable — empty state">
        <DataTable columns={columns} data={[]} />
      </VarBlock>

      {/* DataTable loading */}
      <VarBlock label="DataTable — isLoading skeleton rows">
        <DataTable columns={columns} data={[]} isLoading skeletonRowCount={3} />
      </VarBlock>

      {/* ActivityTimeline */}
      <VarBlock label="ActivityTimeline — newest first">
        <div className="max-w-sm">
          <ActivityTimeline events={TIMELINE_EVENTS} />
        </div>
      </VarBlock>

      {/* ActivityTimeline loading */}
      <VarBlock label="ActivityTimeline — isLoading skeleton">
        <div className="max-w-sm">
          <ActivityTimeline events={[]} isLoading skeletonCount={3} />
        </div>
      </VarBlock>
    </SectionWrapper>
  )
}
