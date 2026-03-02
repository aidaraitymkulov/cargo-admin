import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, LogIn, Package } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const loginSchema = z.object({
  login: z.string().min(1, 'Введите логин'),
  password: z.string().min(1, 'Введите пароль'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      // TODO: replace with actual API call
      // await api.post('/auth/login', data, { headers: { 'X-Client-Type': 'web' } })
      console.log('Login attempt:', data.login)

      // Simulate API delay for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1500))
    } catch {
      setError('Неверный логин или пароль')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Background pattern */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5" />
      </div>

      <div className="relative z-10 flex w-full max-w-[400px] flex-col gap-8">
        {/* Logo & Brand */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
              <Package className="size-6 text-primary-foreground" />
            </div>
            <img
              src="/logo.png"
              alt="AdesExpress"
              className="h-9"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Панель управления
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-border/60 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Вход в систему</CardTitle>
            <CardDescription>
              Введите свои учетные данные для доступа
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              {/* Error Alert */}
              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Login Field */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="login">Логин</Label>
                <Input
                  id="login"
                  type="text"
                  placeholder="Введите логин"
                  autoComplete="username"
                  autoFocus
                  disabled={isLoading}
                  aria-invalid={!!errors.login}
                  {...register('login')}
                />
                {errors.login && (
                  <p className="text-xs text-destructive">{errors.login.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Введите пароль"
                    autoComplete="current-password"
                    disabled={isLoading}
                    className="pr-10"
                    aria-invalid={!!errors.password}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="mt-1 w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="size-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Вход...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="size-4" />
                    Войти
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          AdesExpress Admin {'·'} v1.0
        </p>
      </div>
    </div>
  )
}
