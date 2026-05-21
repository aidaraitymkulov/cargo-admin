export interface News {
  id: string
  image: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

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
