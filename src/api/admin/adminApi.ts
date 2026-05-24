import { authApi } from './auth/authApi'
import { branchesApi } from './branches/branchesApi'
import { dashboardApi } from './dashboard/dashboardApi'
import { managersApi } from './managers/managersApi'
import { newsApi } from './news/newsApi'
import { productsApi } from './products/productsApi'
import { usersApi } from './users/usersApi'

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
