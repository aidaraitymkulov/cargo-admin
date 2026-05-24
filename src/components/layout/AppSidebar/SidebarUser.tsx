import { LogOut } from 'lucide-react'
import { authSelectors } from '@/api/admin/auth'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import { useAppSelector } from '@/hooks'
import { cn } from '@/lib/utils/cn'
import { roleLabel } from '@/types/enums/role'

interface IProps {
  collapsed: boolean
  onLogout: () => void
}

export const SidebarUser = ({ collapsed, onLogout }: IProps) => {
  const user = useAppSelector(authSelectors.user)

  const initials = user
    ? [user.firstName[0], user.lastName[0]].filter(Boolean).join('').toUpperCase() || '??'
    : '??'
  const fullName = user ? [user.firstName, user.lastName].filter(Boolean).join(' ') || '—' : '—'
  const roleLabelText = user ? (roleLabel[user.role] ?? user.role) : '—'

  const avatar = (
    <div
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                 bg-linear-to-br from-forest-500 to-forest-700 text-[13px]
                 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2)]"
    >
      {initials}
      <span
        className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full
                   bg-emerald-500 ring-2 ring-white dark:ring-ink-900"
      />
    </div>
  )

  return (
    <div
      className={cn('border-t border-stone-200/70 dark:border-white/6', collapsed ? 'p-2' : 'p-3')}
    >
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onLogout}
              className="relative mx-auto flex h-9 w-9 items-center justify-center rounded-lg
                         bg-linear-to-br from-forest-500 to-forest-700 text-[13px]
                         font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2)]"
            >
              {initials}
              <span
                className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full
                           bg-emerald-500 ring-2 ring-white dark:ring-ink-900"
              />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">Выйти</TooltipContent>
        </Tooltip>
      ) : (
        <div className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-stone-100/70 dark:hover:bg-white/4">
          {avatar}
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-[13px] font-semibold text-stone-900 dark:text-white">
              {fullName}
            </div>
            <div className="truncate text-[11px] text-stone-500 dark:text-white/50">
              {roleLabelText}
            </div>
          </div>
          <button
            type="button"
            title="Выйти"
            onClick={onLogout}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
                       text-stone-400 transition-colors hover:bg-red-50 hover:text-red-500
                       dark:text-white/40 dark:hover:bg-red-500/10 dark:hover:text-red-300"
          >
            <LogOut size={16} strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  )
}
