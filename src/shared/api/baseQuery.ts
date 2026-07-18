import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig } from 'axios'
import { isAxiosError } from 'axios'
import { api } from './axios'

type Args = {
  url: string
  method?: AxiosRequestConfig['method']
  data?: unknown
  params?: unknown
  headers?: Record<string, string>
}

type QueryError = {
  status?: number
  data?: unknown
}

export const axiosBaseQuery: BaseQueryFn<Args, unknown, QueryError> = async ({
  url,
  method = 'GET',
  data,
  params,
  headers,
}) => {
  try {
    const result = await api({ url, method, data, params, headers })
    return { data: result.data }
  } catch (err) {
    if (isAxiosError(err)) {
      return { error: { status: err.response?.status, data: err.response?.data } }
    }
    console.error('[axiosBaseQuery] Unexpected non-Axios error:', err)
    return { error: { data: err instanceof Error ? err.message : 'Unknown error' } }
  }
}
