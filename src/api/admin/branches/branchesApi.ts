import { createApi } from '@reduxjs/toolkit/query/react'
import type { Branch, CreateBranchDto, UpdateBranchDto } from '@/types'
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
    createBranch: mutation<Branch, CreateBranchDto>({
      query: (data) => ({ url: '/admin/branches', method: 'POST', data }),
      invalidatesTags: [BRANCH_TAG],
    }),
    updateBranch: mutation<Branch, { id: string; data: UpdateBranchDto }>({
      query: ({ id, data }) => ({ url: `/admin/branches/${id}`, method: 'PATCH', data }),
      invalidatesTags: [BRANCH_TAG],
    }),
  }),
})

export const { useGetBranchesQuery, useCreateBranchMutation, useUpdateBranchMutation } = branchesApi
