import { PageHeader } from '@/components'
import { DashboardStatsCards } from './DashboardStatsCards'
import { OrdersChart } from './OrdersChart'
import { RecentActivity } from './RecentActivity'
import { RecentOrdersTable } from './RecentOrdersTable'

const DashboardPage = () => {
  return (
    <div className="flex flex-col">
      <PageHeader title="Dashboard" description="Обзор ключевых метрик и последних операций" />

      <div className="flex flex-col gap-6 p-6">
        <DashboardStatsCards />
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <OrdersChart />
          <RecentActivity />
        </div>
        <RecentOrdersTable />
      </div>
    </div>
  )
}

export default DashboardPage
