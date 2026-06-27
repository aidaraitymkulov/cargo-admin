import { z } from 'zod'

export const paginatedResponseSchema = <T>(itemSchema: z.ZodType<T>) =>
  z.object({
    content: z.array(itemSchema),
    totalElements: z.number(),
    totalPages: z.number(),
    number: z.number(),
    size: z.number(),
    first: z.boolean(),
    last: z.boolean(),
    empty: z.boolean(),
  })

export type PaginatedResponse<T> = z.infer<ReturnType<typeof paginatedResponseSchema<T>>>
