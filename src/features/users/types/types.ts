import { z } from 'zod'
import { branchSchema } from '@/features/branches'
import { USER_STATUS } from '@/shared/constants/enums'

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  dateOfBirth: z.string(),
  personalCode: z.string(),
  branch: branchSchema,
  status: z.nativeEnum(USER_STATUS),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type User = z.infer<typeof userSchema>

export const userListResponseSchema = z.object({
  items: z.array(userSchema),
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
})

export type UserListResponse = z.infer<typeof userListResponseSchema>
