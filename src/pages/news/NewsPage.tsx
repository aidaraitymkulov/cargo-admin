import { AlertCircle, Calendar, Loader2, Pencil, Plus } from 'lucide-react'
import { useState } from 'react'
import { useGetNewsQuery } from '@/api/admin/news/newsApi'
import { Button, Card, CardContent, NewsFormDialog, PageHeader } from '@/components'
import { API_URL } from '@/lib'
import type { News } from '@/types'

const NewsPage = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [editNews, setEditNews] = useState<News | null>(null)
  const { data, isLoading, isError } = useGetNewsQuery({})

  const openCreate = () => {
    setEditNews(null)
    setFormOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditNews(null)
  }

  return (
    <div className="flex flex-col">
      <PageHeader title="Новости" description="Публикации для пользователей приложения">
        <Button size="sm" className="gap-1.5" onClick={openCreate}>
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
          {data?.content?.map((item: News) => (
            <Card key={item.id} className="pt-0">
              <img
                src={`${API_URL}${item.cover}`}
                alt={item.title}
                className="h-48 w-full object-cover object-center rounded-t-xl"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-2">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {item.content}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                    <Calendar className="size-3" />
                    {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => {
                      setEditNews(item)
                      setFormOpen(true)
                    }}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {formOpen && <NewsFormDialog onClose={closeForm} news={editNews ?? undefined} />}
    </div>
  )
}

export default NewsPage
