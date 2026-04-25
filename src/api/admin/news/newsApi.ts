import { createApi } from '@reduxjs/toolkit/query/react'
import type { News, SpringPage, UpdateNewsDto } from '@/types'
import { axiosBaseQuery } from '../../baseQuery'

const NEWS_TAG = 'News' as const

type GetNewsParams = {
  page?: number
  size?: number
}

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: axiosBaseQuery,
  tagTypes: [NEWS_TAG],
  endpoints: ({ query, mutation }) => ({
    getNews: query<SpringPage<News>, GetNewsParams>({
      query: (params) => ({ url: '/admin/news', params }),
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
    updateNews: mutation<News, { id: string; data: UpdateNewsDto }>({
      query: ({ id, data }) => ({ url: `/admin/news/${id}`, method: 'PATCH', data }),
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
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi
