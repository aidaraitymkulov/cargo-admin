import { Outlet } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'

export function DashboardLayout() {
  return (
    <div className="flex h-full bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
