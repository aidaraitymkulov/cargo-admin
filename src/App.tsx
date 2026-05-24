import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthGuard } from '@/components/layout/AuthGuard'
import { LoginPage } from '@/pages/login/LoginPage'
import { NewsDetailPage, NewsPage } from '@/pages/news'
import { Layout } from './components/layout'
import { BranchesPage } from './pages/branches'
import { DashboardPage } from './pages/dashboard'
import { ManagersPage } from './pages/managers'

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthGuard />}>
          <Route element={<Layout />}>
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
