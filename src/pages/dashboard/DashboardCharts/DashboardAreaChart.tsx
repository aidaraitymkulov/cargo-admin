import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartPoint } from '@/lib/utils'

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ payload: ChartPoint; value?: number }>
  chartLabel: string
  color: string
}

function ChartTooltip({ active, payload, chartLabel, color }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  const point = payload[0].payload
  return (
    <div
      className="rounded-lg border border-stone-200/70 bg-white/95 px-3 py-2 text-[12px]
                    shadow-[0_4px_16px_-4px_rgba(0,0,0,.12)] backdrop-blur
                    dark:border-white/10 dark:bg-ink-800/95"
    >
      <div className="font-mono text-[10.5px] tracking-wider text-stone-500 dark:text-white/55">
        {point.fullDate}
      </div>
      <div className="mt-1 flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-stone-700 dark:text-white/85">
          <span className="h-2 w-2 rounded-sm" style={{ background: color }} />
          {chartLabel}
        </span>
        <span className="tabular-nums font-semibold text-stone-900 dark:text-white">
          {payload[0].value?.toLocaleString('ru-RU')}
        </span>
      </div>
    </div>
  )
}

export interface DashboardAreaChartProps {
  data: ChartPoint[]
  color: string
  areaId: string
  label: string
  isDark: boolean
}

export function DashboardAreaChart({
  data,
  color,
  areaId,
  label,
  isDark,
}: DashboardAreaChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-50 items-center justify-center text-[13px] text-stone-400 dark:text-white/35">
        Нет данных за период
      </div>
    )
  }

  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
  const axisColor = isDark ? 'rgba(255,255,255,0.35)' : '#a8a29e'

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.22} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 4" stroke={gridColor} vertical={false} />
        <XAxis dataKey="label" hide />
        <YAxis
          tick={{ fontSize: 10, fill: axisColor, fontFamily: 'monospace' }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          content={<ChartTooltip chartLabel={label} color={color} />}
          cursor={{ stroke: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)', strokeWidth: 1 }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${areaId})`}
          dot={false}
          activeDot={{ r: 5, fill: '#fff', stroke: color, strokeWidth: 2.5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
