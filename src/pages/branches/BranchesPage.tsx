import { List, Map as MapIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BranchesTable } from '@/features/branches'
import { PageHeader } from '@/layout'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib/utils'

const BranchesPage = () => {
  const navigate = useNavigate()

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
      </PageHeader>

      <div className="max-w-300 mx-auto w-full px-7 py-7">
        <div className="mb-6">
          <h1 className="text-[24px] font-bold tracking-[-0.025em] text-stone-900 dark:text-white">
            Филиалы
          </h1>
        </div>
        <BranchesTable />
      </div>
    </div>
  )
}

export default BranchesPage
