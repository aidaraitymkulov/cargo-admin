import { z } from 'zod'

export const newsContentSchema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  content: z.string().min(1, 'Обязательное поле'),
})

export type NewsContentValues = z.infer<typeof newsContentSchema>
