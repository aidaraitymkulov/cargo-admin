import { Search, Filter, MoreHorizontal } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

const mockUsers = [
  { id: '1', firstName: 'Алмаз', lastName: 'Байдилдаев', code: 'AN0042', phone: '+996 555 12 34 56', branch: 'Бишкек (Анкара)', status: 0, createdAt: '2025-11-15' },
  { id: '2', firstName: 'Айгерим', lastName: 'Токтосунова', code: 'AN0108', phone: '+996 700 98 76 54', branch: 'Бишкек (Анкара)', status: 0, createdAt: '2025-12-01' },
  { id: '3', firstName: 'Бакыт', lastName: 'Исмаилов', code: 'BK0015', phone: '+996 552 11 22 33', branch: 'Бишкек (Байтик)', status: 0, createdAt: '2026-01-10' },
  { id: '4', firstName: 'Нурай', lastName: 'Касымова', code: 'AN0221', phone: '+996 708 44 55 66', branch: 'Бишкек (Анкара)', status: 1, createdAt: '2026-01-20' },
  { id: '5', firstName: 'Эрлан', lastName: 'Жумабеков', code: 'BK0087', phone: '+996 559 77 88 99', branch: 'Бишкек (Байтик)', status: 0, createdAt: '2026-02-05' },
  { id: '6', firstName: 'Данияр', lastName: 'Асанов', code: 'AN0312', phone: '+996 701 22 33 44', branch: 'Бишкек (Анкара)', status: 3, createdAt: '2026-03-01' },
]

const statusMap: Record<number, { label: string; className: string }> = {
  0: { label: 'Активен', className: 'bg-primary/10 text-primary' },
  1: { label: 'Неактивен', className: 'bg-muted text-muted-foreground' },
  2: { label: 'Удалён', className: 'bg-destructive/10 text-destructive' },
  3: { label: 'Ожидает удаления', className: 'bg-chart-4/15 text-chart-4' },
}

export function UsersPage() {
  return (
    <div className="flex flex-col">
      <PageHeader title="Пользователи" description="Управление пользователями мобильного приложения">
        <Button variant="outline" size="sm" className="gap-1.5">
          <Filter className="size-3.5" />
          Фильтры
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-4 p-6">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Поиск по коду или имени..." className="pl-9" />
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">Код</TableHead>
                  <TableHead>Имя</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Филиал</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Регистрация</TableHead>
                  <TableHead className="w-10 pr-6" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => {
                  const st = statusMap[user.status]
                  return (
                    <TableRow key={user.id} className="cursor-pointer">
                      <TableCell className="pl-6">
                        <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-medium">
                          {user.code}
                        </code>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.phone}</TableCell>
                      <TableCell className="text-muted-foreground">{user.branch}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn('text-xs font-medium', st.className)}>
                          {st.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.createdAt}</TableCell>
                      <TableCell className="pr-6">
                        <Button variant="ghost" size="icon-xs">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
