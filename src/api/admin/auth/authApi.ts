import { createApi } from '@reduxjs/toolkit/query/react'
import type { LoginRequest } from '@/types/auth'
import type { Manager } from '@/types/entities/managers'
import { managerSchema } from '@/types/entities/managers'
import { axiosBaseQuery } from '../../baseQuery'

const TAG = 'Me' as const

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery,
  tagTypes: [TAG],
  endpoints: ({ mutation, query }) => ({
    getMe: query<Manager, void>({
      query: () => ({ url: '/admin/me' }),
      transformResponse: (raw) => managerSchema.parse(raw),
      providesTags: [TAG],
    }),
    login: mutation<Manager, LoginRequest>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        data,
      }),
      transformResponse: (raw) => managerSchema.parse(raw),
      invalidatesTags: [TAG],
    }),
    logout: mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      invalidatesTags: [TAG],
    }),
  }),
})

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi
