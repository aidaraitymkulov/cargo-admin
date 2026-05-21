import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Manager } from '@/types/entities/managers'

interface AuthState {
  user: Manager | null
}

const initialState: AuthState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setManager: (state, action: PayloadAction<Manager | null>) => {
      state.user = action.payload
    },
  },
})

export const { setManager } = authSlice.actions
