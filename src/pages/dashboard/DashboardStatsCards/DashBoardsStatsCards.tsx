import { DollarSign, Package, Truck, Users } from 'lucide-react'
import { useGetOrderRevenueQuery, useGetOrderStatsQuery } from '@/api/admin/orders/ordersApi'
import { useGetProductStatsQuery } from '@/api/admin/products/productsApi'
import { useGetUserStatsQuery } from '@/api/admin/users/usersApi'
import { StatsCard } from './StatsCard'

export const DashboardStatsCards = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  const { data: userStats, isLoading: usersLoading } = useGetUserStatsQuery()
  const { data: orderStats, isLoading: ordersLoading } = useGetOrderStatsQuery()
  const { data: productStats, isLoading: productsLoading } = useGetProductStatsQuery()
  const { data: revenueStats, isLoading: revenueLoading } = useGetOrderRevenueQuery({ year, month })

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Пользователи"
        value={String(userStats?.total)}
        icon={Users}
        isLoading={usersLoading}
      />
      <StatsCard
        title="Ожидают выдачи"
        value={String(orderStats?.count)}
        icon={Package}
        isLoading={ordersLoading}
      />
      <StatsCard
        title="В пути"
        value={String(productStats?.count)}
        icon={Truck}
        isLoading={productsLoading}
      />
      <StatsCard
        title="Выручка"
        value={`${revenueStats?.revenue} сом`}
        icon={DollarSign}
        isLoading={revenueLoading}
      />
    </div>
  )
}
