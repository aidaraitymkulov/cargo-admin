import { ChevronDown } from 'lucide-react'
import { type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '@/shared/lib/hooks'
import { cn } from '@/shared/lib/utils'

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

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  className,
}: Props) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useOutsideClick(wrapperRef, () => setOpen(false))

  useEffect(() => {
    if (!open || !listRef.current) return
    const buttons = listRef.current.querySelectorAll<HTMLButtonElement>('button')
    const selectedIdx = options.findIndex((o) => o.value === value)
    ;(buttons[selectedIdx >= 0 ? selectedIdx : 0] ?? buttons[0])?.focus()
  }, [open, options, value])

  const close = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  const handleListKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const buttons = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>('button') ?? [])
    const idx = buttons.indexOf(document.activeElement as HTMLButtonElement)

    if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      buttons[Math.min(idx + 1, buttons.length - 1)]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      idx <= 0 ? close() : buttons[idx - 1]?.focus()
    }
  }

  const selected = options.find((o) => o.value === value)

  return (
    <div ref={wrapperRef}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        className={cn(
          'w-full flex items-center justify-between gap-2 text-left',
          !selected && 'text-stone-400 dark:text-white/35',
          className,
        )}
      >
        <span className="flex-1 min-w-0 flex items-center gap-2 overflow-hidden">
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
        <div
          ref={listRef}
          role="listbox"
          onKeyDown={handleListKeyDown}
          className="mt-1.5 rounded-xl border border-stone-200/70 dark:border-white/8 bg-white dark:bg-ink-900 shadow-[0_4px_24px_rgba(0,0,0,.12)] overflow-hidden"
        >
          {options.length === 0 ? (
            <p className="px-3 py-2.5 text-sm text-stone-400 dark:text-white/35">
              Нет доступных вариантов
            </p>
          ) : (
            options.map((opt) => (
              <button
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                type="button"
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2.5 text-left transition-colors',
                  'hover:bg-stone-50 dark:hover:bg-white/5',
                  'focus:outline-none focus:bg-stone-50 dark:focus:bg-white/5',
                  opt.value === value && 'bg-stone-50 dark:bg-white/5',
                )}
              >
                {opt.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
