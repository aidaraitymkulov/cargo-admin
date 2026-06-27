import { ArrowLeft, Calendar, Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { ROUTES } from '@/config'
import { API_URL } from '@/lib'
import { fmtDateTime } from '@/lib/utils'
import type { News } from '@/types/entities/news'

interface Props {
  data: News
  isSuperAdmin: boolean
  onEdit: () => void
  onDelete: () => void
}

export const NewsReadView = ({ data, isSuperAdmin, onEdit, onDelete }: Props) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col">
      <PageHeader title={data.title} breadcrumbs={[{ label: 'Новости', to: ROUTES.NEWS.LIST }]}>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-stone-400 hover:text-forest-700 dark:text-white/35 dark:hover:text-forest-400"
            onClick={() => navigate(ROUTES.NEWS.LIST)}
          >
            <ArrowLeft className="size-4" />
            Все новости
          </Button>
          {isSuperAdmin && (
            <>
              <Button variant="outline" size="sm" className="gap-1.5" onClick={onEdit}>
                <Pencil className="size-3.5" strokeWidth={2} />
                Редактировать
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-500/20 dark:hover:bg-red-500/10"
                onClick={onDelete}
              >
                <Trash2 className="size-3.5" strokeWidth={2} />
                Удалить
              </Button>
            </>
          )}
        </div>
      </PageHeader>

      <div className="px-7 py-7 w-full max-w-225 mx-auto">
        {data.image && (
          <div
            className="relative rounded-2xl overflow-hidden shadow-card"
            style={{ aspectRatio: '100/46' }}
          >
            <img
              src={`${API_URL}${data.image}`}
              alt={data.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mt-7">
          <h1 className="text-[28px] font-bold tracking-[-0.025em] leading-tight text-stone-900 dark:text-white">
            {data.title}
          </h1>
          <div className="mt-3 flex items-center gap-4 text-[12px] font-mono text-stone-400 dark:text-white/35">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.25" strokeWidth={1.8} />
              Создано: {fmtDateTime(data.createdAt)}
            </span>
          </div>
        </div>

        <div className="mt-6 border-t border-stone-100 dark:border-white/6" />

        <div className="mt-6 text-[15.5px] leading-[1.75] text-stone-700 dark:text-white/80 whitespace-pre-line">
          {data.content}
        </div>
      </div>
    </div>
  )
}
