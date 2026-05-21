import { AlertCircle, Loader2, Pencil, Plus } from 'lucide-react'
import { useState } from 'react'
import { useGetBranchesQuery } from '@/api/admin/branches/branchesApi'
import { BranchFormDialog } from '@/components/forms/branches'
import { PageHeader } from '@/components/layout'
import {
  Badge,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { cn } from '@/lib'
import type { Branch } from '@/types/entities/branches'

const BranchesPage = () => {
  const [editBranch, setEditBranch] = useState<Branch | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const { data, isLoading, isError } = useGetBranchesQuery()

  const openCreate = () => {
    setEditBranch(null)
    setFormOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditBranch(null)
  }

  return (
    <div className="flex flex-col">
      <PageHeader title="Филиалы" description="Управление филиалами AdesExpress">
        <Button size="sm" className="gap-1.5" onClick={openCreate}>
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
                  <TableHead>Статус</TableHead>
                  <TableHead className="w-10 pr-6" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-10">
                      <div className="flex justify-center">
                        <Loader2 className="size-10 animate-spin text-muted-foreground" />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {isError && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-10">
                      <div className="flex flex-col items-center gap-2 text-destructive">
                        <AlertCircle className="size-10" />
                        <p className="text-sm">Не удалось загрузить филиалы</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {data?.map((branch) => (
                  <TableRow key={branch.id}>
                    <TableCell className="pl-6">
                      <code className="rounded bg-muted px-2 py-0.5 text-sm font-mono font-bold">
                        {branch.personalCodePrefix}
                      </code>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{branch.address}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(
                          'text-xs font-medium',
                          branch.isActive
                            ? 'bg-primary/10 text-primary'
                            : 'bg-muted text-muted-foreground',
                        )}
                      >
                        {branch.isActive ? 'Активен' : 'Отключён'}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => {
                          setEditBranch(branch)
                          setFormOpen(true)
                        }}
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {formOpen && <BranchFormDialog onClose={closeForm} branch={editBranch ?? undefined} />}
    </div>
  )
}

export default BranchesPage
