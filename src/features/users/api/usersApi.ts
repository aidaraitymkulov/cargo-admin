import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@/shared/api/baseQuery'

export type UserStats = {
  total: number
  newThisMonth: number
}

type GetUserStatsParams = {
  branchId?: string
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: axiosBaseQuery,
  endpoints: ({ query }) => ({
    // biome-ignore lint/suspicious/noConfusingVoidType: void allows calling hook without arguments
    getUserStats: query<UserStats, GetUserStatsParams | void>({
      query: (params) => ({ url: '/admin/users/stats', params }),
    }),
  }),
})

export const { useGetUserStatsQuery } = usersApi
