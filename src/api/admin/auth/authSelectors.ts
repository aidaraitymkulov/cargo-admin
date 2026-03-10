import type { RootState } from '@/store'

export const authSelectors = {
  user: (state: RootState) => state.auth.user,
}
