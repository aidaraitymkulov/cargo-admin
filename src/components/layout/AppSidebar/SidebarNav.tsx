import { navItems, superAdminItems } from '@/config'
import { SidebarNavItem } from './SidebarNavItem'

interface IProps {
  collapsed: boolean
}

export const SidebarNav = ({ collapsed }: IProps) => (
  <nav className="flex flex-1 flex-col overflow-y-auto px-2 py-3">
    {!collapsed && (
      <div className="px-2.5 pb-1.5 pt-1 font-mono text-[10px] font-semibold tracking-[.14em] text-stone-400 dark:text-white/35">
        ОБЩЕЕ
      </div>
    )}
    <div className="flex flex-col gap-0.5">
      {navItems.map((item) => (
        <SidebarNavItem key={item.href} item={item} collapsed={collapsed} />
      ))}
    </div>

    <div className="mt-3 flex flex-col gap-0.5 border-t border-stone-200/70 pt-3 dark:border-white/6">
      {!collapsed && (
        <div className="px-2.5 pb-1.5 font-mono text-[10px] font-semibold tracking-[.14em] text-stone-400 dark:text-white/35">
          АДМИНИСТРИРОВАНИЕ
        </div>
      )}
      {superAdminItems.map((item) => (
        <SidebarNavItem key={item.href} item={item} collapsed={collapsed} />
      ))}
    </div>
  </nav>
)
