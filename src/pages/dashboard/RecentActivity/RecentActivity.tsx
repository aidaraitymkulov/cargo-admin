import { Card, CardContent, CardHeader, CardTitle } from '@/components'

const activities = [
  { id: 1, action: 'Импорт CN завершён', detail: '142 посылки обработаны', time: '5 мин назад' },
  { id: 2, action: 'Новый пользователь', detail: 'Данияр Асанов (AN0312)', time: '12 мин назад' },
  { id: 3, action: 'Заказ доставлен', detail: 'ORD-002 — Айгерим', time: '28 мин назад' },
  { id: 4, action: 'Push-уведомление', detail: 'Broadcast: 847 получателей', time: '1 час назад' },
  { id: 5, action: 'Менеджер добавлен', detail: 'Аскар Сыдыков — Бишкек', time: '2 часа назад' },
]

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Последние действия</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {activities.map((item, i) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative flex flex-col items-center">
                <div className="h-2 w-2 rounded-full bg-primary" />
                {i < activities.length - 1 && <div className="mt-1 flex-1 w-px bg-border" />}
              </div>
              <div className="flex-1 pb-1">
                <p className="text-sm font-medium leading-tight">{item.action}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
                <p className="mt-0.5 text-xs text-muted-foreground/60">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
