import { useState } from 'react'
import { useTheme } from '@/shared/lib/hooks'
import { useGetDeliveredChartQuery } from '../api/dashboardApi'
import {
  ChartCardShell,
  ChartLoadingBody,
  DashboardAreaChart,
  getDateRange,
  type Range,
  toChartPoints,
} from './DashboardChartCard'

export function DeliveredChartCard() {
  const [range, setRange] = useState<Range>('30d')
  const { data, isLoading } = useGetDeliveredChartQuery(getDateRange(range))
  const { theme } = useTheme()
  const points = data ? toChartPoints(data) : []
  const total = data?.reduce((s, p) => s + p.count, 0) ?? 0

  return (
    <ChartCardShell
      title="Выдано"
      subtitle="Выданные товары"
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
          color="#1A6B3F"
          areaId="areaDelivered"
          label="Выдано"
          isDark={theme === 'dark'}
        />
      )}
    </ChartCardShell>
  )
}
