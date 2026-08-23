import { USER_STATUS, type UserStatus, userStatusLabel } from '@/shared/constants/enums'
import { cn } from '@/shared/lib/utils'
import { Badge } from '@/shared/ui'

const STATUS_CLS: Record<UserStatus, string> = {
  [USER_STATUS.ACTIVE]:
    'bg-forest-50 text-forest-700 border-forest-100 dark:bg-forest-400/10 dark:text-forest-400 dark:border-forest-400/20',
  [USER_STATUS.INACTIVE]:
    'bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
  [USER_STATUS.PENDING_DELETION]:
    'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-400/10 dark:text-amber-400 dark:border-amber-400/20',
  [USER_STATUS.DELETED]:
    'bg-stone-100 text-stone-400 border-stone-200/70 dark:bg-white/6 dark:text-white/35 dark:border-white/10',
}

interface IProps {
  status: UserStatus
}

export const UserStatusBadge = ({ status }: IProps) => (
  <Badge className={cn('font-semibold tracking-wide', STATUS_CLS[status])}>
    {userStatusLabel[status]}
  </Badge>
)
