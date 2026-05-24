export const ROLE = {
  MANAGER: 'MANAGER',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const

export type Role = (typeof ROLE)[keyof typeof ROLE]

export const roleLabel: Record<Role, string> = {
  MANAGER: 'Менеджер',
  SUPER_ADMIN: 'Главный администратор',
}
