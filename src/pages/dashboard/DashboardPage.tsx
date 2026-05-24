import { PageHeader } from '@/components/layout/PageHeader'
import { DashboardStatsCards } from './DashboardStatsCards'

const DashboardPage = () => {
  return (
    <div className="flex flex-col">
      <PageHeader title="Dashboard" />

      <div className="flex flex-col gap-6 p-6">
        <DashboardStatsCards />
      </div>
    </div>
  )
}

export default DashboardPage
