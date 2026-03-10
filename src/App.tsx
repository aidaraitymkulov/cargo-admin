import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardLayout } from './components'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<DashboardLayout />}></Route>
    </Routes>
  )
}

export default App
