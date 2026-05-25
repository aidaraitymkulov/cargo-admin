import { cn } from '@/lib/utils'

const PALETTE: [string, string][] = [
  ['#4FA63A', '#0E3826'],
  ['#3b82f6', '#1d4ed8'],
  ['#8b5cf6', '#6d28d9'],
  ['#f59e0b', '#92400e'],
  ['#ec4899', '#9d174d'],
]

function paletteGrad(name: string): [string, string] {
  const h = [...name].reduce((a, c) => a + c.charCodeAt(0), 0)
  return PALETTE[h % PALETTE.length]
}

interface Props {
  firstName: string
  lastName: string
  /** Override auto-palette gradient [from, to] hex colors */
  gradient?: [string, string]
  className?: string
}

export const InitialsAvatar = ({ firstName, lastName, gradient, className }: Props) => {
  const text = ((firstName?.[0] ?? '') + (lastName?.[0] ?? '')).toUpperCase() || '??'
  const [c1, c2] = gradient ?? paletteGrad(firstName + lastName)

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-xl',
        'text-white font-bold text-[12.5px]',
        'shadow-[inset_0_1px_0_rgba(255,255,255,.2)]',
        className,
      )}
      style={{ background: `linear-gradient(135deg,${c1},${c2})` }}
    >
      {text}
    </div>
  )
}
