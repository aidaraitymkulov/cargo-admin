import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  tone?: 'dark' | 'light'
  className?: string
}

export const ThemeToggle = ({ tone = 'light', className }: ThemeToggleProps) => {
  const { theme, toggle } = useTheme()

  const palette =
    tone === 'dark'
      ? 'border-white/15 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white'
      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-500 hover:text-forest-700 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white/80 dark:hover:text-white'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Сменить тему"
      className={cn(
        'relative inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-all active:scale-95',
        palette,
        className,
      )}
    >
      {theme === 'dark' ? (
        <Sun strokeWidth={1.8} size={18} />
      ) : (
        <Moon strokeWidth={1.8} size={18} />
      )}
    </button>
  )
}
