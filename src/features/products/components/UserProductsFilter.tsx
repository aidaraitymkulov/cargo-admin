import { useMemo } from 'react'
import { PRODUCT_STATUS, type ProductStatus, productStatusLabel } from '@/shared/constants/enums'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { cn } from '@/shared/lib/utils'
import { useGetUserProductsQuery } from '../api/productsApi'
import {
  selectUserProductsPage,
  selectUserProductsTab,
  setUserProductsTab,
} from '../store/userProductsFiltersSlice'

const PAGE_SIZE = 50

const TABS: { key: ProductStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: PRODUCT_STATUS.IN_CHINA, label: productStatusLabel.IN_CHINA },
  { key: PRODUCT_STATUS.ON_THE_WAY, label: productStatusLabel.ON_THE_WAY },
  { key: PRODUCT_STATUS.IN_KG, label: productStatusLabel.IN_KG },
  { key: PRODUCT_STATUS.DELIVERED, label: productStatusLabel.DELIVERED },
]

interface IProps {
  userId: string
}

export const UserProductsFilter = ({ userId }: IProps) => {
  const dispatch = useAppDispatch()
  const tab = useAppSelector(selectUserProductsTab)
  const page = useAppSelector(selectUserProductsPage)

  const { data } = useGetUserProductsQuery({ userId, page, pageSize: PAGE_SIZE })
  const items = data?.items ?? []

  const counts = useMemo(() => {
    const acc: Record<ProductStatus, number> = {
      IN_CHINA: 0,
      ON_THE_WAY: 0,
      IN_KG: 0,
      DELIVERED: 0,
    }
    for (const p of items) acc[p.status] += 1
    return acc
  }, [items])

  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-2 mb-3">
        <h2 className="text-[15px] font-bold text-stone-900 dark:text-white">Товары</h2>
        <span className="text-[13px] text-stone-400 dark:text-white/35">
          {data?.total ?? 0} шт.
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {TABS.map((t) => {
          const count = t.key === 'all' ? items.length : counts[t.key]
          const active = tab === t.key
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => dispatch(setUserProductsTab(t.key))}
              className={cn(
                'h-7 px-2.5 rounded-lg text-[12px] font-semibold flex items-center gap-1.5 transition-colors',
                active
                  ? 'bg-forest-700/8 dark:bg-forest-400/12 text-forest-800 dark:text-white'
                  : 'text-stone-500 dark:text-white/40 hover:text-stone-800 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/5',
              )}
            >
              {t.label}
              <span
                className={cn(
                  'h-4.5 min-w-4.5 px-1 rounded-md font-mono text-[10px] font-semibold flex items-center justify-center',
                  active
                    ? 'bg-forest-700 dark:bg-forest-400 text-white dark:text-ink-950'
                    : 'bg-stone-200/60 dark:bg-white/10 text-stone-500 dark:text-white/40',
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
