import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@/shared/api/baseQuery'
import { type ProductListResponse, productListResponseSchema } from '../types/types'

export type ProductStats = {
  count: number
}

type GetProductStatsParams = {
  branchId?: string
}

type GetUserProductsParams = {
  userId: string
  page?: number
  pageSize?: number
}

const PRODUCT_TAG = 'Product' as const

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: axiosBaseQuery,
  tagTypes: [PRODUCT_TAG],
  endpoints: ({ query }) => ({
    // biome-ignore lint/suspicious/noConfusingVoidType: void allows calling hook without arguments
    getProductStats: query<ProductStats, GetProductStatsParams | void>({
      query: (params) => ({ url: '/admin/products/stats', params }),
    }),
    getUserProducts: query<ProductListResponse, GetUserProductsParams>({
      query: ({ userId, page, pageSize }) => ({
        url: `/admin/users/${userId}/products`,
        params: { page, pageSize },
      }),
      transformResponse: (raw) => productListResponseSchema.parse(raw),
      providesTags: [PRODUCT_TAG],
    }),
  }),
})

export const { useGetProductStatsQuery, useGetUserProductsQuery } = productsApi
