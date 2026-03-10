import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useGetMeQuery } from '@/api/admin/auth/authApi'
import { setUser } from '@/api/admin/auth/authSlice'
import { useAppDispatch } from '@/hooks'

export const AuthGuard = () => {
  const dispatch = useAppDispatch()
  const { data, isLoading, isError } = useGetMeQuery()

  useEffect(() => {
    if (data) dispatch(setUser(data))
  }, [data, dispatch])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError || !data) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
