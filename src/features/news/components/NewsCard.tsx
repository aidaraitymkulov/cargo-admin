import { Newspaper } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/config'
import { API_URL } from '@/shared/lib'
import { cn, fmtDate } from '@/shared/lib/utils'
import type { News } from '../types/types'

interface IProps {
  item: News
}

export const NewsCard = ({ item }: IProps) => {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(ROUTES.NEWS.DETAIL(item.id))}
      className={cn(
        'group w-full cursor-pointer rounded-2xl overflow-hidden text-left',
        'bg-white dark:bg-white/3',
        'border border-stone-200/60 dark:border-white/3',
        'shadow-card transition-all',
        'hover:shadow-[0_12px_32px_-12px_rgba(14,56,38,.22)] hover:-translate-y-0.5',
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        {item.image ? (
          <>
            <img
              src={`${API_URL}${item.image}`}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-100 dark:bg-white/4 text-stone-300 dark:text-white/20">
            <Newspaper className="size-8" strokeWidth={1.2} />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-[14.5px] font-bold leading-snug tracking-tight text-stone-900 dark:text-white line-clamp-2 group-hover:text-forest-700 dark:group-hover:text-forest-400 transition-colors">
          {item.title}
        </h3>
        <p className="mt-2 text-[11.5px] font-mono text-stone-400 dark:text-white/35">
          {fmtDate(item.createdAt)}
        </p>
      </div>
    </button>
  )
}
