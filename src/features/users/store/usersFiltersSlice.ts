import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

interface UsersFiltersState {
  search: string
  branchId: string
  page: number
}

const initialState: UsersFiltersState = {
  search: '',
  branchId: 'all',
  page: 1,
}

export const usersFiltersSlice = createSlice({
  name: 'usersFilters',
  initialState,
  reducers: {
    setUsersSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
      state.page = 1
    },
    setUsersBranchId: (state, action: PayloadAction<string>) => {
      state.branchId = action.payload
      state.page = 1
    },
    setUsersPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
  },
})

export const { setUsersSearch, setUsersBranchId, setUsersPage } = usersFiltersSlice.actions

export const selectUsersSearch = (state: RootState) => state.usersFilters.search
export const selectUsersBranchId = (state: RootState) => state.usersFilters.branchId
export const selectUsersPage = (state: RootState) => state.usersFilters.page
