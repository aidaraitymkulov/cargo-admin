import { z } from 'zod'

export const newsSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type News = z.infer<typeof newsSchema>

export type CreateNewsDto = {
  title: string
  content: string
  image: File
}

export type UpdateNewsDto = {
  title?: string
  content?: string
  image?: File
}
