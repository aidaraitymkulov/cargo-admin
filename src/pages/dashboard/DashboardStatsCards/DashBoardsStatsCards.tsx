import { Truck, Users } from 'lucide-react'
import { useGetProductStatsQuery } from '@/api/admin/products/productsApi'
import { useGetUserStatsQuery } from '@/api/admin/users/usersApi'
import { StatsCard } from './StatsCard'

export const DashboardStatsCards = () => {
  const { data: userStats, isLoading: usersLoading } = useGetUserStatsQuery()
  const { data: productStats, isLoading: productsLoading } = useGetProductStatsQuery()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Пользователи"
        value={String(userStats?.total)}
        icon={Users}
        isLoading={usersLoading}
      />
      <StatsCard
        title="В пути"
        value={String(productStats?.count)}
        icon={Truck}
        isLoading={productsLoading}
      />
    </div>
  )
}
