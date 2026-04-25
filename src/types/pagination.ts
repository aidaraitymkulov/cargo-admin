export type PaginatedResponse<T> = {
  items: T[]
  page: number
  pageSize: number
  total: number
}

export type SpringPage<T> = {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
  first: boolean
  last: boolean
  empty: boolean
}
