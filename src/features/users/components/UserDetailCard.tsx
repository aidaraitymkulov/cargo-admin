import { Building2, Cake, CalendarDays, Mail, Phone, Trash2 } from 'lucide-react'
import { fmtDate, fmtDob } from '@/shared/lib/utils'
import { Button, InitialsAvatar } from '@/shared/ui'
import type { User } from '../types/types'
import { UserStatusBadge } from './UserStatusBadge'

interface IProps {
  user: User
  onDeleteClick: () => void
}

export const UserDetailCard = ({ user, onDeleteClick }: IProps) => {
  const info = [
    { icon: Mail, label: 'Email', value: user.email },
    { icon: Phone, label: 'Телефон', value: user.phone },
    { icon: Cake, label: 'Дата рождения', value: fmtDob(user.dateOfBirth) },
    { icon: CalendarDays, label: 'Зарегистрирован', value: fmtDate(user.createdAt) },
    {
      icon: Building2,
      label: 'Филиал',
      value: `${user.branch.personalCodePrefix} · ${user.branch.address}`,
    },
  ]

  return (
    <div
      className="rounded-2xl overflow-hidden bg-white dark:bg-ink-900
                 border border-stone-200/60 dark:border-white/6
                 shadow-[0_1px_4px_rgba(0,0,0,.04),0_4px_24px_rgba(0,0,0,.06)]"
    >
      <div className="px-6 py-5 flex items-start gap-4 border-b border-stone-100 dark:border-white/6">
        <InitialsAvatar
          firstName={user.firstName}
          lastName={user.lastName}
          className="shrink-0 w-14 h-14 rounded-2xl text-[18px]"
        />
        <div className="flex-1 min-w-0 pt-0.5">
          <h1 className="text-[20px] font-bold text-stone-900 dark:text-white leading-tight">
            {user.firstName} {user.lastName}
          </h1>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="font-mono text-[11px] font-bold px-2 h-5 inline-flex items-center rounded-md bg-stone-100 dark:bg-white/7 text-stone-500 dark:text-white/55">
              {user.personalCode}
            </span>
            <UserStatusBadge status={user.status} />
          </div>
        </div>
      </div>

      <div className="px-6 py-5 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-6 gap-y-4 border-b border-stone-100 dark:border-white/6">
        {info.map(({ icon: InfoIcon, label, value }) => (
          <div key={label} className="flex items-start gap-2.5">
            <div className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5 bg-stone-100 dark:bg-white/6 text-stone-400 dark:text-white/35">
              <InfoIcon size={14} strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <p className="text-[10.5px] font-semibold uppercase tracking-wide text-stone-400 dark:text-white/30">
                {label}
              </p>
              <p className="text-[12.5px] font-medium text-stone-800 dark:text-white/85 truncate mt-0.5">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto gap-1.5 text-stone-400 dark:text-white/30 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
          onClick={onDeleteClick}
        >
          <Trash2 size={13} strokeWidth={2} />
          Удалить пользователя
        </Button>
      </div>
    </div>
  )
}
