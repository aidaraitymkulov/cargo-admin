import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { setManager, useGetMeQuery } from '@/api/admin/auth'
import { ROUTES } from '@/config'
import { useAppDispatch } from '@/hooks'

export const AuthGuard = () => {
  const dispatch = useAppDispatch()
  const { data, isLoading, isError } = useGetMeQuery()

  useEffect(() => {
    if (data) dispatch(setManager(data))
  }, [data, dispatch])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError || !data) return <Navigate to={ROUTES.LOGIN} replace />

  return <Outlet />
}
