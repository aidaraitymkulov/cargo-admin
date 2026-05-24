import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useState } from 'react'
import { TooltipProvider } from '@/components/ui'
import { cn } from '@/lib/utils'
import { LogoutDialog } from './LogoutDialog'
import { SidebarHeader } from './SidebarHeader'
import { SidebarNav } from './SidebarNav'
import { SidebarUser } from './SidebarUser'

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'relative flex h-full shrink-0 flex-col transition-[width] duration-300',
          'bg-white dark:bg-ink-900',
          'border-r border-stone-200/70 dark:border-white/6',
          collapsed ? 'w-17' : 'w-61',
        )}
      >
        <SidebarHeader collapsed={collapsed} />

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Развернуть' : 'Свернуть'}
          className="absolute -right-3 top-13 z-10 flex h-6 w-6 items-center justify-center
                     rounded-full border border-stone-200/70 bg-white shadow-sm
                     text-stone-500 transition-colors hover:text-forest-700
                     dark:border-white/10 dark:bg-ink-800 dark:text-white/60 dark:hover:text-forest-400"
        >
          {collapsed ? (
            <ChevronsRight size={13} strokeWidth={2.5} />
          ) : (
            <ChevronsLeft size={13} strokeWidth={2.5} />
          )}
        </button>

        <SidebarNav collapsed={collapsed} />

        <SidebarUser collapsed={collapsed} onLogout={() => setLogoutOpen(true)} />
      </aside>

      <LogoutDialog open={logoutOpen} onCancel={() => setLogoutOpen(false)} />
    </TooltipProvider>
  )
}
