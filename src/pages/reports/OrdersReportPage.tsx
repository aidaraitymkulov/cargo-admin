import { Download, Calendar } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const mockData = [
  { date: '2026-02-25', branch: 'Бишкек (Анкара)', orders: 28, weight: 42.5, price: 63750 },
  { date: '2026-02-26', branch: 'Бишкек (Анкара)', orders: 35, weight: 51.2, price: 76800 },
  { date: '2026-02-27', branch: 'Бишкек (Байтик)', orders: 18, weight: 29.8, price: 44700 },
  { date: '2026-02-28', branch: 'Бишкек (Анкара)', orders: 41, weight: 62.3, price: 93450 },
  { date: '2026-03-01', branch: 'Бишкек (Байтик)', orders: 22, weight: 35.1, price: 52650 },
  { date: '2026-03-02', branch: 'Бишкек (Анкара)', orders: 38, weight: 55.7, price: 83550 },
  { date: '2026-03-03', branch: 'Бишкек (Анкара)', orders: 15, weight: 22.4, price: 33600 },
]

const chartData = [
  { date: '25 Фев', orders: 28 },
  { date: '26 Фев', orders: 35 },
  { date: '27 Фев', orders: 18 },
  { date: '28 Фев', orders: 41 },
  { date: '1 Мар', orders: 22 },
  { date: '2 Мар', orders: 38 },
  { date: '3 Мар', orders: 15 },
]

function ChartTooltipContent({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-card px-3 py-2 shadow-md">
      <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{payload[0].value} заказов</p>
    </div>
  )
}

export function OrdersReportPage() {
  return (
    <div className="flex flex-col">
      <PageHeader title="Отчёт по заказам" description="Статистика заказов по периоду и филиалам">
        <Button variant="outline" size="sm" className="gap-1.5">
          <Calendar className="size-3.5" />
          Эта неделя
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="size-3.5" />
          Экспорт
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-6 p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Всего заказов</p>
              <p className="text-2xl font-bold text-foreground">197</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Общий вес</p>
              <p className="text-2xl font-bold text-foreground">299.0 кг</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Общая сумма</p>
              <p className="text-2xl font-bold text-foreground">448,500 сом</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Заказы по дням</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'oklch(0.50 0.01 120)' }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'oklch(0.50 0.01 120)' }} dx={-8} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="orders" fill="oklch(0.55 0.17 145)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">Дата</TableHead>
                  <TableHead>Филиал</TableHead>
                  <TableHead className="text-right">Заказы</TableHead>
                  <TableHead className="text-right">Вес (кг)</TableHead>
                  <TableHead className="text-right pr-6">Сумма (сом)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="pl-6 font-medium text-foreground">{row.date}</TableCell>
                    <TableCell className="text-muted-foreground">{row.branch}</TableCell>
                    <TableCell className="text-right">{row.orders}</TableCell>
                    <TableCell className="text-right">{row.weight}</TableCell>
                    <TableCell className="text-right pr-6 font-medium">
                      {row.price.toLocaleString()}
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
