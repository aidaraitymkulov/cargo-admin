import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig } from 'axios'
import axios, { isAxiosError } from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const isAuthRequest = error.config?.url?.startsWith('/auth/')
    if (error.response?.status === 401 && !isAuthRequest) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

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
    return { error: { data: 'Unknown error' } }
  }
}
