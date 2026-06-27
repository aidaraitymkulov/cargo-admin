import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '@/components/ui'
import { cn } from '@/lib/utils'

interface IProps {
  title: string
  children?: React.ReactNode
  className?: string
}

export const PageHeader = ({ title, children, className }: IProps) => (
  <header
    className={cn(
      'sticky top-0 z-5 flex h-16 shrink-0 items-center gap-4 px-7',
      'border-b border-stone-200/70 dark:border-white/6',
      'bg-white/70 dark:bg-ink-900/70 backdrop-blur-xl',
      className,
    )}
  >
    <nav className="flex items-center gap-1.5 text-[12.5px] font-medium text-stone-400 dark:text-white/35">
      <Link to="/" className="transition-colors hover:text-stone-700 dark:hover:text-white/70">
        Главная
      </Link>
      <ChevronRight size={13} strokeWidth={2.5} />
      <span className="text-stone-900 dark:text-white">{title}</span>
    </nav>

    <div className="ml-auto flex items-center gap-2">
      {children}
      <ThemeToggle />
    </div>
  </header>
)
