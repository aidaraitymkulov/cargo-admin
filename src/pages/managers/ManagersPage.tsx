import { Plus, MoreHorizontal } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
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

const mockManagers = [
  { id: '1', firstName: 'Аскар', lastName: 'Сыдыков', login: 'askar.s', phone: '+996 555 00 11 22', branch: 'Бишкек (Анкара)', role: 'MANAGER' },
  { id: '2', firstName: 'Мирлан', lastName: 'Турдубаев', login: 'mirlan.t', phone: '+996 700 33 44 55', branch: 'Бишкек (Байтик)', role: 'MANAGER' },
  { id: '3', firstName: 'Админ', lastName: 'Карго', login: 'admin', phone: '+996 555 99 88 77', branch: '-', role: 'SUPER_ADMIN' },
]

export function ManagersPage() {
  return (
    <div className="flex flex-col">
      <PageHeader title="Менеджеры" description="Управление менеджерами системы">
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          Добавить менеджера
        </Button>
      </PageHeader>

      <div className="p-6">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">Имя</TableHead>
                  <TableHead>Логин</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Филиал</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead className="w-10 pr-6" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockManagers.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="pl-6 font-medium text-foreground">
                      {m.firstName} {m.lastName}
                    </TableCell>
                    <TableCell>
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                        {m.login}
                      </code>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{m.phone}</TableCell>
                    <TableCell className="text-muted-foreground">{m.branch}</TableCell>
                    <TableCell>
                      <Badge variant={m.role === 'SUPER_ADMIN' ? 'default' : 'secondary'} className="text-xs">
                        {m.role === 'SUPER_ADMIN' ? 'Супер-админ' : 'Менеджер'}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6">
                      <Button variant="ghost" size="icon-xs">
                        <MoreHorizontal className="size-4" />
                      </Button>
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
