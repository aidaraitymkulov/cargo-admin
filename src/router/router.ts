import { createElement } from 'react'
import { ROUTES } from '@/config'
import { BranchesMapPage, BranchesPage } from '@/pages/branches'
import { DashboardPage } from '@/pages/dashboard'
import { ManagersPage } from '@/pages/managers'
import { NewsDetailPage, NewsPage } from '@/pages/news'

export const protectedRoutes = [
  { path: ROUTES.DASHBOARD, element: createElement(DashboardPage) },
  { path: ROUTES.MANAGERS, element: createElement(ManagersPage) },
  { path: ROUTES.BRANCHES.LIST, element: createElement(BranchesPage) },
  { path: ROUTES.BRANCHES.MAP, element: createElement(BranchesMapPage) },
  { path: ROUTES.BRANCHES.MAP_FOCUS_PATTERN, element: createElement(BranchesMapPage) },
  { path: ROUTES.NEWS.LIST, element: createElement(NewsPage) },
  { path: ROUTES.NEWS.CREATE_PATTERN, element: createElement(NewsDetailPage) },
  { path: ROUTES.NEWS.DETAIL_PATTERN, element: createElement(NewsDetailPage) },
]
