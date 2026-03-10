import { z } from 'zod'
import { branchSchema } from './branches'

export const userSchema = z.object({
  id: z.string(),
  role: z.enum(['SUPER_ADMIN', 'MANAGER', 'USER']),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  personalCode: z.string(),
  branch: branchSchema,
  chatBanned: z.boolean(),
  status: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const loginDtoSchema = z.object({
  login: z.string().min(1, 'Введите логин'),
  password: z.string().min(1, 'Введите пароль'),
})

export type User = z.infer<typeof userSchema>
export type LoginDto = z.infer<typeof loginDtoSchema>
