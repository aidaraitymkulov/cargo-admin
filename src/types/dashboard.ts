export interface DashboardSummary {
  totalUsers: number
  newUsersThisMonth: number
  productsInChina: number
  productsOnTheWay: number
  productsAwaitingPickup: number
  revenueThisWeek: number | null
}

export interface DashboardChartPoint {
  date: string
  count: number
}

export interface DashboardSummaryParams {
  branchId?: string
}

export interface DashboardChartParams {
  from: string
  to: string
  branchId?: string
}
