import { authApi } from './auth/authApi'
import { branchesApi } from './branches/branchesApi'
import { managersApi } from './managers/managersApi'
import { newsApi } from './news/newsApi'
import { ordersApi } from './orders/ordersApi'
import { productsApi } from './products/productsApi'
import { usersApi } from './users/usersApi'

export const adminApiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [branchesApi.reducerPath]: branchesApi.reducer,
  [managersApi.reducerPath]: managersApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
}

export const adminApiMiddlewares = [
  authApi.middleware,
  branchesApi.middleware,
  managersApi.middleware,
  newsApi.middleware,
  ordersApi.middleware,
  productsApi.middleware,
  usersApi.middleware,
]
