import { z } from 'zod'

export const dashboardSummarySchema = z.object({
  totalUsers: z.number(),
  newUsersThisMonth: z.number(),
  productsInChina: z.number(),
  productsOnTheWay: z.number(),
  productsAwaitingPickup: z.number(),
  revenueThisWeek: z.number().nullable(),
})

export const dashboardChartPointSchema = z.object({
  date: z.string(),
  count: z.number(),
})

export type DashboardSummary = z.infer<typeof dashboardSummarySchema>
export type DashboardChartPoint = z.infer<typeof dashboardChartPointSchema>
