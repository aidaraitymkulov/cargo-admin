import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@/shared/api/baseQuery'
import { type PaginatedResponse, paginatedResponseSchema } from '@/shared/types/pagination'
import { type News, newsSchema } from '../types/types'

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
      transformResponse: (raw) => paginatedResponseSchema(newsSchema).parse(raw),
      providesTags: [NEWS_TAG],
    }),
    getNewsById: query<News, string>({
      query: (id) => ({ url: `/admin/news/${id}` }),
      transformResponse: (raw) => newsSchema.parse(raw),
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
