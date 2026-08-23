import { AlertCircle, ChevronRight, Loader2, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGetMeQuery } from '@/features/auth'
import { ROUTES } from '@/shared/config'
import { ROLE } from '@/shared/constants/enums'
import { useAppDispatch, useAppSelector, useDebounce } from '@/shared/lib/hooks'
import { fmtDate } from '@/shared/lib/utils'
import {
  InitialsAvatar,
  PaginationControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui'
import { useGetUsersQuery } from '../api/usersApi'
import {
  selectUsersBranchId,
  selectUsersPage,
  selectUsersSearch,
  setUsersPage,
} from '../store/usersFiltersSlice'
import { UserStatusBadge } from './UserStatusBadge'

const HEAD_CLS =
  'text-[10.5px] font-semibold font-mono tracking-widest uppercase text-stone-400 dark:text-white/30 h-10.5'

const PAGE_SIZE = 20

export const UsersTable = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const search = useAppSelector(selectUsersSearch)
  const branchId = useAppSelector(selectUsersBranchId)
  const page = useAppSelector(selectUsersPage)
  const debouncedSearch = useDebounce(search, 300)

  const { data: me } = useGetMeQuery()
  const isSuperAdmin = me?.role === ROLE.SUPER_ADMIN

  const { data, isFetching, isError } = useGetUsersQuery({
    q: debouncedSearch || undefined,
    branchId: isSuperAdmin && branchId !== 'all' ? branchId : undefined,
    page,
    pageSize: PAGE_SIZE,
  })

  const users = data?.items ?? []
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1

  return (
    <>
      <div
        className="rounded-2xl overflow-hidden bg-white dark:bg-ink-900
                   border border-stone-200/60 dark:border-white/6
                   shadow-[0_1px_4px_rgba(0,0,0,.04),0_4px_24px_rgba(0,0,0,.06)]"
      >
        {isFetching ? (
          <div className="flex justify-center py-24">
            <Loader2 className="size-8 animate-spin text-stone-300 dark:text-white/20" />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400">
              <AlertCircle size={22} strokeWidth={1.8} />
            </div>
            <p className="text-[14px] text-stone-400 dark:text-white/35">
              Не удалось загрузить пользователей
            </p>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-stone-100 dark:bg-ink-800 text-stone-300 dark:text-white/20">
              <Users size={26} strokeWidth={1.3} />
            </div>
            <div className="text-center">
              <p className="text-[15px] font-semibold text-stone-600 dark:text-white/65">
                Пользователи не найдены
              </p>
              <p className="mt-1 text-[13px] text-stone-400 dark:text-white/35">
                Попробуйте изменить фильтры или поиск
              </p>
            </div>
          </div>
        ) : (
          <Table>
            <colgroup>
              <col />
              <col style={{ width: 148 }} />
              <col />
              <col style={{ width: 132 }} />
              <col style={{ width: 108 }} />
              <col style={{ width: 40 }} />
            </colgroup>

            <TableHeader>
              <TableRow className="h-10.5 hover:bg-transparent border-stone-100 dark:border-white/6">
                <TableHead className={`${HEAD_CLS} pl-5`}>Пользователь</TableHead>
                <TableHead className={HEAD_CLS}>Телефон</TableHead>
                <TableHead className={HEAD_CLS}>Филиал</TableHead>
                <TableHead className={HEAD_CLS}>Статус</TableHead>
                <TableHead className={HEAD_CLS}>Дата</TableHead>
                <TableHead className={HEAD_CLS} />
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((u) => (
                <TableRow
                  key={u.id}
                  onClick={() => navigate(ROUTES.USERS.DETAIL(u.id))}
                  className="cursor-pointer border-stone-100 dark:border-white/5 hover:bg-stone-50/80 dark:hover:bg-white/2"
                >
                  <TableCell className="pl-5 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <InitialsAvatar
                        firstName={u.firstName}
                        lastName={u.lastName}
                        className="shrink-0 w-9 h-9"
                      />
                      <div className="min-w-0">
                        <p className="text-[13.5px] font-semibold text-stone-900 dark:text-white truncate">
                          {u.firstName} {u.lastName}
                        </p>
                        <p className="text-[11px] font-mono text-stone-400 dark:text-white/38 truncate">
                          {u.personalCode} · {u.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="font-mono text-xs font-medium text-stone-600 dark:text-white/60">
                    {u.phone}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="shrink-0 inline-flex items-center h-5.5 px-2 rounded-md font-mono text-[11px] font-bold tracking-wider bg-stone-100 dark:bg-white/6 text-stone-500 dark:text-white/55">
                        {u.branch.personalCodePrefix}
                      </span>
                      <span className="text-[12.5px] text-stone-500 dark:text-white/50 truncate">
                        {u.branch.address}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <UserStatusBadge status={u.status} />
                  </TableCell>

                  <TableCell className="text-[12px] text-stone-400 dark:text-white/32 font-medium">
                    {fmtDate(u.createdAt)}
                  </TableCell>

                  <TableCell className="pr-4">
                    <ChevronRight
                      size={16}
                      strokeWidth={2}
                      className="text-stone-300 dark:text-white/20"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {data && data.total > 0 && (
        <p className="mt-3 text-[12px] text-stone-400 dark:text-white/35">
          Показано {data.items.length} из {data.total}
        </p>
      )}

      {data && totalPages > 1 && (
        <PaginationControl
          page={page}
          totalPages={totalPages}
          onPageChange={(p) => dispatch(setUsersPage(p))}
        />
      )}
    </>
  )
}
