import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@/shared/api/baseQuery'
import { type UserListResponse, userListResponseSchema } from '../types/types'

export type UserStats = {
  total: number
  newThisMonth: number
}

type GetUserStatsParams = {
  branchId?: string
}

type GetUsersParams = {
  q?: string
  branchId?: string
  page?: number
  pageSize?: number
}

const USER_TAG = 'User' as const

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: axiosBaseQuery,
  tagTypes: [USER_TAG],
  endpoints: ({ query }) => ({
    getUsers: query<UserListResponse, GetUsersParams>({
      query: (params) => ({ url: '/admin/users', params }),
      transformResponse: (raw) => userListResponseSchema.parse(raw),
      providesTags: [USER_TAG],
    }),
    // biome-ignore lint/suspicious/noConfusingVoidType: void allows calling hook without arguments
    getUserStats: query<UserStats, GetUserStatsParams | void>({
      query: (params) => ({ url: '/admin/users/stats', params }),
    }),
  }),
})

export const { useGetUsersQuery, useGetUserStatsQuery } = usersApi
