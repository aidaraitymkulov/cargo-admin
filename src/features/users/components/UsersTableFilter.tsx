import { Search } from 'lucide-react'
import { useGetMeQuery } from '@/features/auth'
import { useGetBranchesQuery } from '@/features/branches'
import { ROLE } from '@/shared/constants/enums'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { cn } from '@/shared/lib/utils'
import { Input } from '@/shared/ui'
import { useGetUserStatsQuery } from '../api/usersApi'
import {
  selectUsersBranchId,
  selectUsersSearch,
  setUsersBranchId,
  setUsersSearch,
} from '../store/usersFiltersSlice'

export const UsersTableFilter = () => {
  const dispatch = useAppDispatch()
  const search = useAppSelector(selectUsersSearch)
  const branchId = useAppSelector(selectUsersBranchId)

  const { data: me } = useGetMeQuery()
  const isSuperAdmin = me?.role === ROLE.SUPER_ADMIN

  const { data: branches } = useGetBranchesQuery(undefined, { skip: !isSuperAdmin })
  const { data: stats } = useGetUserStatsQuery()

  return (
    <>
      <div className="mb-6">
        <h1 className="text-[24px] font-bold tracking-[-0.025em] text-stone-900 dark:text-white">
          Пользователи
        </h1>
        {stats && (
          <p className="mt-1 text-[13px] text-stone-500 dark:text-white/50">
            {stats.total.toLocaleString('ru-RU')} клиентов
            {stats.newThisMonth > 0 && (
              <span className="ml-1.5 text-forest-700 dark:text-forest-400 font-semibold">
                · +{stats.newThisMonth} за этот месяц
              </span>
            )}
          </p>
        )}
      </div>

      <div className="mb-5 flex items-center gap-2.5 flex-wrap">
        <div className="relative">
          <Search
            size={15}
            strokeWidth={1.8}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-white/30 pointer-events-none"
          />
          <Input
            value={search}
            onChange={(e) => dispatch(setUsersSearch(e.target.value))}
            placeholder="Имя, фамилия или персональный код…"
            className="h-9 w-68 pl-9 rounded-xl"
          />
        </div>

        {isSuperAdmin && branches && branches.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => dispatch(setUsersBranchId('all'))}
              className={cn(
                'h-9 px-3.5 rounded-xl text-[12.5px] font-semibold font-mono transition-colors',
                branchId === 'all'
                  ? 'bg-forest-700 dark:bg-forest-600 text-white shadow-[0_2px_8px_-4px_rgba(14,56,38,.5)]'
                  : 'bg-white dark:bg-ink-800 text-stone-600 dark:text-white/55 border border-stone-200 dark:border-white/10 hover:border-forest-700/40 dark:hover:border-forest-400/40 hover:text-forest-700 dark:hover:text-forest-400',
              )}
            >
              Все
            </button>
            {branches.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => dispatch(setUsersBranchId(b.id))}
                className={cn(
                  'h-9 px-3.5 rounded-xl text-[12.5px] font-semibold font-mono transition-colors',
                  branchId === b.id
                    ? 'bg-forest-700 dark:bg-forest-600 text-white shadow-[0_2px_8px_-4px_rgba(14,56,38,.5)]'
                    : 'bg-white dark:bg-ink-800 text-stone-600 dark:text-white/55 border border-stone-200 dark:border-white/10 hover:border-forest-700/40 dark:hover:border-forest-400/40 hover:text-forest-700 dark:hover:text-forest-400',
                )}
              >
                {b.personalCodePrefix}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
