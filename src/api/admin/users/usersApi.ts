import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../baseQuery'

type UserStats = {
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
    getUserStats: query<UserStats, GetUserStatsParams>({
      query: (params) => ({ url: '/admin/users/stats', params }),
    }),
  }),
})

export const { useGetUserStatsQuery } = usersApi
