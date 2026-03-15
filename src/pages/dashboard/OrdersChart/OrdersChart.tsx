import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components'

const chartData = [
  { date: 'Пн', orders: 32 },
  { date: 'Вт', orders: 45 },
  { date: 'Ср', orders: 38 },
  { date: 'Чт', orders: 52 },
  { date: 'Пт', orders: 61 },
  { date: 'Сб', orders: 28 },
  { date: 'Вс', orders: 19 },
]

type TooltipPayload = { value: number }

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-card px-3 py-2 shadow-md">
      <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{payload[0].value} заказов</p>
    </div>
  )
}

export const OrdersChart = () => {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Заказы за неделю</CardTitle>
          <span className="text-xs text-muted-foreground">24 Фев - 2 Мар</span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.55 0.17 145)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.55 0.17 145)" stopOpacity={0} />
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
              <Tooltip content={<CustomTooltip />} />
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
  )
}
