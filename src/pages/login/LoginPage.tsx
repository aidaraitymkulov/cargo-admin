import { Navigate } from 'react-router-dom'
import { useGetMeQuery } from '@/api/admin/auth'
import { Spinner, ThemeToggle } from '@/components/ui'
import { ROUTES } from '@/config'
import { LoginBackground } from './LoginBackground'
import { LoginForm } from './LoginForm'

const LoginPage = () => {
  const { data, isLoading } = useGetMeQuery()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (data) return <Navigate to={ROUTES.DASHBOARD} replace />

  return (
    <div
      className="relative flex h-screen items-center justify-center overflow-hidden p-6"
      style={{ background: 'linear-gradient(155deg,#0E3826 0%,#1A6B3F 60%,#0A2A1B 100%)' }}
    >
      <LoginBackground />

      <div className="absolute right-6 top-6 z-10">
        <ThemeToggle tone="dark" />
      </div>

      <p className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] tracking-widest text-white/35">
        ADES ADMIN · v 4.12.0
      </p>

      <div className="relative z-10 w-full max-w-110 rounded-2xl bg-white p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,.55),0_0_0_1px_rgba(255,255,255,.06)] dark:bg-ink-900">
        <div className="mb-8 flex items-center gap-3">
          <img src="/logo.png" alt="ADES" className="h-9 dark:invert dark:brightness-0" />
          <div className="ml-1 border-l border-stone-200 pl-3 leading-tight dark:border-white/15">
            <div className="font-mono text-[10px] font-semibold tracking-[.16em] text-forest-700 dark:text-forest-400">
              ADMIN · CONSOLE
            </div>
            <div className="mt-0.5 text-xs text-stone-500 dark:text-white/50">
              Внутренняя панель
            </div>
          </div>
        </div>

        <h1 className="mb-1 text-[28px] font-bold tracking-tight text-stone-900 dark:text-white">
          Вход для сотрудников
        </h1>
        <p className="mb-7 text-[14px] text-stone-500 dark:text-white/55">
          Используйте корпоративный логин и пароль.
        </p>

        <LoginForm />
      </div>

      <style>{`@keyframes dashflow { to { stroke-dashoffset: -300 } }`}</style>
    </div>
  )
}

export default LoginPage
