import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'

interface SidebarNavItemProps {
  item: NavItem
  collapsed: boolean
}

export const SidebarNavItem = ({ item, collapsed }: SidebarNavItemProps) => {
  const location = useLocation()
  const [open, setOpen] = useState(
    item.children ? item.children.some((c) => location.pathname.startsWith(c.href)) : false,
  )

  const hasChildren = Boolean(item.children?.length)
  const isChildActive =
    hasChildren && item.children?.some((c) => location.pathname.startsWith(c.href))

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={hasChildren ? (item.children?.[0].href ?? item.href) : item.href}
            className={({ isActive }) =>
              cn(
                'flex h-9 w-9 items-center justify-center rounded-md transition-colors',
                isActive || isChildActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
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
    return (
      <div>
        <Button
          variant="ghost"
          onClick={() => setOpen(!open)}
          className={cn(
            'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            isChildActive
              ? 'text-sidebar-foreground'
              : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
          )}
        >
          {item.icon}
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
        </Button>
        {open && (
          <div className="ml-4 flex flex-col gap-0.5 border-l border-sidebar-border pl-3 pt-1">
            {item.children?.map((child) => (
              <NavLink
                key={child.href}
                to={child.href}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-1.5 text-sm transition-colors',
                    isActive
                      ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
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
            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
        )
      }
    >
      {item.icon}
      <span>{item.label}</span>
    </NavLink>
  )
}
