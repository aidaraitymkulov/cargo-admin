import { createApi } from '@reduxjs/toolkit/query/react'
import type { CreateManagerFormValues, Manager } from '@/types/entities/managers'
import { axiosBaseQuery } from '../../baseQuery'

const MANAGER_TAG = 'Manager' as const

export const managersApi = createApi({
  reducerPath: 'managersApi',
  baseQuery: axiosBaseQuery,
  tagTypes: [MANAGER_TAG],
  endpoints: ({ query, mutation }) => ({
    getManagers: query<Manager[], void>({
      query: () => ({ url: '/admin/managers' }),
      providesTags: [MANAGER_TAG],
    }),
    createManager: mutation<Manager, CreateManagerFormValues>({
      query: (data) => ({ url: '/admin/managers', method: 'POST', data }),
      invalidatesTags: [MANAGER_TAG],
    }),
    updateManager: mutation<Manager, { id: string; data: Partial<CreateManagerFormValues> }>({
      query: ({ id, data }) => ({
        url: `/admin/managers/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: [MANAGER_TAG],
    }),
    deleteManager: mutation<void, string>({
      query: (id) => ({ url: `/admin/managers/${id}`, method: 'DELETE' }),
      invalidatesTags: [MANAGER_TAG],
    }),
  }),
})

export const {
  useGetManagersQuery,
  useCreateManagerMutation,
  useUpdateManagerMutation,
  useDeleteManagerMutation,
} = managersApi
