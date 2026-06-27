import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useGetManagersQuery } from '@/api/admin/managers'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import type { Manager } from '@/types/entities/managers'
import { DeleteManagerDialog } from './DeleteManagerDialog'
import { ManagerFormDialog } from './ManagerFormDialog'
import { ManagersTable } from './ManagersTable'

const ManagersPage = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [editManager, setEditManager] = useState<Manager | null>(null)
  const [deleteManager, setDeleteManager] = useState<Manager | null>(null)

  const { data, isLoading, isError } = useGetManagersQuery()

  const openCreate = () => {
    setEditManager(null)
    setFormOpen(true)
  }
  const openEdit = (m: Manager) => {
    setEditManager(m)
    setFormOpen(true)
  }
  const closeForm = () => {
    setFormOpen(false)
    setEditManager(null)
  }

  return (
    <div className="flex flex-col">
      <PageHeader title="Менеджеры">
        {data && data.length > 0 && (
          <Button variant="forest" className="rounded-lg" onClick={openCreate}>
            <Plus size={15} strokeWidth={2.5} />
            Создать менеджера
          </Button>
        )}
      </PageHeader>

      <div className="max-w-300 mx-auto w-full px-7 py-7">
        <div className="mb-6">
          <h1 className="text-[24px] font-bold tracking-[-0.025em] text-stone-900 dark:text-white">
            Менеджеры
          </h1>
        </div>

        <ManagersTable
          managers={data ?? []}
          isLoading={isLoading}
          isError={isError}
          onAdd={openCreate}
          onEdit={openEdit}
          onDelete={setDeleteManager}
        />
      </div>

      {formOpen && <ManagerFormDialog onClose={closeForm} manager={editManager ?? undefined} />}
      {deleteManager && (
        <DeleteManagerDialog manager={deleteManager} onClose={() => setDeleteManager(null)} />
      )}
    </div>
  )
}

export default ManagersPage
