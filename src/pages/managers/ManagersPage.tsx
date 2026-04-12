import { AlertCircle, Loader2, Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useGetManagersQuery } from '@/api/admin/managers/managersApi'
import {
  Button,
  Card,
  CardContent,
  DeleteManagerDialog,
  ManagerFormDialog,
  PageHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'
import type { Manager } from '@/types'

const ManagersPage = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [editManager, setEditManager] = useState<Manager | null>(null)
  const [deleteManager, setDeleteManager] = useState<Manager | null>(null)

  const { data, isLoading, isError } = useGetManagersQuery()

  const openCreate = () => {
    setEditManager(null)
    setFormOpen(true)
  }

  const openEdit = (manager: Manager) => {
    setEditManager(manager)
    setFormOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditManager(null)
  }

  return (
    <div className="flex flex-col">
      <PageHeader title="Менеджеры" description="Управление менеджерами системы">
        <Button size="sm" className="gap-1.5" onClick={openCreate}>
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
                  <TableHead className="w-20 pr-6" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10">
                      <div className="flex justify-center">
                        <Loader2 className="size-10 animate-spin text-muted-foreground" />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {isError && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10">
                      <div className="flex flex-col items-center gap-2 text-destructive">
                        <AlertCircle className="size-10" />
                        <p className="text-sm">Не удалось загрузить менеджеров</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {data?.map((manager) => (
                  <TableRow key={manager.id}>
                    <TableCell className="pl-6 font-medium text-foreground">
                      {manager.firstName} {manager.lastName}
                    </TableCell>
                    <TableCell>
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                        {manager.login}
                      </code>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{manager.phone}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {manager.branch
                        ? `${manager.branch.address} (${manager.branch.personalCodePrefix})`
                        : '—'}
                    </TableCell>
                    <TableCell className="pr-6">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon-xs" onClick={() => openEdit(manager)}>
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteManager(manager)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {formOpen && <ManagerFormDialog onClose={closeForm} manager={editManager ?? undefined} />}
      {deleteManager && (
        <DeleteManagerDialog manager={deleteManager} onClose={() => setDeleteManager(null)} />
      )}
    </div>
  )
}

export default ManagersPage
