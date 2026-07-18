import { Loader2 } from 'lucide-react'
import { Navigate, Outlet } from 'react-router-dom'
import { useGetMeQuery } from '@/features/auth'
import { ROUTES } from '@/shared/config'
import { AppSidebar } from './AppSidebar/AppSidebar'

export const Layout = () => {
  const { data, isLoading, isError } = useGetMeQuery()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError || !data) return <Navigate to={ROUTES.LOGIN} replace />

  return (
    <div className="flex h-full bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
