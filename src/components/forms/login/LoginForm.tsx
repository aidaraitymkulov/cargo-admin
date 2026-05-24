import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { setManager, useLoginMutation } from '@/api/admin/auth'
import { useAppDispatch } from '@/hooks'
import { cn } from '@/lib'
import { type LoginDto, loginDtoSchema } from '@/types/entities/auth'

const fieldCls = (active: boolean) =>
  cn(
    'flex items-center gap-2.5 h-13 rounded-xl px-3.5 transition-all',
    'bg-white dark:bg-white/[.04]',
    'border-[1.5px]',
    active
      ? 'border-forest-700 ring-4 ring-forest-700/10 dark:border-forest-400 dark:ring-forest-400/15'
      : 'border-stone-200 dark:border-white/10',
  )

const inputCls =
  'flex-1 bg-transparent border-0 border-none outline-none appearance-none ' +
  'focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ' +
  'text-[15px] font-medium text-stone-900 dark:text-white ' +
  'placeholder:text-stone-400 dark:placeholder:text-white/30'

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [focus, setFocus] = useState<string | null>(null)
  const [loginUser, { isLoading, error }] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginDtoSchema),
    defaultValues: { login: '', password: '' },
  })

  const errorMessage =
    error && 'data' in error
      ? ((error.data as { message?: string })?.message ?? 'Неверный логин или пароль')
      : null

  const onSubmit = handleSubmit(async (data) => {
    try {
      const user = await loginUser(data).unwrap()
      dispatch(setManager(user))
      navigate('/', { replace: true })
    } catch {}
  })

  return (
    <form onSubmit={onSubmit} className="space-y-4" autoComplete="off">
      <div className="space-y-1.5">
        <label
          htmlFor="login"
          className="block text-[12px] font-semibold text-stone-600 dark:text-white/65"
        >
          Логин
        </label>
        <div className={fieldCls(focus === 'login')}>
          <Mail
            strokeWidth={1.8}
            className={cn(
              'h-4.5 w-4.5 shrink-0 transition-colors',
              focus === 'login'
                ? 'text-forest-700 dark:text-forest-400'
                : 'text-stone-400 dark:text-white/40',
            )}
          />
          <input
            id="login"
            type="text"
            autoComplete="username"
            placeholder="Введите логин"
            disabled={isLoading}
            {...register('login')}
            onFocus={() => setFocus('login')}
            onBlur={() => setFocus(null)}
            className={inputCls}
          />
        </div>
        {errors.login && <p className="text-[12px] text-red-600">{errors.login.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="block text-[12px] font-semibold text-stone-600 dark:text-white/65"
        >
          Пароль
        </label>
        <div className={fieldCls(focus === 'password')}>
          <Lock
            strokeWidth={1.8}
            className={cn(
              'h-4.5 w-4.5 shrink-0 transition-colors',
              focus === 'password'
                ? 'text-forest-700 dark:text-forest-400'
                : 'text-stone-400 dark:text-white/40',
            )}
          />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            disabled={isLoading}
            {...register('password')}
            onFocus={() => setFocus('password')}
            onBlur={() => setFocus(null)}
            className={cn(inputCls, 'font-mono tracking-wider')}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            className="p-1 text-stone-400 transition-colors hover:text-stone-700 dark:text-white/40 dark:hover:text-white"
          >
            {showPassword ? (
              <EyeOff strokeWidth={1.8} className="h-4.5 w-4.5" />
            ) : (
              <Eye strokeWidth={1.8} className="h-4.5 w-4.5" />
            )}
          </button>
        </div>
        {errors.password && <p className="text-[12px] text-red-600">{errors.password.message}</p>}
      </div>

      {errorMessage && (
        <div className="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-[12.5px] text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
          <AlertTriangle className="mt-px h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="relative mt-1 flex h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-xl text-[15px] font-semibold tracking-[-0.005em] text-white transition-[transform,opacity] active:translate-y-px disabled:opacity-90"
        style={{ background: 'linear-gradient(180deg,#1A6B3F 0%,#0E3826 100%)' }}
      >
        <span>{isLoading ? 'Проверяем доступ…' : 'Войти'}</span>
        {!isLoading && <ArrowRight strokeWidth={2} className="h-4 w-4" />}
      </button>
    </form>
  )
}
