import { Send, Users, User, Building2 } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function NotificationsPage() {
  return (
    <div className="flex flex-col">
      <PageHeader title="Push-уведомления" description="Отправка уведомлений пользователям приложения" />

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
        {/* Test notification */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <User className="size-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Тестовое</CardTitle>
                <CardDescription>Одному пользователю</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="test-user">ID пользователя</Label>
              <Input id="test-user" placeholder="uuid пользователя" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="test-title">Заголовок</Label>
              <Input id="test-title" placeholder="Заголовок уведомления" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="test-body">Текст</Label>
              <Textarea id="test-body" placeholder="Текст уведомления" rows={3} />
            </div>
            <Button className="gap-2">
              <Send className="size-4" />
              Отправить
            </Button>
          </CardContent>
        </Card>

        {/* Broadcast */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Users className="size-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Рассылка</CardTitle>
                <CardDescription>Всем пользователям</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="broadcast-title">Заголовок</Label>
              <Input id="broadcast-title" placeholder="Заголовок уведомления" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="broadcast-body">Текст</Label>
              <Textarea id="broadcast-body" placeholder="Текст уведомления" rows={3} />
            </div>
            <Button className="gap-2">
              <Send className="size-4" />
              Отправить всем
            </Button>
          </CardContent>
        </Card>

        {/* By branch */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="size-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">По филиалу</CardTitle>
                <CardDescription>По префиксу кода</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="branch-prefix">Префикс</Label>
              <Input id="branch-prefix" placeholder="AN, BK, OS..." />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="branch-title">Заголовок</Label>
              <Input id="branch-title" placeholder="Заголовок уведомления" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="branch-body">Текст</Label>
              <Textarea id="branch-body" placeholder="Текст уведомления" rows={3} />
            </div>
            <Button className="gap-2">
              <Send className="size-4" />
              Отправить филиалу
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
