import { Spinner } from '@/components/ui'
import { cn, type Range } from '@/lib/utils'

export const RANGES: { id: Range; label: string }[] = [
  { id: '7d', label: '7 дней' },
  { id: '30d', label: '30 дней' },
  { id: '90d', label: '90 дней' },
]

interface ChartCardShellProps {
  title: string
  subtitle: string
  total: number
  isLoading: boolean
  range: Range
  onRangeChange: (r: Range) => void
  children: React.ReactNode
}

export function ChartCardShell({
  title,
  subtitle,
  total,
  isLoading,
  range,
  onRangeChange,
  children,
}: ChartCardShellProps) {
  return (
    <div className="rounded-2xl border bg-white p-5 dark:bg-ink-900 border-stone-200/60 dark:border-white/6">
      <div className="mb-5 flex flex-wrap items-start gap-3">
        <div>
          <h3 className="text-[15px] font-bold tracking-[-0.015em] text-stone-900 dark:text-white">
            {title}
          </h3>
          <div className="mt-1.5 flex items-baseline gap-2">
            {isLoading ? (
              <Spinner size="sm" />
            ) : (
              <span className="text-[26px] font-bold tracking-[-0.025em] tabular-nums text-stone-900 dark:text-white">
                {total.toLocaleString('ru-RU')}
              </span>
            )}
            <span className="text-[12px] text-stone-400 dark:text-white/35">{subtitle}</span>
          </div>
        </div>

        <div className="ml-auto flex rounded-lg bg-stone-100/70 p-0.5 dark:bg-white/4">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => onRangeChange(r.id)}
              className={cn(
                'h-7 rounded-md px-2.5 text-[11.5px] font-semibold transition-all',
                range === r.id
                  ? 'bg-white text-stone-900 shadow-sm dark:bg-ink-800 dark:text-white'
                  : 'text-stone-500 hover:text-stone-800 dark:text-white/55 dark:hover:text-white',
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      {children}
    </div>
  )
}

export function ChartLoadingBody() {
  return (
    <div className="flex h-50 items-center justify-center">
      <Spinner />
    </div>
  )
}
