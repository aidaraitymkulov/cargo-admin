import { AlertCircle, Calendar, Loader2, Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetNewsQuery } from '@/api/admin/news/newsApi'
import { NewsFormDialog } from '@/components/forms/news'
import { PageHeader } from '@/components/layout'
import { PaginationControl } from '@/components/shared'
import { Button, Card, CardContent } from '@/components/ui'
import { API_URL } from '@/lib'
import type { News } from '@/types/entities/news'

const NewsPage = () => {
  const navigate = useNavigate()
  const [formOpen, setFormOpen] = useState(false)
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useGetNewsQuery({ page, pageSize: 10 })

  return (
    <div className="flex flex-col">
      <PageHeader title="Новости">
        <Button size="sm" className="gap-1.5" onClick={() => setFormOpen(true)}>
          <Plus className="size-3.5" />
          Создать новость
        </Button>
      </PageHeader>

      <div className="p-6">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.items.map((item: News) => (
            <Card
              key={item.id}
              className="pt-0 cursor-pointer"
              onClick={() => navigate(`/news/${item.id}`)}
            >
              <img
                src={`${API_URL}${item.image}`}
                alt={item.title}
                className="h-48 w-full object-cover object-center rounded-t-xl"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-2">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {item.content}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground/60">
                  <Calendar className="size-3" />
                  {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {data && data.total > data.pageSize && (
          <PaginationControl
            page={page}
            totalPages={Math.ceil(data.total / data.pageSize)}
            onPageChange={setPage}
          />
        )}
      </div>

      {formOpen && <NewsFormDialog onClose={() => setFormOpen(false)} />}
    </div>
  )
}

export default NewsPage
