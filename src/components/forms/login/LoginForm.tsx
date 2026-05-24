import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { setManager, useLoginMutation } from '@/api/admin/auth'
import { Button, Input, Label } from '@/components/ui'
import { useAppDispatch } from '@/hooks'
import { type LoginDto, loginDtoSchema } from '@/types/entities/auth'

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
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
        <Label htmlFor="login" className="text-[12px] font-semibold text-stone-600">
          Логин
        </Label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <Input
            id="login"
            type="text"
            autoComplete="username"
            autoFocus
            placeholder="Введите логин"
            disabled={isLoading}
            {...register('login')}
            className="h-13 border-stone-200 pl-10 text-[15px] font-medium focus-visible:border-forest-700 focus-visible:ring-forest-700/20"
          />
        </div>
        {errors.login && <p className="text-[12px] text-red-600">{errors.login.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-[12px] font-semibold text-stone-600">
          Пароль
        </Label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            disabled={isLoading}
            {...register('password')}
            className="h-13 border-stone-200 pl-10 pr-10 font-mono text-[15px] font-medium focus-visible:border-forest-700 focus-visible:ring-forest-700/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 transition-colors hover:text-stone-700"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-[12px] text-red-600">{errors.password.message}</p>}
      </div>

      {errorMessage && (
        <div className="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-[12.5px] text-red-700">
          <AlertTriangle className="mt-px h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-2 h-13 w-full gap-2 border-0 text-[15px] font-semibold"
        style={{ background: 'linear-gradient(180deg,#1A6B3F 0%,#0E3826 100%)' }}
      >
        {isLoading ? 'Проверяем доступ…' : 'Войти'}
        {!isLoading && <ArrowRight className="h-4 w-4" />}
      </Button>
    </form>
  )
}
