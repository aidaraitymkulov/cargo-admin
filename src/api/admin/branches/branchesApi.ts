import { createApi } from '@reduxjs/toolkit/query/react'
import type { Branch, BranchFormValues } from '@/types/entities/branches'
import { axiosBaseQuery } from '../../baseQuery'

const BRANCH_TAG = 'Branch' as const

export const branchesApi = createApi({
  reducerPath: 'branchesApi',
  baseQuery: axiosBaseQuery,
  tagTypes: [BRANCH_TAG],
  endpoints: ({ query, mutation }) => ({
    getBranches: query<Branch[], void>({
      query: () => ({ url: '/admin/branches' }),
      providesTags: [BRANCH_TAG],
    }),
    createBranch: mutation<Branch, BranchFormValues>({
      query: (data) => ({ url: '/admin/branches', method: 'POST', data }),
      invalidatesTags: [BRANCH_TAG],
    }),
    updateBranch: mutation<Branch, { id: string; data: Partial<BranchFormValues> }>({
      query: ({ id, data }) => ({ url: `/admin/branches/${id}`, method: 'PATCH', data }),
      invalidatesTags: [BRANCH_TAG],
    }),
  }),
})

export const { useGetBranchesQuery, useCreateBranchMutation, useUpdateBranchMutation } = branchesApi
