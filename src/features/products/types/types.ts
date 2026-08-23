import { z } from 'zod'
import { PRODUCT_STATUS } from '@/shared/constants/enums'

export const productSchema = z.object({
  id: z.string(),
  hatch: z.string(),
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  personalCode: z.string(),
  status: z.nativeEnum(PRODUCT_STATUS),
  price: z.number().nullable(),
  weight: z.number().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Product = z.infer<typeof productSchema>

export const productListResponseSchema = z.object({
  items: z.array(productSchema),
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
})

export type ProductListResponse = z.infer<typeof productListResponseSchema>
