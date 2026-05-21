import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthGuard, DashboardLayout } from '@/components'
import { LoginPage } from '@/pages/LoginPage'
import { NewsDetailPage, NewsPage } from '@/pages/news'
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
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:id" element={<NewsDetailPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
