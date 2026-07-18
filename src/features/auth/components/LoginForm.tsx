import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { FORM_INPUT_CLS, FORM_LABEL_CLS, getApiErrorMessage } from '@/shared/lib'
import { cn } from '@/shared/lib/utils'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/shared/ui'
import { useLoginMutation } from '../api/authApi'
import { type LoginRequest, loginRequestSchema } from '../types/schema'

const iconCls =
  'absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] shrink-0 pointer-events-none text-stone-400 dark:text-white/40'

export const LoginForm = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loginUser, { isLoading, error }] = useLoginMutation()

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: { login: '', password: '' },
  })

  const errorMessage =
    error && 'data' in error
      ? ((error.data as { message?: string })?.message ?? 'Неверный логин или пароль')
      : null

  const onSubmit = async (data: LoginRequest) => {
    try {
      await loginUser(data).unwrap()
      navigate('/', { replace: true })
    } catch (err) {
      if (!err || typeof err !== 'object' || !('data' in err)) {
        toast.error(getApiErrorMessage(err, 'Не удалось подключиться к серверу'))
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={FORM_LABEL_CLS}>Логин</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="username"
                    placeholder="Введите логин"
                    disabled={isLoading}
                    {...field}
                    className={cn(FORM_INPUT_CLS, 'pl-10')}
                  />
                </FormControl>
                <Mail strokeWidth={1.8} className={iconCls} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={FORM_LABEL_CLS}>Пароль</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    disabled={isLoading}
                    {...field}
                    className={cn(FORM_INPUT_CLS, 'pl-10 pr-10 font-mono tracking-wider')}
                  />
                </FormControl>
                <Lock strokeWidth={1.8} className={iconCls} />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 transition-colors hover:text-stone-700 dark:text-white/40 dark:hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff strokeWidth={1.8} className="h-4.5 w-4.5" />
                  ) : (
                    <Eye strokeWidth={1.8} className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorMessage && (
          <div className="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-[12.5px] text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
            <AlertTriangle className="mt-px h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="relative mt-1 h-13 w-full gap-2 overflow-hidden rounded-xl text-[15px] font-semibold tracking-[-0.005em] text-white active:translate-y-px"
          style={{
            background: 'linear-gradient(180deg,#1A6B3F 0%,#0E3826 100%)',
          }}
        >
          <span>{isLoading ? 'Проверяем доступ…' : 'Войти'}</span>
          {!isLoading && <ArrowRight strokeWidth={2} className="h-4 w-4" />}
        </Button>
      </form>
    </Form>
  )
}
