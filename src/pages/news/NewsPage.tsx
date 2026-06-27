import { AlertCircle, Loader2, Newspaper, Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetNewsQuery } from '@/api/admin/news/newsApi'
import { PageHeader } from '@/components/layout'
import { PaginationControl } from '@/components/shared'
import { NewsCard } from '@/components/shared/news'
import { Button } from '@/components/ui'
import { ROUTES } from '@/config'
import { useAppSelector } from '@/hooks'
import type { News } from '@/types/entities/news'
import { ROLE } from '@/types/enums/role'

const NewsPage = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useGetNewsQuery({ page, pageSize: 20 })
  const user = useAppSelector((state) => state.auth.user)
  const isSuperAdmin = user?.role === ROLE.SUPER_ADMIN

  return (
    <div className="flex flex-col">
      <PageHeader title="Новости">
        {isSuperAdmin && (
          <Button size="sm" className="gap-1.5" onClick={() => navigate(ROUTES.NEWS.CREATE)}>
            <Plus className="size-3.5" />
            Создать новость
          </Button>
        )}
      </PageHeader>

      <div className="p-6 max-w-7xl">
        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader2 className="size-10 animate-spin text-muted-foreground" />
          </div>
        )}
        {isError && (
          <div className="flex flex-col items-center gap-2 py-10 text-destructive">
            <AlertCircle className="size-10" />
            <p className="text-sm">Не удалось загрузить новости</p>
          </div>
        )}

        {data && data.content?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-stone-100 dark:bg-white/6 text-stone-300 dark:text-white/20">
              <Newspaper className="size-8" strokeWidth={1.2} />
            </div>
            <div className="text-center">
              <p className="text-[15px] font-semibold text-stone-700 dark:text-white/80">
                Нет новостей
              </p>
              <p className="mt-1 text-[13px] text-stone-400 dark:text-white/35">
                Здесь будут отображаться опубликованные новости
              </p>
            </div>
            {isSuperAdmin && (
              <Button
                size="sm"
                className="gap-1.5 mt-2"
                onClick={() => navigate(ROUTES.NEWS.CREATE)}
              >
                <Plus className="size-3.5" />
                Создать первую новость
              </Button>
            )}
          </div>
        )}

        {data && data.content?.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(data.content ?? []).map((item: News) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
        {data && data.totalElements > data.totalPages && (
          <PaginationControl
            page={page}
            totalPages={Math.ceil(data.totalElements / data.totalPages)}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  )
}

export default NewsPage
