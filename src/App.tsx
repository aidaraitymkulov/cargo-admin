import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { UsersPage } from '@/pages/users/UsersPage'
import { ManagersPage } from '@/pages/managers/ManagersPage'
import { BranchesPage } from '@/pages/branches/BranchesPage'
import { ImportsPage } from '@/pages/imports/ImportsPage'
import { NewsPage } from '@/pages/news/NewsPage'
import { NotificationsPage } from '@/pages/notifications/NotificationsPage'
import { ChatPage } from '@/pages/chat/ChatPage'
import { OrdersReportPage } from '@/pages/reports/OrdersReportPage'
import { UsersReportPage } from '@/pages/reports/UsersReportPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="managers" element={<ManagersPage />} />
          <Route path="branches" element={<BranchesPage />} />
          <Route path="imports" element={<ImportsPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="reports/orders" element={<OrdersReportPage />} />
          <Route path="reports/users" element={<UsersReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
