import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { adminApiMiddlewares, adminApiReducers } from '@/api/admin/adminApi'
import { adminSlices } from '@/api/admin/adminSlice'

const rootReducer = combineReducers({
  ...adminApiReducers,
  ...adminSlices,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...adminApiMiddlewares),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
