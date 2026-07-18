import axios from 'axios'
import { API_URL } from '../lib'

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'X-Client-Type': 'web',
  },
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config
    const isAuthRequest = originalRequest?.url?.startsWith('/auth/')

    if (error.response?.status === 401 && !isAuthRequest && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await api.post('/auth/refresh')
        return api(originalRequest)
      } catch (refreshErr) {
        console.error('[axios] Token refresh failed:', refreshErr)
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)
