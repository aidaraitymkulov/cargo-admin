import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthGuard, DashboardLayout } from '@/components'
import { LoginPage } from '@/pages/LoginPage'
import { BranchesPage } from './pages/branches'
import { DashboardPage } from './pages/dashboard'
import { ManagersPage } from './pages/managers'

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthGuard />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/managers" element={<ManagersPage />} />
            <Route path="/branches" element={<BranchesPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
