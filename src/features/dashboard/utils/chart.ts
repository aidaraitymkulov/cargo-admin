import type { DashboardChartPoint } from '../types/types'

export interface ChartPoint {
  label: string
  fullDate: string
  value: number
}

export function toChartPoints(data: DashboardChartPoint[]): ChartPoint[] {
  return data.map((d) => {
    const [year, month, day] = d.date.split('-')
    return { label: `${day}.${month}`, fullDate: `${day}.${month}.${year}`, value: d.count }
  })
}
