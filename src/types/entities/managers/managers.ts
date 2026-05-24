import type { Role } from '@/types/enums'
import type { Branch } from '../branches/branches.ts'

export interface Manager {
  id: string
  login: string
  password: string
  firstName: string
  lastName: string
  phone: string
  role: Role
  branch: Branch | null
  createdAt: string
}
