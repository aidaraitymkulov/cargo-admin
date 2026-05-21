import type { LucideIcon } from 'lucide-react'
import type { FC } from 'react'
import { Card, CardContent } from '@/components/ui'

interface StatsCardProps {
  title: string
  value: string
  icon: LucideIcon
  isLoading: boolean
}

export const StatsCard: FC<StatsCardProps> = ({ title, value, icon: Icon, isLoading }) => {
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
      </CardContent>
    </Card>
  )
}
