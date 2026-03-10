import { createApi } from '@reduxjs/toolkit/query/react'
import type { LoginDto, User } from '@/types'
import { axiosBaseQuery } from '../../baseQuery'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery,
  endpoints: ({ mutation }) => ({
    login: mutation<User, LoginDto>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        data,
        headers: { 'X-Client-Type': 'web' },
      }),
      transformResponse: (response: { success: boolean; user: User }) => response.user,
    }),
    logout: mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = authApi
