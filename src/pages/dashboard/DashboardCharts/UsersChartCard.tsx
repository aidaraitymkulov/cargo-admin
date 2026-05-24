import { useState } from 'react'
import { useGetUsersChartQuery } from '@/api/admin/dashboard'
import { useTheme } from '@/hooks/useTheme'
import {
  ChartCardShell,
  ChartLoadingBody,
  DashboardAreaChart,
  getDateRange,
  type Range,
  toChartPoints,
} from './DashboardChartCard'

export function UsersChartCard() {
  const [range, setRange] = useState<Range>('30d')
  const { data, isLoading } = useGetUsersChartQuery(getDateRange(range))
  const { theme } = useTheme()
  const points = data ? toChartPoints(data) : []
  const total = data?.reduce((s, p) => s + p.count, 0) ?? 0

  return (
    <ChartCardShell
      title="Новые пользователи"
      subtitle="за период"
      total={total}
      isLoading={isLoading}
      range={range}
      onRangeChange={setRange}
    >
      {isLoading ? (
        <ChartLoadingBody />
      ) : (
        <DashboardAreaChart
          data={points}
          color="#8B5CF6"
          areaId="areaUsers"
          label="Пользователи"
          isDark={theme === 'dark'}
        />
      )}
    </ChartCardShell>
  )
}
