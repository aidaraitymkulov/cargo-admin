import { PageHeader } from '@/components/layout/PageHeader'
import { DashboardStatsCards } from './DashboardStatsCards'
import { OrdersChart } from './OrdersChart'

const DashboardPage = () => {
  return (
    <div className="flex flex-col">
      <PageHeader title="Dashboard" description="Обзор ключевых метрик и последних операций" />

      <div className="flex flex-col gap-6 p-6">
        <DashboardStatsCards />
        <OrdersChart />
      </div>
    </div>
  )
}

export default DashboardPage
