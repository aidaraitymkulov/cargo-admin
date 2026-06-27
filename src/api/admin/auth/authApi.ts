import { createApi } from '@reduxjs/toolkit/query/react'
import type { LoginRequest } from '@/types/auth'
import type { Manager } from '@/types/entities/managers'
import { managerSchema } from '@/types/entities/managers'
import { axiosBaseQuery } from '../../baseQuery'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery,
  endpoints: ({ mutation, query }) => ({
    getMe: query<Manager, void>({
      query: () => ({ url: '/admin/me' }),
      transformResponse: (raw) => managerSchema.parse(raw),
    }),
    login: mutation<Manager, LoginRequest>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        data,
      }),
      transformResponse: (response: { success: boolean; user: unknown }) =>
        managerSchema.parse(response.user),
    }),
    logout: mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
  }),
})

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi
