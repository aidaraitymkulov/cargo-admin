import { z } from 'zod'

export const branchFormSchema = z.object({
  address: z.string().min(1, 'Обязательное поле'),
  personalCodePrefix: z
    .string()
    .min(1, 'Обязательное поле')
    .regex(/^[A-Z]+$/, 'Только латинские буквы'),
})

export type BranchFormValues = z.infer<typeof branchFormSchema>
