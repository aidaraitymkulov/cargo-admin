import z from 'zod'

export const branchSchema = z.object({
  id: z.string(),
  address: z.string(),
  personalCodePrefix: z.string(),
  isActive: z.boolean(),
  nextSequence: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Branch = z.infer<typeof branchSchema>
