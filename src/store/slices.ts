import { userProductsFiltersSlice } from '@/features/products'
import { usersFiltersSlice } from '@/features/users'

export const sliceReducers = {
  usersFilters: usersFiltersSlice.reducer,
  userProductsFilters: userProductsFiltersSlice.reducer,
}
