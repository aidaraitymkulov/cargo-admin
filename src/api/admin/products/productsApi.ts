import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../baseQuery'

export type ProductStats = {
  count: number
}

type GetProductStatsParams = {
  branchId?: string
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: axiosBaseQuery,
  endpoints: ({ query }) => ({
    // biome-ignore lint/suspicious/noConfusingVoidType: void allows calling hook without arguments
    getProductStats: query<ProductStats, GetProductStatsParams | void>({
      query: (params) => ({ url: '/admin/products/stats', params }),
    }),
  }),
})

export const { useGetProductStatsQuery } = productsApi
