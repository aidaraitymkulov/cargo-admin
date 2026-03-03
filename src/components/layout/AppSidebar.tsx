import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  Newspaper,
  Bell,
  MessageSquare,
  BarChart3,
  Building2,
  UserCog,
  ChevronDown,
  LogOut,
  Package,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  superAdminOnly?: boolean
  children?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: <LayoutDashboard className="size-4" />,
  },
  {
    label: 'Пользователи',
    href: '/users',
    icon: <Users className="size-4" />,
  },
  {
    label: 'Импорт',
    href: '/imports',
    icon: <FileSpreadsheet className="size-4" />,
  },
  {
    label: 'Новости',
    href: '/news',
    icon: <Newspaper className="size-4" />,
  },
  {
    label: 'Уведомления',
    href: '/notifications',
    icon: <Bell className="size-4" />,
  },
  {
    label: 'Чат',
    href: '/chat',
    icon: <MessageSquare className="size-4" />,
  },
  {
    label: 'Отчёты',
    href: '/reports',
    icon: <BarChart3 className="size-4" />,
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
    icon: <UserCog className="size-4" />,
    superAdminOnly: true,
  },
  {
    label: 'Филиалы',
    href: '/branches',
    icon: <Building2 className="size-4" />,
    superAdminOnly: true,
  },
]

function SidebarNavItem({
  item,
  collapsed,
}: {
  item: NavItem
  collapsed: boolean
}) {
  const location = useLocation()
  const [open, setOpen] = useState(
    item.children
      ? item.children.some((c) => location.pathname.startsWith(c.href))
      : false
  )

  const hasChildren = item.children && item.children.length > 0

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={hasChildren ? item.children![0].href : item.href}
            className={({ isActive }) =>
              cn(
                'flex h-9 w-9 items-center justify-center rounded-md transition-colors',
                isActive || (hasChildren && item.children!.some((c) => location.pathname.startsWith(c.href)))
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )
            }
          >
            {item.icon}
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {item.label}
        </TooltipContent>
      </Tooltip>
    )
  }

  if (hasChildren) {
    const isChildActive = item.children!.some((c) =>
      location.pathname.startsWith(c.href)
    )

    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            isChildActive
              ? 'text-sidebar-foreground'
              : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
          )}
        >
          {item.icon}
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown
            className={cn(
              'size-4 transition-transform',
              open && 'rotate-180'
            )}
          />
        </button>
        {open && (
          <div className="ml-4 flex flex-col gap-0.5 border-l border-sidebar-border pl-3 pt-1">
            {item.children!.map((child) => (
              <NavLink
                key={child.href}
                to={child.href}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-1.5 text-sm transition-colors',
                    isActive
                      ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                  )
                }
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <NavLink
      to={item.href}
      end={item.href === '/'}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
        )
      }
    >
      {item.icon}
      <span>{item.label}</span>
    </NavLink>
  )
}

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'flex h-full flex-col bg-sidebar transition-all duration-200',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Header */}
        <div
          className={cn(
            'flex h-14 items-center border-b border-sidebar-border px-4',
            collapsed ? 'justify-center' : 'gap-3'
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
            <Package className="size-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">
                AdesExpress
              </span>
              <span className="text-xs text-sidebar-foreground/50">
                Admin Panel
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <SidebarNavItem
                key={item.href}
                item={item}
                collapsed={collapsed}
              />
            ))}
          </div>

          <Separator className="my-4 bg-sidebar-border" />

          {/* Super Admin Section */}
          {!collapsed && (
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
              Администрирование
            </p>
          )}
          <div className="flex flex-col gap-1">
            {superAdminItems.map((item) => (
              <SidebarNavItem
                key={item.href}
                item={item}
                collapsed={collapsed}
              />
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-3">
          <div
            className={cn(
              'flex items-center',
              collapsed ? 'justify-center' : 'gap-3'
            )}
          >
            {!collapsed && (
              <div className="flex flex-1 items-center gap-3 overflow-hidden">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-accent-foreground">
                  АК
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-sm font-medium text-sidebar-foreground">
                    Админ Карго
                  </span>
                  <span className="truncate text-xs text-sidebar-foreground/50">
                    SUPER_ADMIN
                  </span>
                </div>
              </div>
            )}
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  >
                    <LogOut className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Выйти</TooltipContent>
              </Tooltip>
            ) : (
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              >
                <LogOut className="size-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <div className="border-t border-sidebar-border p-2">
          <Button
            variant="ghost"
            size={collapsed ? 'icon-sm' : 'sm'}
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              'text-sidebar-foreground/50 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
              collapsed ? 'mx-auto' : 'w-full justify-start gap-2'
            )}
          >
            {collapsed ? (
              <PanelLeft className="size-4" />
            ) : (
              <>
                <PanelLeftClose className="size-4" />
                <span>Свернуть</span>
              </>
            )}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
