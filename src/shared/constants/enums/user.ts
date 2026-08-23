export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING_DELETION: 'PENDING_DELETION',
  DELETED: 'DELETED',
} as const

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS]

export const userStatusLabel: Record<UserStatus, string> = {
  ACTIVE: 'Активен',
  INACTIVE: 'Заблокирован',
  PENDING_DELETION: 'Удаляется',
  DELETED: 'Удалён',
}
