import { cn } from '@/lib/utils'

export const BADGE_VARIANT = {
  GREEN: 'green',
  AMBER: 'amber',
  BLUE: 'blue',
  PURPLE: 'purple',
  GRAY: 'gray',
} as const

export type BadgeVariant = (typeof BADGE_VARIANT)[keyof typeof BADGE_VARIANT]

const variants: Record<BadgeVariant, string> = {
  green:
    'bg-forest-50 dark:bg-forest-400/10 text-forest-700 dark:text-forest-400 border-forest-50 dark:border-forest-400/20',
  amber:
    'bg-amber-50 dark:bg-amber-400/10 text-amber-700 dark:text-amber-400 border-amber-200/70 dark:border-amber-400/20',
  blue: 'bg-blue-50 dark:bg-blue-400/10 text-blue-700 dark:text-blue-400 border-blue-200/70 dark:border-blue-400/20',
  purple:
    'bg-purple-50 dark:bg-purple-400/10 text-purple-700 dark:text-purple-400 border-purple-200/70 dark:border-purple-400/20',
  gray: 'bg-stone-100 dark:bg-white/6 text-stone-600 dark:text-white/55 border-stone-200/70 dark:border-white/10',
}

interface Props {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export const Badge = ({ children, variant = BADGE_VARIANT.GRAY, className }: Props) => (
  <span
    className={cn(
      'inline-flex items-center h-5.5 px-2 rounded-md border',
      'text-[10.5px] font-bold tracking-wide',
      variants[variant],
      className,
    )}
  >
    {children}
  </span>
)
