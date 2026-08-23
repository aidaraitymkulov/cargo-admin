import {
  BarChart3,
  Bell,
  Building2,
  FileSpreadsheet,
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  UserCog,
  Users,
} from 'lucide-react'
import type { NavItem } from '@/layout/AppSidebar/navigation'
import { SidebarNavItem } from './SidebarNavItem'

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: <LayoutDashboard className="size-4.5" />,
  },
  {
    label: 'Пользователи',
    href: '/users',
    icon: <Users className="size-4.5" />,
  },
  {
    label: 'Импорт',
    href: '/imports',
    icon: <FileSpreadsheet className="size-4.5" />,
  },
  {
    label: 'Новости',
    href: '/news',
    icon: <Newspaper className="size-4.5" />,
  },
  {
    label: 'Уведомления',
    href: '/notifications',
    icon: <Bell className="size-4.5" />,
  },
  {
    label: 'Чат',
    href: '/chat',
    icon: <MessageSquare className="size-4.5" />,
  },
  {
    label: 'Отчёты',
    href: '/reports',
    icon: <BarChart3 className="size-4.5" />,
    children: [
      { label: 'По заказам', href: '/reports/orders' },
      { label: 'По пользователям', href: '/reports/users' },
    ],
  },
]

const superAdminItems: NavItem[] = [
  {
    label: 'Менеджеры',
    href: '/managers',
    icon: <UserCog className="size-4.5" />,
  },
  {
    label: 'Филиалы',
    href: '/branches',
    icon: <Building2 className="size-4.5" />,
  },
]

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
