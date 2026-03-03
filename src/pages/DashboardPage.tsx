import {
  Users,
  Package,
  Truck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PageHeader } from '@/components/layout/PageHeader'
import { cn } from '@/lib/utils'

// -- Mock data --

const stats = [
  {
    title: 'Пользователи',
    value: '2,847',
    change: '+12.5%',
    trend: 'up' as const,
    icon: Users,
    description: 'за последний месяц',
  },
  {
    title: 'Активные заказы',
    value: '184',
    change: '+8.2%',
    trend: 'up' as const,
    icon: Package,
    description: 'ожидают выдачи',
  },
  {
    title: 'В пути',
    value: '1,293',
    change: '-3.1%',
    trend: 'down' as const,
    icon: Truck,
    description: 'посылок из Китая',
  },
  {
    title: 'Выручка',
    value: '₸4.2M',
    change: '+18.7%',
    trend: 'up' as const,
    icon: DollarSign,
    description: 'за текущий месяц',
  },
]

const chartData = [
  { date: 'Пн', orders: 32, revenue: 128000 },
  { date: 'Вт', orders: 45, revenue: 180000 },
  { date: 'Ср', orders: 38, revenue: 152000 },
  { date: 'Чт', orders: 52, revenue: 208000 },
  { date: 'Пт', orders: 61, revenue: 244000 },
  { date: 'Сб', orders: 28, revenue: 112000 },
  { date: 'Вс', orders: 19, revenue: 76000 },
]

const recentOrders = [
  {
    id: 'ORD-001',
    user: 'Алмаз Байдилдаев',
    code: 'AN0042',
    items: 3,
    weight: '2.4 кг',
    price: '3,600 сом',
    status: 'PENDING_PICKUP',
    date: '2026-03-03',
  },
  {
    id: 'ORD-002',
    user: 'Айгерим Токтосунова',
    code: 'AN0108',
    items: 1,
    weight: '0.8 кг',
    price: '1,200 сом',
    status: 'DELIVERED',
    date: '2026-03-02',
  },
  {
    id: 'ORD-003',
    user: 'Бакыт Исмаилов',
    code: 'BK0015',
    items: 5,
    weight: '4.1 кг',
    price: '6,150 сом',
    status: 'PENDING_PICKUP',
    date: '2026-03-02',
  },
  {
    id: 'ORD-004',
    user: 'Нурай Касымова',
    code: 'AN0221',
    items: 2,
    weight: '1.6 кг',
    price: '2,400 сом',
    status: 'DELIVERED',
    date: '2026-03-01',
  },
  {
    id: 'ORD-005',
    user: 'Эрлан Жумабеков',
    code: 'BK0087',
    items: 7,
    weight: '5.9 кг',
    price: '8,850 сом',
    status: 'PENDING_PICKUP',
    date: '2026-03-01',
  },
]

const recentActivity = [
  { action: 'Импорт CN завершён', detail: '142 посылки обработаны', time: '5 мин назад' },
  { action: 'Новый пользователь', detail: 'Данияр Асанов (AN0312)', time: '12 мин назад' },
  { action: 'Заказ доставлен', detail: 'ORD-002 — Айгерим Токтосунова', time: '28 мин назад' },
  { action: 'Push-уведомление', detail: 'Broadcast: 847 получателей', time: '1 час назад' },
  { action: 'Менеджер добавлен', detail: 'Аскар Сыдыков — филиал Бишкек', time: '2 часа назад' },
]

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'text-xs font-medium',
        status === 'DELIVERED'
          ? 'bg-primary/10 text-primary'
          : 'bg-chart-4/15 text-chart-4'
      )}
    >
      {status === 'DELIVERED' ? 'Доставлен' : 'Ожидает выдачи'}
    </Badge>
  )
}

function CustomTooltipContent({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-card px-3 py-2 shadow-md">
      <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">
        {payload[0].value} заказов
      </p>
    </div>
  )
}

export function DashboardPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Dashboard"
        description="Обзор ключевых метрик и последних операций"
      />

      <div className="flex flex-col gap-6 p-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground tracking-tight">
                        {stat.value}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="size-3.5 text-primary" />
                    ) : (
                      <TrendingDown className="size-3.5 text-destructive" />
                    )}
                    <span
                      className={cn(
                        'text-xs font-medium',
                        stat.trend === 'up'
                          ? 'text-primary'
                          : 'text-destructive'
                      )}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {stat.description}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Chart + Activity */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {/* Orders Chart */}
          <Card className="xl:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">
                  Заказы за неделю
                </CardTitle>
                <span className="text-xs text-muted-foreground">
                  24 Фев - 2 Мар
                </span>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="ordersGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="oklch(0.55 0.17 145)"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="100%"
                          stopColor="oklch(0.55 0.17 145)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'oklch(0.50 0.01 120)' }}
                      dy={8}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'oklch(0.50 0.01 120)' }}
                      dx={-8}
                    />
                    <Tooltip content={<CustomTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="orders"
                      stroke="oklch(0.55 0.17 145)"
                      strokeWidth={2}
                      fill="url(#ordersGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Последние действия
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="relative flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {i < recentActivity.length - 1 && (
                        <div className="mt-1 flex-1 w-px bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-1">
                      <p className="text-sm font-medium text-foreground leading-tight">
                        {item.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.detail}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground/60">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders Table */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Последние заказы
              </CardTitle>
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                Все заказы
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">ID</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Код</TableHead>
                  <TableHead className="text-center">Товары</TableHead>
                  <TableHead>Вес</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="pr-6">Дата</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="pl-6 font-medium text-foreground">
                      {order.id}
                    </TableCell>
                    <TableCell>{order.user}</TableCell>
                    <TableCell>
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                        {order.code}
                      </code>
                    </TableCell>
                    <TableCell className="text-center">{order.items}</TableCell>
                    <TableCell>{order.weight}</TableCell>
                    <TableCell className="font-medium">{order.price}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="pr-6 text-muted-foreground">
                      {order.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
