import { Download, Calendar } from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
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
  { date: '2026-02-25', newUsers: 8, deletedUsers: 1, totalUsers: 2831 },
  { date: '2026-02-26', newUsers: 12, deletedUsers: 0, totalUsers: 2843 },
  { date: '2026-02-27', newUsers: 5, deletedUsers: 2, totalUsers: 2846 },
  { date: '2026-02-28', newUsers: 15, deletedUsers: 1, totalUsers: 2860 },
  { date: '2026-03-01', newUsers: 9, deletedUsers: 0, totalUsers: 2869 },
  { date: '2026-03-02', newUsers: 7, deletedUsers: 3, totalUsers: 2873 },
  { date: '2026-03-03', newUsers: 4, deletedUsers: 0, totalUsers: 2877 },
]

const chartData = mockData.map((d) => ({
  date: d.date.slice(5),
  new: d.newUsers,
  total: d.totalUsers,
}))

function ChartTooltipContent({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-card px-3 py-2 shadow-md">
      <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-sm font-semibold text-foreground">
          {p.name === 'new' ? 'Новые' : 'Всего'}: {p.value}
        </p>
      ))}
    </div>
  )
}

export function UsersReportPage() {
  return (
    <div className="flex flex-col">
      <PageHeader title="Отчёт по пользователям" description="Статистика регистраций и удалений">
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
        {/* Summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Новых за неделю</p>
              <p className="text-2xl font-bold text-primary">+60</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Удалено за неделю</p>
              <p className="text-2xl font-bold text-destructive">-7</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Всего пользователей</p>
              <p className="text-2xl font-bold text-foreground">2,877</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Новые пользователи по дням</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'oklch(0.50 0.01 120)' }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'oklch(0.50 0.01 120)' }} dx={-8} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="new" stroke="oklch(0.55 0.17 145)" strokeWidth={2} dot={{ r: 4, fill: 'oklch(0.55 0.17 145)' }} />
                </LineChart>
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
                  <TableHead className="text-right">Новые</TableHead>
                  <TableHead className="text-right">Удалённые</TableHead>
                  <TableHead className="text-right pr-6">Всего</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="pl-6 font-medium text-foreground">{row.date}</TableCell>
                    <TableCell className="text-right text-primary font-medium">+{row.newUsers}</TableCell>
                    <TableCell className="text-right text-destructive font-medium">
                      {row.deletedUsers > 0 ? `-${row.deletedUsers}` : '0'}
                    </TableCell>
                    <TableCell className="text-right pr-6 font-medium">
                      {row.totalUsers.toLocaleString()}
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
