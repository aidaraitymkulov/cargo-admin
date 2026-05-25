import { createApi } from '@reduxjs/toolkit/query/react'
import type { LoginDto } from '@/types/entities/auth'
import type { Manager } from '@/types/entities/managers'
import { axiosBaseQuery } from '../../baseQuery'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery,
  endpoints: ({ mutation, query }) => ({
    getMe: query<Manager, void>({
      query: () => ({ url: '/admin/me' }),
    }),
    login: mutation<Manager, LoginDto>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        data,
      }),
      transformResponse: (response: { success: boolean; user: Manager }) => response.user,
    }),
    logout: mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
  }),
})

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi
