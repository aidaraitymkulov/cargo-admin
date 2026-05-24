import { Package } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface IProps {
  collapsed: boolean
}

export const SidebarHeader = ({ collapsed }: IProps) => (
  <div
    className={cn(
      'flex h-16 items-center border-b border-stone-200/70 dark:border-white/6',
      collapsed ? 'justify-center px-2' : 'gap-2.5 px-4',
    )}
  >
    <div
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                 bg-linear-to-br from-forest-700 to-forest-900 text-white
                 shadow-[inset_0_1px_0_rgba(255,255,255,.18)]"
    >
      <Package size={18} strokeWidth={2} />
      <span
        className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full
                   bg-forest-400 ring-2 ring-white dark:ring-ink-900"
      />
    </div>
    {!collapsed && (
      <div className="overflow-hidden leading-tight">
        <div className="text-[14px] font-bold tracking-tight text-stone-900 dark:text-white">
          AdesExpress
        </div>
        <div className="mt-0.5 font-mono text-[10px] font-semibold tracking-[.14em] text-forest-700 dark:text-forest-400">
          ADMIN · PANEL
        </div>
      </div>
    )}
  </div>
)
