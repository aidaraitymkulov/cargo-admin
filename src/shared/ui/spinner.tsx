import { cn } from '@/shared/lib/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClass: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: 'size-4 border-2',
  md: 'size-5 border-2',
  lg: 'size-7 border-[3px]',
}

export const Spinner = ({ size = 'md', className }: SpinnerProps) => (
  <span
    className={cn(
      'inline-block animate-spin rounded-full',
      'border-muted border-t-foreground',
      sizeClass[size],
      className,
    )}
  />
)
