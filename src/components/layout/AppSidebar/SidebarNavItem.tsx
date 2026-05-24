import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import { cn } from '@/lib'
import type { NavItem } from '@/types/navigation'

interface IProps {
  item: NavItem
  collapsed: boolean
}

export const SidebarNavItem = ({ item, collapsed }: IProps) => {
  const location = useLocation()

  const hasChildren = Boolean(item.children?.length)
  const isChildActive = hasChildren
    ? Boolean(item.children?.some((c) => location.pathname.startsWith(c.href)))
    : false
  const isActive = !hasChildren
    ? Boolean(matchPath({ path: item.href, end: item.href === '/' }, location.pathname))
    : false

  const [open, setOpen] = useState(isChildActive)

  const activeRowCls = 'bg-forest-700/8 text-forest-800 dark:bg-forest-400/12 dark:text-white'
  const inactiveRowCls =
    'text-stone-600 hover:bg-stone-900/4 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white'

  const rowBase = cn(
    'group relative flex w-full items-center rounded-lg transition-all',
    'h-10 gap-3 px-2.5',
  )

  const accentBar = (active: boolean) => (
    <span
      className={cn(
        'absolute left-0 top-1/2 -translate-y-1/2 w-0.75 rounded-r-full transition-all',
        active ? 'h-5 bg-forest-700 dark:bg-forest-400' : 'h-0',
      )}
    />
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={hasChildren ? (item.children?.[0].href ?? item.href) : item.href}
            className={cn(
              'group relative flex h-10 w-10 items-center justify-center rounded-lg transition-all',
              isActive || isChildActive
                ? 'bg-forest-700/8 text-forest-700 dark:bg-forest-400/12 dark:text-forest-400'
                : 'text-stone-600 hover:bg-stone-900/4 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white',
            )}
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
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(rowBase, isChildActive ? activeRowCls : inactiveRowCls)}
        >
          {accentBar(isChildActive)}
          <span
            className={cn(
              'shrink-0 transition-colors',
              isChildActive && 'text-forest-700 dark:text-forest-400',
            )}
          >
            {item.icon}
          </span>
          <span
            className={cn(
              'flex-1 truncate text-left text-[13.5px]',
              isChildActive ? 'font-semibold' : 'font-medium',
            )}
          >
            {item.label}
          </span>
          <ChevronDown
            size={14}
            strokeWidth={2}
            className={cn('transition-transform', open ? 'rotate-180' : 'opacity-50')}
          />
        </button>

        {open && (
          <div className="animate-rise mb-1 mt-0.5 flex flex-col gap-0.5">
            {item.children?.map((child) => {
              const childActive = location.pathname.startsWith(child.href)
              return (
                <NavLink
                  key={child.href}
                  to={child.href}
                  className={cn(
                    'flex h-8 w-full items-center rounded-lg pl-10 pr-2.5 text-[12.5px] transition-colors',
                    childActive
                      ? 'font-semibold text-forest-800 dark:text-white'
                      : 'text-stone-500 hover:text-stone-800 dark:text-white/45 dark:hover:text-white/85',
                  )}
                >
                  <span
                    className={cn(
                      'mr-3 h-1.5 w-1.5 rounded-full transition-all',
                      childActive
                        ? 'scale-100 bg-forest-500'
                        : 'scale-75 bg-stone-300 dark:bg-white/15',
                    )}
                  />
                  <span className="flex-1 text-left">{child.label}</span>
                </NavLink>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <NavLink
      to={item.href}
      end={item.href === '/'}
      className={cn(rowBase, isActive ? activeRowCls : inactiveRowCls)}
    >
      {accentBar(isActive)}
      <span
        className={cn(
          'shrink-0 transition-colors',
          isActive && 'text-forest-700 dark:text-forest-400',
        )}
      >
        {item.icon}
      </span>
      <span className={cn('text-[13.5px] truncate', isActive ? 'font-semibold' : 'font-medium')}>
        {item.label}
      </span>
    </NavLink>
  )
}
