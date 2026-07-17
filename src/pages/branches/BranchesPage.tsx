import { List, Map as MapIcon, Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetBranchesQuery } from '@/api/admin/branches'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { ROUTES } from '@/config'
import { cn } from '@/lib/utils'
import type { Branch } from '@/types/entities/branches'
import { BranchesTable } from './BranchesTable'
import { BranchCreateForm } from './forms/BranchCreateForm'

const BranchesPage = () => {
  const navigate = useNavigate()
  const [formOpen, setFormOpen] = useState(false)

  const { data, isLoading, isError } = useGetBranchesQuery()

  const openCreate = () => setFormOpen(true)
  const closeForm = () => setFormOpen(false)

  const openOnMap = (b: Branch) => navigate(ROUTES.BRANCHES.MAP_FOCUS(b.id))
  const handleCreated = (b: Branch) => navigate(ROUTES.BRANCHES.MAP_FOCUS(b.id))

  return (
    <div className="flex flex-col">
      <PageHeader title="Филиалы">
        <div className="flex items-center p-0.5 rounded-lg bg-stone-100 dark:bg-white/6">
          <button
            type="button"
            className="h-8 px-3 rounded-md text-[12.5px] font-semibold flex items-center gap-1.5 bg-white text-stone-900 shadow-sm dark:bg-ink-800 dark:text-white"
          >
            <List size={14} strokeWidth={2} /> Список
          </button>
          <button
            type="button"
            onClick={() => navigate(ROUTES.BRANCHES.MAP)}
            className={cn(
              'h-8 px-3 rounded-md text-[12.5px] font-semibold flex items-center gap-1.5 transition-colors',
              'text-stone-500 hover:text-stone-800 dark:text-white/50 dark:hover:text-white',
            )}
          >
            <MapIcon size={14} strokeWidth={2} /> Карта
          </button>
        </div>
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
          onOpenOnMap={openOnMap}
        />
      </div>

      {formOpen && <BranchCreateForm onClose={closeForm} onCreated={handleCreated} />}
    </div>
  )
}

export default BranchesPage
