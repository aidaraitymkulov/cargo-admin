import { Clock, Globe, type LucideIcon, Truck, UsersRound, Wallet } from 'lucide-react'
import { useSelector } from 'react-redux'
import { authSelectors } from '@/api/admin/auth/authSelectors'
import { useGetDashboardSummaryQuery } from '@/api/admin/dashboard'
import { cn } from '@/lib/utils'
import type { DashboardSummary } from '@/types/dashboard'
import { ROLE } from '@/types/enums/role'
import { StatsCard } from './StatsCard'

const fmtNum = (n: number) => n.toLocaleString('ru-RU')

interface CardConfig {
  title: string
  icon: LucideIcon
  value: (d: DashboardSummary) => string
  suffix?: string
  badge?: (d: DashboardSummary) => number | undefined
  accentBg: string
  accentText: string
  adminOnly?: boolean
}

const CARDS: CardConfig[] = [
  {
    title: 'Всего пользователей',
    icon: UsersRound,
    value: (d) => fmtNum(d.totalUsers),
    badge: (d) => d.newUsersThisMonth,
    accentBg: 'bg-forest-50 dark:bg-forest-400/10',
    accentText: 'text-forest-700 dark:text-forest-400',
  },
  {
    title: 'В Китае',
    icon: Globe,
    value: (d) => fmtNum(d.productsInChina),
    suffix: 'товаров',
    accentBg: 'bg-orange-50 dark:bg-orange-400/10',
    accentText: 'text-orange-700 dark:text-orange-400',
  },
  {
    title: 'В пути',
    icon: Truck,
    value: (d) => fmtNum(d.productsOnTheWay),
    suffix: 'товаров',
    accentBg: 'bg-sky-50 dark:bg-sky-400/10',
    accentText: 'text-sky-700 dark:text-sky-400',
  },
  {
    title: 'Ожидают выдачи',
    icon: Clock,
    value: (d) => fmtNum(d.productsAwaitingPickup),
    suffix: 'товаров',
    accentBg: 'bg-amber-50 dark:bg-amber-400/10',
    accentText: 'text-amber-700 dark:text-amber-400',
  },
  {
    title: 'Выручка за неделю',
    icon: Wallet,
    value: (d) => (d.revenueThisWeek != null ? fmtNum(d.revenueThisWeek) : '—'),
    suffix: 'с',
    accentBg: 'bg-emerald-50 dark:bg-emerald-400/10',
    accentText: 'text-emerald-700 dark:text-emerald-400',
    adminOnly: true,
  },
]

export const DashboardStatsCards = () => {
  const user = useSelector(authSelectors.user)
  const isSuperAdmin = user?.role === ROLE.SUPER_ADMIN
  const { data, isLoading } = useGetDashboardSummaryQuery({})

  const cards = CARDS.filter((c) => !c.adminOnly || isSuperAdmin)

  return (
    <div
      className={cn(
        'grid grid-cols-2 md:grid-cols-3 gap-4',
        isSuperAdmin ? 'xl:grid-cols-5' : 'xl:grid-cols-4',
      )}
    >
      {cards.map((c) => (
        <StatsCard
          key={c.title}
          title={c.title}
          value={data ? c.value(data) : '—'}
          suffix={c.suffix}
          icon={c.icon}
          isLoading={isLoading}
          badge={data ? c.badge?.(data) : undefined}
          accentBg={c.accentBg}
          accentText={c.accentText}
        />
      ))}
    </div>
  )
}
