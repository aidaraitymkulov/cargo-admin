import { BranchesMapPage, BranchesPage } from '@/pages/branches'
import { DashboardPage } from '@/pages/dashboard'
import { ManagersPage } from '@/pages/managers'
import { NewsDetailPage, NewsPage } from '@/pages/news'
import { UserDetailPage, UsersPage } from '@/pages/users'
import { ROUTES } from './routes'

export const protectedRoutes = [
  { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
  { path: ROUTES.MANAGERS, element: <ManagersPage /> },
  { path: ROUTES.BRANCHES.LIST, element: <BranchesPage /> },
  { path: ROUTES.BRANCHES.MAP, element: <BranchesMapPage /> },
  {
    path: ROUTES.BRANCHES.MAP_FOCUS_PATTERN,
    element: <BranchesMapPage />,
  },
  { path: ROUTES.NEWS.LIST, element: <NewsPage /> },
  { path: ROUTES.NEWS.CREATE_PATTERN, element: <NewsDetailPage /> },
  { path: ROUTES.NEWS.DETAIL_PATTERN, element: <NewsDetailPage /> },
  { path: ROUTES.USERS.LIST, element: <UsersPage /> },
  { path: ROUTES.USERS.DETAIL_PATTERN, element: <UserDetailPage /> },
]
