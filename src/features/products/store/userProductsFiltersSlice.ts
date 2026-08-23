import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductStatus } from '@/shared/constants/enums'
import type { RootState } from '@/store'

interface UserProductsFiltersState {
  tab: ProductStatus | 'all'
  page: number
}

const initialState: UserProductsFiltersState = {
  tab: 'all',
  page: 1,
}

export const userProductsFiltersSlice = createSlice({
  name: 'userProductsFilters',
  initialState,
  reducers: {
    setUserProductsTab: (state, action: PayloadAction<ProductStatus | 'all'>) => {
      state.tab = action.payload
      state.page = 1
    },
    setUserProductsPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
  },
})

export const { setUserProductsTab, setUserProductsPage } = userProductsFiltersSlice.actions

export const selectUserProductsTab = (state: RootState) => state.userProductsFilters.tab
export const selectUserProductsPage = (state: RootState) => state.userProductsFilters.page
