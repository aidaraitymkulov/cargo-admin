import { authApi } from './auth/authApi'

export const adminApiReducers = {
  [authApi.reducerPath]: authApi.reducer,
}

export const adminApiMiddlewares = [authApi.middleware]
