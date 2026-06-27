import { z } from 'zod'

const phoneRegex = /^\+996\d{9}$/

const baseSchema = z.object({
  login: z.string().min(3, 'Минимум 3 символа'),
  firstName: z.string().min(1, 'Обязательное поле'),
  lastName: z.string().min(1, 'Обязательное поле'),
  phone: z.string().regex(phoneRegex, 'Формат: +996XXXXXXXXX (9 цифр)'),
  branchId: z.string().uuid('Выберите филиал'),
})

export const createManagerSchema = baseSchema.extend({
  password: z.string().min(6, 'Минимум 6 символов'),
})

export const editManagerSchema = baseSchema

export const changePasswordSchema = z.object({
  password: z.string().min(6, 'Минимум 6 символов'),
})

export type CreateManagerFormValues = z.infer<typeof createManagerSchema>
export type EditManagerFormValues = z.infer<typeof editManagerSchema>
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>
