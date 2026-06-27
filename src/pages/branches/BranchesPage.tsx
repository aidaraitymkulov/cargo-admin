import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useGetBranchesQuery } from '@/api/admin/branches'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import type { Branch } from '@/types/entities/branches'
import { BranchesTable } from './BranchesTable'
import { BranchFormDialog } from './BranchFormDialog'

type FormMode = 'create' | 'edit'

const BranchesPage = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<FormMode>('create')
  const [editBranch, setEditBranch] = useState<Branch | null>(null)

  const { data, isLoading, isError } = useGetBranchesQuery()

  const openCreate = () => {
    setFormMode('create')
    setFormOpen(true)
  }
  const openEdit = (b: Branch) => {
    setFormMode('edit')
    setEditBranch(b)
    setFormOpen(true)
  }
  const closeForm = () => {
    setFormOpen(false)
    setEditBranch(null)
  }

  return (
    <div className="flex flex-col">
      <PageHeader title="Филиалы">
        {data && data.length > 0 && (
          <Button variant="forest" className="rounded-lg" onClick={openCreate}>
            <Plus size={15} strokeWidth={2.5} />
            Добавить филиал
          </Button>
        )}
      </PageHeader>

      <div className="max-w-300 mx-auto w-full px-7 py-7">
        <div className="mb-6">
          <h1 className="text-[24px] font-bold tracking-[-0.025em] text-stone-900 dark:text-white">
            Филиалы
          </h1>
        </div>

        <BranchesTable
          branches={data ?? []}
          isLoading={isLoading}
          isError={isError}
          onAdd={openCreate}
          onEdit={openEdit}
        />
      </div>

      {formOpen && formMode === 'edit' && editBranch && (
        <BranchFormDialog mode="edit" branch={editBranch} onClose={closeForm} />
      )}
      {formOpen && formMode === 'create' && <BranchFormDialog mode="create" onClose={closeForm} />}
    </div>
  )
}

export default BranchesPage
