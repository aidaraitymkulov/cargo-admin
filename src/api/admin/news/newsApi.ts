import { createApi } from '@reduxjs/toolkit/query/react'
import type { News } from '@/types/entities/news'
import type { PaginatedResponse } from '@/types/pagination'
import { axiosBaseQuery } from '../../baseQuery'

const NEWS_TAG = 'News' as const

type GetNewsParams = {
  page?: number
  pageSize?: number
}

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: axiosBaseQuery,
  tagTypes: [NEWS_TAG],
  endpoints: ({ query, mutation }) => ({
    getNews: query<PaginatedResponse<News>, GetNewsParams>({
      query: (params) => ({ url: '/admin/news', params }),
      providesTags: [NEWS_TAG],
    }),
    getNewsById: query<News, string>({
      query: (id) => ({ url: `/admin/news/${id}` }),
      providesTags: [NEWS_TAG],
    }),
    createNews: mutation<News, FormData>({
      query: (data) => ({
        url: '/admin/news',
        method: 'POST',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
      invalidatesTags: [NEWS_TAG],
    }),
    updateNews: mutation<News, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/admin/news/${id}`,
        method: 'PATCH',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
      invalidatesTags: [NEWS_TAG],
    }),
    deleteNews: mutation<void, string>({
      query: (id) => ({ url: `/admin/news/${id}`, method: 'DELETE' }),
      invalidatesTags: [NEWS_TAG],
    }),
  }),
})

export const {
  useGetNewsQuery,
  useGetNewsByIdQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi
