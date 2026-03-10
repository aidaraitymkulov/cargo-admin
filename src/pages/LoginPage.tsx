import { Package } from 'lucide-react'
import { LoginForm } from '@/components/forms'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/5" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5" />
      </div>

      <div className="relative z-10 flex w-full max-w-100 flex-col gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
              <Package className="size-6 text-primary-foreground" />
            </div>
            <img src="/logo.png" alt="AdesExpress" className="h-9" />
          </div>
          <p className="text-sm text-muted-foreground">Панель управления</p>
        </div>

        <Card className="border-border/60 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Вход в систему</CardTitle>
            <CardDescription>Введите свои учётные данные для доступа</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">AdesExpress Admin {'·'} v1.0</p>
      </div>
    </div>
  )
}
