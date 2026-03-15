import { createApi } from '@reduxjs/toolkit/query/react'
import type { Branch, PaginatedResponse } from '@/types'
import { axiosBaseQuery } from '../../baseQuery'

type GetBranchesParams = {
  page?: number
  pageSize?: number
}

export const branchesApi = createApi({
  reducerPath: 'branchesApi',
  baseQuery: axiosBaseQuery,
  endpoints: ({ query }) => ({
    getBranches: query<PaginatedResponse<Branch>, GetBranchesParams>({
      query: (params) => ({ url: '/admin/branches', params }),
    }),
  }),
})

export const { useGetBranchesQuery } = branchesApi
