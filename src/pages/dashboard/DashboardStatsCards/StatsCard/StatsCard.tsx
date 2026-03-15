import { type LucideIcon, TrendingDown, TrendingUp } from 'lucide-react'
import type { FC } from 'react'
import { Card, CardContent } from '@/components'
import { cn } from '@/lib'

interface StatsCardProps {
  title: string
  value: string
  change: string
  description: string
  trend: 'up' | 'down'
  icon: LucideIcon
  isLoading?: boolean
}

export const StatsCard: FC<StatsCardProps> = ({
  title,
  value,
  change,
  description,
  trend,
  icon: Icon,
  isLoading = false,
}) => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            {isLoading ? (
              <div className="h-8 w-24 animate-pulse rounded bg-muted" />
            ) : (
              <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
            )}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="size-5 text-primary" />
          </div>
        </div>

        {!isLoading && (
          <div className="mt-3 flex items-center gap-1.5">
            {trend === 'up' ? (
              <TrendingUp className="size-3.5 text-primary" />
            ) : (
              <TrendingDown className="size-3.5 text-destructive" />
            )}
            <span
              className={cn(
                'text-xs font-medium',
                trend === 'up' ? 'text-primary' : 'text-destructive',
              )}
            >
              {change}
            </span>
            <span className="text-xs text-muted-foreground">{description}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
