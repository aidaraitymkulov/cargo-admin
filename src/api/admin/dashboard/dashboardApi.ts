import { createApi } from '@reduxjs/toolkit/query/react'
import type {
  DashboardChartParams,
  DashboardChartPoint,
  DashboardSummary,
  DashboardSummaryParams,
} from '@/types/dashboard'
import { axiosBaseQuery } from '../../baseQuery'

const DASHBOARD_TAG = 'Dashboard' as const

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: axiosBaseQuery,
  tagTypes: [DASHBOARD_TAG],
  endpoints: ({ query }) => ({
    getDashboardSummary: query<DashboardSummary, DashboardSummaryParams>({
      query: (params) => ({ url: '/admin/dashboard/summary', params }),
      providesTags: [DASHBOARD_TAG],
    }),
    getUsersChart: query<DashboardChartPoint[], DashboardChartParams>({
      query: (params) => ({ url: '/admin/dashboard/charts/users', params }),
      providesTags: [DASHBOARD_TAG],
    }),
    getDeliveredChart: query<DashboardChartPoint[], DashboardChartParams>({
      query: (params) => ({ url: '/admin/dashboard/charts/products/delivered', params }),
      providesTags: [DASHBOARD_TAG],
    }),
  }),
})

export const { useGetDashboardSummaryQuery, useGetUsersChartQuery, useGetDeliveredChartQuery } =
  dashboardApi
