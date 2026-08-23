import { Check, MapPin, Package, Truck } from 'lucide-react'
import { PRODUCT_STATUS, type ProductStatus, productStatusLabel } from '@/shared/constants/enums'
import { cn } from '@/shared/lib/utils'
import { Badge } from '@/shared/ui'

const STATUS_CFG: Record<ProductStatus, { cls: string; icon: typeof Package }> = {
  [PRODUCT_STATUS.IN_CHINA]: {
    cls: 'bg-sky-50 text-sky-700 border-sky-100 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20',
    icon: Package,
  },
  [PRODUCT_STATUS.ON_THE_WAY]: {
    cls: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-400/10 dark:text-amber-400 dark:border-amber-400/20',
    icon: Truck,
  },
  [PRODUCT_STATUS.IN_KG]: {
    cls: 'bg-forest-50 text-forest-700 border-forest-100 dark:bg-forest-400/10 dark:text-forest-400 dark:border-forest-400/20',
    icon: MapPin,
  },
  [PRODUCT_STATUS.DELIVERED]: {
    cls: 'bg-stone-100 text-stone-500 border-stone-200/70 dark:bg-white/6 dark:text-white/40 dark:border-white/10',
    icon: Check,
  },
}

interface IProps {
  status: ProductStatus
}

export const ProductStatusBadge = ({ status }: IProps) => {
  const { cls, icon: StatusIcon } = STATUS_CFG[status]
  return (
    <Badge className={cn('gap-1 font-semibold', cls)}>
      <StatusIcon size={10} strokeWidth={2.5} />
      {productStatusLabel[status]}
    </Badge>
  )
}
