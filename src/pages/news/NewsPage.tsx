import { Plus, MoreHorizontal, Calendar } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const mockNews = [
  {
    id: '1',
    title: 'Обновление тарифов на доставку',
    content: 'С 1 марта 2026 года вступают в силу новые тарифы на доставку из Китая. Подробности в приложении.',
    createdAt: '2026-03-01',
  },
  {
    id: '2',
    title: 'Открытие нового филиала в Оше',
    content: 'Рады сообщить об открытии нового филиала AdesExpress в городе Ош по адресу Масалиева 27.',
    createdAt: '2026-02-20',
  },
  {
    id: '3',
    title: 'График работы в праздничные дни',
    content: 'В период с 8 по 10 марта офисы будут работать в сокращённом режиме с 10:00 до 15:00.',
    createdAt: '2026-02-15',
  },
]

export function NewsPage() {
  return (
    <div className="flex flex-col">
      <PageHeader title="Новости" description="Публикации для пользователей приложения">
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          Создать новость
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-4 p-6">
        {mockNews.map((news) => (
          <Card key={news.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground">
                    {news.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {news.content}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground/60">
                    <Calendar className="size-3" />
                    {news.createdAt}
                  </div>
                </div>
                <Button variant="ghost" size="icon-xs">
                  <MoreHorizontal className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
