import { AlertCircle, Loader2, Package } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { fmtDate } from '@/shared/lib/utils'
import {
  PaginationControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui'
import { useGetUserProductsQuery } from '../api/productsApi'
import {
  selectUserProductsPage,
  selectUserProductsTab,
  setUserProductsPage,
} from '../store/userProductsFiltersSlice'
import { ProductStatusBadge } from './ProductStatusBadge'

const HEAD_CLS =
  'text-[10.5px] font-semibold font-mono tracking-widest uppercase text-stone-400 dark:text-white/30 h-10.5'

const PAGE_SIZE = 50

interface IProps {
  userId: string
}

export const UserProductsTable = ({ userId }: IProps) => {
  const dispatch = useAppDispatch()
  const tab = useAppSelector(selectUserProductsTab)
  const page = useAppSelector(selectUserProductsPage)

  const { data, isFetching, isError } = useGetUserProductsQuery({
    userId,
    page,
    pageSize: PAGE_SIZE,
  })

  const items = data?.items ?? []
  const filtered = tab === 'all' ? items : items.filter((p) => p.status === tab)
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1

  return (
    <>
      <div
        className="rounded-2xl overflow-hidden bg-white dark:bg-ink-900
                   border border-stone-200/60 dark:border-white/6
                   shadow-[0_1px_4px_rgba(0,0,0,.04),0_4px_24px_rgba(0,0,0,.06)]"
      >
        {isFetching ? (
          <div className="flex justify-center py-14">
            <Loader2 className="size-7 animate-spin text-stone-300 dark:text-white/20" />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-14 gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400">
              <AlertCircle size={20} strokeWidth={1.8} />
            </div>
            <p className="text-[13px] text-stone-400 dark:text-white/35">
              Не удалось загрузить товары
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-14 flex flex-col items-center gap-2 text-stone-300 dark:text-white/20">
            <Package size={26} strokeWidth={1.2} />
            <p className="text-[13px] font-medium text-stone-400 dark:text-white/30">Нет товаров</p>
          </div>
        ) : (
          <Table>
            <colgroup>
              <col />
              <col style={{ width: 110 }} />
              <col style={{ width: 80 }} />
              <col style={{ width: 104 }} />
              <col style={{ width: 100 }} />
            </colgroup>

            <TableHeader>
              <TableRow className="h-10 hover:bg-transparent border-stone-100 dark:border-white/6">
                <TableHead className={`${HEAD_CLS} pl-6`}>Трек-номер</TableHead>
                <TableHead className={HEAD_CLS}>Статус</TableHead>
                <TableHead className={HEAD_CLS}>Вес</TableHead>
                <TableHead className={HEAD_CLS}>Цена</TableHead>
                <TableHead className={`${HEAD_CLS} pr-6`}>Дата</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((p) => (
                <TableRow
                  key={p.id}
                  className="border-stone-100 dark:border-white/5 hover:bg-stone-50/80 dark:hover:bg-white/2"
                >
                  <TableCell className="pl-6 font-mono text-[13px] font-semibold text-stone-900 dark:text-white">
                    {p.hatch}
                  </TableCell>
                  <TableCell>
                    <ProductStatusBadge status={p.status} />
                  </TableCell>
                  <TableCell className="font-mono text-xs text-stone-500 dark:text-white/45">
                    {p.weight ? `${p.weight} кг` : '—'}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-stone-500 dark:text-white/45">
                    {p.price ? `${p.price.toLocaleString('ru-RU')} с` : '—'}
                  </TableCell>
                  <TableCell className="pr-6 text-xs text-stone-400 dark:text-white/32">
                    {fmtDate(p.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {data && totalPages > 1 && (
        <PaginationControl
          page={page}
          totalPages={totalPages}
          onPageChange={(p) => dispatch(setUserProductsPage(p))}
        />
      )}
    </>
  )
}
