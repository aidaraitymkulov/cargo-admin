import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../baseQuery'

export type OrderStats = {
  count: number
}

export type OrderRevenue = {
  revenue: number
  ordersCount: number
}

type GetOrderStatsParams = {
  branchId?: string
}

type GetOrderRevenueParams = {
  year: number
  month: number
  branchId?: string
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: axiosBaseQuery,
  endpoints: ({ query }) => ({
    // biome-ignore lint/suspicious/noConfusingVoidType: void allows calling hook without arguments
    getOrderStats: query<OrderStats, GetOrderStatsParams | void>({
      query: (params) => ({ url: '/admin/orders/stats', params }),
    }),
    getOrderRevenue: query<OrderRevenue, GetOrderRevenueParams>({
      query: (params) => ({ url: '/admin/orders/revenue', params }),
    }),
  }),
})

export const { useGetOrderStatsQuery, useGetOrderRevenueQuery } = ordersApi
