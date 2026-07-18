import { authApi } from '@/features/auth'
import { branchesApi } from '@/features/branches'
import { dashboardApi } from '@/features/dashboard'
import { managersApi } from '@/features/managers'
import { newsApi } from '@/features/news'
import { productsApi } from '@/features/products'
import { usersApi } from '@/features/users'

export const adminApiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [branchesApi.reducerPath]: branchesApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [managersApi.reducerPath]: managersApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
}

export const adminApiMiddlewares = [
  authApi.middleware,
  branchesApi.middleware,
  dashboardApi.middleware,
  managersApi.middleware,
  newsApi.middleware,
  productsApi.middleware,
  usersApi.middleware,
]
