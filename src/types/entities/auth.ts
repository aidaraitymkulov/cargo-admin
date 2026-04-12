import { z } from 'zod'

export const loginDtoSchema = z.object({
  login: z.string().min(1, 'Введите логин'),
  password: z.string().min(1, 'Введите пароль'),
})

export type LoginDto = z.infer<typeof loginDtoSchema>
