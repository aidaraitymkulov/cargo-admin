import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export interface DropdownOption {
  value: string
  label: ReactNode
}

interface Props {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function Dropdown({ options, value, onChange, placeholder = 'Выберите...', className }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = options.find((o) => o.value === value)

  return (
    <div ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'w-full flex items-center justify-between gap-2 text-left',
          !selected && 'text-stone-400 dark:text-white/35',
          className,
        )}
      >
        <span className="flex-1 truncate flex items-center gap-2">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={cn(
            'shrink-0 text-stone-400 dark:text-white/35 transition-transform duration-150',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <div className="mt-1.5 rounded-xl border border-stone-200/70 dark:border-white/8 bg-white dark:bg-ink-900 shadow-[0_4px_24px_rgba(0,0,0,.12)] overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-stone-50 dark:hover:bg-white/5 transition-colors',
                opt.value === value && 'bg-stone-50 dark:bg-white/5',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
