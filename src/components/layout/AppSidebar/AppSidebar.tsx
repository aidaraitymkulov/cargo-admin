import { LogOut, Package, PanelLeft, PanelLeftClose } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useLogoutMutation } from '@/api/admin/auth/authApi'
import { authSelectors } from '@/api/admin/auth/authSelectors'
import { setUser } from '@/api/admin/auth/authSlice'
import {
  Button,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components'
import { navItems, superAdminItems } from '@/config'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { cn } from '@/lib/utils'
import { LogoutDialog } from './LogoutDialog'
import { SidebarNavItem } from './SidebarNavitem'

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(authSelectors.user)
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation()

  const initials = user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : '??'

  const fullName = user ? `${user.firstName} ${user.lastName}` : '—'

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(setUser(null))
      navigate('/login', { replace: true })
    } catch {
      toast.error('Не удалось выйти из системы. Попробуйте снова.')
    }
  }

  const logoutButton = (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => setLogoutOpen(true)}
      className="text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
    >
      <LogOut className="size-4" />
    </Button>
  )

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'flex h-full flex-col bg-sidebar transition-all duration-200',
          collapsed ? 'w-16' : 'w-64',
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            'flex h-14 items-center border-b border-sidebar-border px-4',
            collapsed ? 'justify-center' : 'gap-3',
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
            <Package className="size-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">AdesExpress</span>
              <span className="text-xs text-sidebar-foreground/50">Admin Panel</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <SidebarNavItem key={item.href} item={item} collapsed={collapsed} />
            ))}
          </div>

          <Separator className="my-4 bg-sidebar-border" />

          {!collapsed && (
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
              Администрирование
            </p>
          )}
          <div className="flex flex-col gap-1">
            {superAdminItems.map((item) => (
              <SidebarNavItem key={item.href} item={item} collapsed={collapsed} />
            ))}
          </div>
        </nav>

        {/* User */}
        <div className="border-t border-sidebar-border p-3">
          <div className={cn('flex items-center', collapsed ? 'justify-center' : 'gap-3')}>
            {!collapsed && (
              <div className="flex flex-1 items-center gap-3 overflow-hidden">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-accent-foreground">
                  {initials}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-sm font-medium text-sidebar-foreground">
                    {fullName}
                  </span>
                  <span className="truncate text-xs text-sidebar-foreground/50">{user?.role}</span>
                </div>
              </div>
            )}
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>{logoutButton}</TooltipTrigger>
                <TooltipContent side="right">Выйти</TooltipContent>
              </Tooltip>
            ) : (
              logoutButton
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
              collapsed ? 'mx-auto' : 'w-full justify-start gap-2',
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

      <LogoutDialog
        open={logoutOpen}
        isLoading={isLoggingOut}
        onConfirm={handleLogout}
        onCancel={() => setLogoutOpen(false)}
      />
    </TooltipProvider>
  )
}
