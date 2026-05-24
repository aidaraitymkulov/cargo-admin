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
import type { NavItem } from '@/types/navigation'

export const navItems: NavItem[] = [
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

export const superAdminItems: NavItem[] = [
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
