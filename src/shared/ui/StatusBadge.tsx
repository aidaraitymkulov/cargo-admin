import { PARCEL_STATUS, type ParcelStatus, parcelStatusLabel } from '@/shared/constants/enums'
import { cn } from '@/shared/lib/utils'
import { Badge } from './badge'

export const StatusBadge = ({ status }: { status: ParcelStatus }) => {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'text-xs font-medium',
        status === PARCEL_STATUS.DELIVERED
          ? 'bg-primary/10 text-primary'
          : 'bg-chart-4/15 text-chart-4',
      )}
    >
      {parcelStatusLabel[status]}
    </Badge>
  )
}
