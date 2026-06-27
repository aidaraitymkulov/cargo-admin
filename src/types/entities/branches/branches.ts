import { z } from 'zod'

export const branchSchema = z.object({
  id: z.string(),
  address: z.string(),
  personalCodePrefix: z.string(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  photoUrl: z.string().nullable(),
  phone: z.string().nullable(),
  workingHours: z.string().nullable(),
})

export type Branch = z.infer<typeof branchSchema>
