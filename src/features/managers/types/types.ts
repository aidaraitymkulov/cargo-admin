import { z } from 'zod'
import { branchSchema } from '@/features/branches'
import { ROLE } from '@/shared/constants/enums'

export const managerSchema = z.object({
  id: z.string(),
  login: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  role: z.nativeEnum(ROLE),
  branch: branchSchema.nullable(),
  createdAt: z.string(),
})

export type Manager = z.infer<typeof managerSchema>
