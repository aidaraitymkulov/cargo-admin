import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthGuard } from '@/components/layout/AuthGuard'
import { LoginPage } from '@/pages/login/LoginPage'
import { Layout } from './components/layout'
import { ROUTES } from './config'
import { protectedRoutes } from './router'

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route element={<AuthGuard />}>
          <Route element={<Layout />}>
            {protectedRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
