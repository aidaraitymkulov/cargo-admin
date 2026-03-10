import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthGuard, DashboardLayout } from '@/components'
import { DashboardPage } from '@/pages/dashboard'
import { LoginPage } from '@/pages/LoginPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AuthGuard />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
