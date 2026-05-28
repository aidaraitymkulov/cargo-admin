import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useGetBranchesQuery } from '@/api/admin/branches'
import { BranchFormDialog } from '@/components/forms/branches'
import { PageHeader } from '@/components/layout'
import { BranchesTable } from '@/components/tables'
import { Button } from '@/components/ui'
import type { Branch } from '@/types/entities/branches'

const BranchesPage = () => {
  const [editBranch, setEditBranch] = useState<Branch | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  const { data, isLoading, isError } = useGetBranchesQuery()

  const openCreate = () => {
    setEditBranch(null)
    setFormOpen(true)
  }
  const openEdit = (b: Branch) => {
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

      {formOpen && <BranchFormDialog onClose={closeForm} branch={editBranch ?? undefined} />}
    </div>
  )
}

export default BranchesPage
