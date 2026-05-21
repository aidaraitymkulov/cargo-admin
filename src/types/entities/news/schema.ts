import { z } from 'zod'

const MAX_FILE_SIZE = 20 * 1024 * 1024

export const newsFormSchema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  content: z.string().min(1, 'Обязательное поле'),
  image: z
    .instanceof(File, { message: 'Обязательное поле' })
    .refine((f) => f.size <= MAX_FILE_SIZE, 'Максимальный размер файла — 5 МБ'),
})

export type newsFormValues = z.infer<typeof newsFormSchema>
