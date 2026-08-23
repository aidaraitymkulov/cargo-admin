import { z } from 'zod'

const phoneRegex = /^\+996\d{9}$/

export const branchFormSchema = z.object({
  address: z.string().min(1, 'Обязательное поле'),
  personalCodePrefix: z
    .string()
    .min(1, 'Обязательное поле')
    .regex(/^[A-Z]+$/, 'Только латинские буквы'),
})

export type BranchFormValues = z.infer<typeof branchFormSchema>

export const branchLocationSchema = z.object({
  address: z.string().min(1, 'Обязательное поле'),
  phone: z.union([z.literal(''), z.string().regex(phoneRegex, 'Формат: +996XXXXXXXXX (9 цифр)')]),
  workingHours: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

export type BranchLocationValues = z.infer<typeof branchLocationSchema>
