import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useGetDeliveredDailyQuery } from '@/api/admin/orders/ordersApi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components'

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
      <p className="text-sm font-semibold text-foreground">{payload[0].value} выдано</p>
    </div>
  )
}

const formatDate = (dateStr: string) => {
  const [, month, day] = dateStr.split('-')
  return `${day}.${month}`
}

export const OrdersChart = () => {
  const { data = [], isLoading } = useGetDeliveredDailyQuery()

  const chartData = data.map((item) => ({
    date: formatDate(item.date),
    count: item.count,
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Выданные посылки за 7 дней</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        {isLoading ? (
          <div className="h-60 w-full animate-pulse rounded bg-muted" />
        ) : (
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
                  dataKey="count"
                  stroke="oklch(0.55 0.17 145)"
                  strokeWidth={2}
                  fill="url(#ordersGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
