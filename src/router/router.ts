import { createElement } from 'react'
import { ROUTES } from '@/config'
import { BranchesPage } from '@/pages/branches'
import { DashboardPage } from '@/pages/dashboard'
import { ManagersPage } from '@/pages/managers'
import { NewsDetailPage, NewsPage } from '@/pages/news'

export const protectedRoutes = [
  { path: ROUTES.DASHBOARD, element: createElement(DashboardPage) },
  { path: ROUTES.MANAGERS, element: createElement(ManagersPage) },
  { path: ROUTES.BRANCHES, element: createElement(BranchesPage) },
  { path: ROUTES.NEWS.LIST, element: createElement(NewsPage) },
  { path: ROUTES.NEWS.DETAIL_PATTERN, element: createElement(NewsDetailPage) },
]
