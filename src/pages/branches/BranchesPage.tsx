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
import { cn } from '@/lib/utils'

const mockBranches = [
  { id: '1', address: 'г. Бишкек, Анкара-10', prefix: 'AN', isActive: true, nextSeq: 313, createdAt: '2024-06-01' },
  { id: '2', address: 'г. Бишкек, Байтик Баатыра 1/2', prefix: 'BK', isActive: true, nextSeq: 88, createdAt: '2024-08-15' },
  { id: '3', address: 'г. Ош, Масалиева 27', prefix: 'OS', isActive: false, nextSeq: 42, createdAt: '2025-01-20' },
]

export function BranchesPage() {
  return (
    <div className="flex flex-col">
      <PageHeader title="Филиалы" description="Управление филиалами AdesExpress">
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          Добавить филиал
        </Button>
      </PageHeader>

      <div className="p-6">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">Префикс</TableHead>
                  <TableHead>Адрес</TableHead>
                  <TableHead className="text-center">Следующий код</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Создан</TableHead>
                  <TableHead className="w-10 pr-6" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBranches.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="pl-6">
                      <code className="rounded bg-muted px-2 py-0.5 text-sm font-mono font-bold">
                        {b.prefix}
                      </code>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{b.address}</TableCell>
                    <TableCell className="text-center text-muted-foreground">{b.nextSeq}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(
                          'text-xs font-medium',
                          b.isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {b.isActive ? 'Активен' : 'Отключён'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{b.createdAt}</TableCell>
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
