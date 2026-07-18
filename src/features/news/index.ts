export {
  newsApi,
  useCreateNewsMutation,
  useDeleteNewsMutation,
  useGetNewsByIdQuery,
  useGetNewsQuery,
  useUpdateNewsMutation,
} from './api/newsApi'
export { NewsCard } from './components/NewsCard'
export { NewsDeleteDialog } from './components/NewsDeleteDialog'
export { NewsFormView } from './components/NewsFormView'
export { NewsReadView } from './components/NewsReadView'
export { type NewsContentValues, newsContentSchema } from './types/schema'
export type { News } from './types/types'
