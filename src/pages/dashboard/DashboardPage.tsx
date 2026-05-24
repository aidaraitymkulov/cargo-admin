import { PageHeader } from '@/components/layout/PageHeader'
import { DeliveredChartCard, UsersChartCard } from './DashboardCharts'
import { DashboardStatsCards } from './DashboardStatsCards'

const DashboardPage = () => {
  return (
    <div className="flex flex-col">
      <PageHeader title="Dashboard" />

      <div className="mx-auto w-full max-w-7xl px-7 py-7 flex flex-col gap-5">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.025em] text-stone-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-xs text-stone-500 dark:text-white/55">
            Обзор ключевых метрик и последних операций.
          </p>
        </div>
        <DashboardStatsCards />
        <UsersChartCard />
        <DeliveredChartCard />
      </div>
    </div>
  )
}

export default DashboardPage
