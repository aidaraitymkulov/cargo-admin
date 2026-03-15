import { DollarSign, type LucideIcon, Package, Truck, Users } from 'lucide-react'
import { useGetUserStatsQuery } from '@/api/admin/users/usersApi'
import { StatsCard } from './StatsCard'

interface StatItem {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: LucideIcon
  description: string
}

const mockStats: StatItem[] = [
  {
    title: 'Активные заказы',
    value: '184',
    change: '+8.2%',
    trend: 'up',
    icon: Package,
    description: 'ожидают выдачи',
  },
  {
    title: 'В пути',
    value: '1,293',
    change: '-3.1%',
    trend: 'down',
    icon: Truck,
    description: 'посылок из Китая',
  },
  {
    title: 'Выручка',
    value: '₸4.2M',
    change: '+18.7%',
    trend: 'up',
    icon: DollarSign,
    description: 'за текущий месяц',
  },
]

export const DashboardStatsCards = () => {
  const { data: userStats, isLoading: usersLoading } = useGetUserStatsQuery({})

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Пользователи"
        value={userStats ? String(userStats.total) : '—'}
        change={userStats ? `+${userStats.newThisMonth}` : '—'}
        trend="up"
        icon={Users}
        description="новых за месяц"
        isLoading={usersLoading}
      />
      {mockStats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
