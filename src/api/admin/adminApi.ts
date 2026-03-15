import { authApi } from './auth/authApi'
import { branchesApi } from './branches/branchesApi'
import { usersApi } from './users/usersApi'

export const adminApiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [branchesApi.reducerPath]: branchesApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
}

export const adminApiMiddlewares = [authApi.middleware, branchesApi.middleware, usersApi.middleware]
