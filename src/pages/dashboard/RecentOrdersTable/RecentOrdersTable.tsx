import { ArrowRight } from 'lucide-react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatusBadge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'

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

export const RecentOrdersTable = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Последние заказы</CardTitle>
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
                <TableCell className="pl-6 font-medium text-foreground">{order.id}</TableCell>
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
                <TableCell className="pr-6 text-muted-foreground">{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
