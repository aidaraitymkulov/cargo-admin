import type { LucideIcon } from 'lucide-react'
import type { FC } from 'react'
import { cn } from '@/shared/lib/utils'
import { Spinner } from '@/shared/ui'

interface StatsCardProps {
  title: string
  value: string
  suffix?: string
  icon: LucideIcon
  isLoading: boolean
  badge?: number
  accentBg: string
  accentText: string
}

export const StatsCard: FC<StatsCardProps> = ({
  title,
  value,
  suffix,
  icon: Icon,
  isLoading,
  badge,
  accentBg,
  accentText,
}) => {
  return (
    <div
      className={cn(
        'p-5 rounded-2xl border transition-shadow min-h-30',
        'bg-white dark:bg-ink-900',
        'border-stone-200/60 dark:border-white/6',
        'hover:shadow-[0_8px_28px_-12px_rgba(14,56,38,.18)]',
        isLoading && 'flex items-center justify-center',
      )}
    >
      {isLoading ? (
        <Spinner size="md" />
      ) : (
        <>
          <div className="flex items-start justify-between gap-2">
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                accentBg,
                accentText,
              )}
            >
              <Icon size={18} strokeWidth={1.9} />
            </div>
            {badge != null && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap bg-forest-50 dark:bg-forest-400/10 text-forest-700 dark:text-forest-400">
                +{badge} за месяц
              </span>
            )}
          </div>

          <div className="mt-4 text-[13px] font-medium text-stone-500 dark:text-white/55">
            {title}
          </div>

          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-[30px] font-bold tracking-[-0.025em] tabular-nums text-stone-900 dark:text-white leading-none">
              {value}
            </span>
            {suffix && (
              <span className="text-[14px] font-semibold text-stone-400 dark:text-white/40">
                {suffix}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
