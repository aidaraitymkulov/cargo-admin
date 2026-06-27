import { z } from 'zod'

export const loginRequestSchema = z.object({
  login: z.string().min(1, 'Введите логин'),
  password: z.string().min(1, 'Введите пароль'),
})

export type LoginRequest = z.infer<typeof loginRequestSchema>
