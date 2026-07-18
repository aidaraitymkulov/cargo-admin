import { createApi } from '@reduxjs/toolkit/query/react'
import { z } from 'zod'
import { axiosBaseQuery } from '@/shared/api/baseQuery'
import {
  type DashboardChartPoint,
  type DashboardSummary,
  dashboardChartPointSchema,
  dashboardSummarySchema,
} from '../types/types'

interface DashboardSummaryParams {
  branchId?: string
}
interface DashboardChartParams {
  from: string
  to: string
  branchId?: string
}

const DASHBOARD_TAG = 'Dashboard' as const

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: axiosBaseQuery,
  tagTypes: [DASHBOARD_TAG],
  endpoints: ({ query }) => ({
    getDashboardSummary: query<DashboardSummary, DashboardSummaryParams>({
      query: (params) => ({ url: '/admin/dashboard/summary', params }),
      transformResponse: (raw) => dashboardSummarySchema.parse(raw),
      providesTags: [DASHBOARD_TAG],
    }),
    getUsersChart: query<DashboardChartPoint[], DashboardChartParams>({
      query: (params) => ({ url: '/admin/dashboard/charts/users', params }),
      transformResponse: (raw) => z.array(dashboardChartPointSchema).parse(raw),
      providesTags: [DASHBOARD_TAG],
    }),
    getDeliveredChart: query<DashboardChartPoint[], DashboardChartParams>({
      query: (params) => ({
        url: '/admin/dashboard/charts/products/delivered',
        params,
      }),
      transformResponse: (raw) => z.array(dashboardChartPointSchema).parse(raw),
      providesTags: [DASHBOARD_TAG],
    }),
  }),
})

export const { useGetDashboardSummaryQuery, useGetUsersChartQuery, useGetDeliveredChartQuery } =
  dashboardApi
