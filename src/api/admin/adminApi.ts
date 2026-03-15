import { authApi } from './auth/authApi'
import { branchesApi } from './branches/branchesApi'
import { ordersApi } from './orders/ordersApi'
import { productsApi } from './products/productsApi'
import { usersApi } from './users/usersApi'

export const adminApiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [branchesApi.reducerPath]: branchesApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
}

export const adminApiMiddlewares = [
  authApi.middleware,
  branchesApi.middleware,
  ordersApi.middleware,
  productsApi.middleware,
  usersApi.middleware,
]
