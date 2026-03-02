import type { LoginDto, User } from '@/types/auth'
import { api } from './client'

export const login = (data: LoginDto) =>
  api
    .post<{ success: boolean; user: User }>('/auth/login', data, {
      headers: { 'X-Client-Type': 'web' },
    })
    .then((res) => res.data.user)

export const logout = () => api.post('/auth/logout')

export const refresh = () => api.post('/auth/refresh')
