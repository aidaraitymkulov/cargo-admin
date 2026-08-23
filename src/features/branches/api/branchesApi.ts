import { createApi } from '@reduxjs/toolkit/query/react'
import { z } from 'zod'
import { axiosBaseQuery } from '@/shared/api/baseQuery'
import { type Branch, branchSchema } from '../types/types'

const BRANCH_TAG = 'Branch' as const

export const branchesApi = createApi({
  reducerPath: 'branchesApi',
  baseQuery: axiosBaseQuery,
  tagTypes: [BRANCH_TAG],
  endpoints: ({ query, mutation }) => ({
    getBranches: query<Branch[], void>({
      query: () => ({ url: '/admin/branches' }),
      transformResponse: (raw) => z.array(branchSchema).parse(raw),
      providesTags: [BRANCH_TAG],
    }),
    createBranch: mutation<Branch, FormData>({
      query: (data) => ({
        url: '/admin/branches',
        method: 'POST',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
      invalidatesTags: [BRANCH_TAG],
    }),
    updateBranch: mutation<Branch, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/admin/branches/${id}`,
        method: 'PATCH',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
      invalidatesTags: [BRANCH_TAG],
    }),
  }),
})

export const { useGetBranchesQuery, useCreateBranchMutation, useUpdateBranchMutation } = branchesApi
