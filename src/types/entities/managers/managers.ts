import type { Role } from '@/types/enums'
import type { Branch } from '../branches'

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

export type CreateManagerDto = Pick<
  Manager,
  'login' | 'password' | 'firstName' | 'lastName' | 'phone'
> & {
  branchId: string
}

export type UpdateManagerDto = Partial<CreateManagerDto>
