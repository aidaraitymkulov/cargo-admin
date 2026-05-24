import { LoginForm } from '@/components/forms'
import { LoginBackground } from '@/components/layout/login'

export const LoginPage = () => {
  return (
    <div
      className="relative flex h-screen items-center justify-center overflow-hidden p-6"
      style={{ background: 'linear-gradient(155deg,#0E3826 0%,#1A6B3F 60%,#0A2A1B 100%)' }}
    >
      <LoginBackground />

      <p className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] tracking-widest text-white/35">
        ADES ADMIN · v 4.12.0
      </p>

      <div className="relative z-10 w-full max-w-110 rounded-2xl bg-white p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,.55),0_0_0_1px_rgba(255,255,255,.06)]">
        <div className="mb-8 flex items-center gap-3">
          <img src="/logo.png" alt="ADES" className="h-9" />
          <div className="ml-1 border-l border-stone-200 pl-3 leading-tight">
            <div className="font-mono text-[10px] font-semibold tracking-[.16em] text-forest-700">
              ADMIN · CONSOLE
            </div>
            <div className="mt-0.5 text-xs text-stone-500">Внутренняя панель</div>
          </div>
        </div>

        <h1 className="mb-1 text-[28px] font-bold tracking-tight text-stone-900">
          Вход для сотрудников
        </h1>
        <p className="mb-7 text-[14px] text-stone-500">Используйте корпоративный логин и пароль.</p>

        <LoginForm />
      </div>

      <style>{`@keyframes dashflow { to { stroke-dashoffset: -300 } }`}</style>
    </div>
  )
}
