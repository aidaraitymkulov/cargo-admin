import { AlertCircle, Building2, Loader2, MapPin, Pencil, Plus } from 'lucide-react'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import type { Branch } from '@/types/entities/branches'

const HEAD_CLS =
  'text-[10.5px] font-semibold font-mono tracking-widest uppercase text-stone-400 dark:text-white/30 h-10.5'

interface IProps {
  branches: Branch[]
  isLoading: boolean
  isError: boolean
  onAdd: () => void
  onOpenOnMap: (b: Branch) => void
}

export const BranchesTable = ({ branches, isLoading, isError, onAdd, onOpenOnMap }: IProps) => (
  <div
    className="rounded-2xl overflow-hidden bg-white dark:bg-ink-900
               border border-stone-200/60 dark:border-white/6
               shadow-[0_1px_4px_rgba(0,0,0,.04),0_4px_24px_rgba(0,0,0,.06)]"
  >
    {isLoading ? (
      <div className="flex justify-center py-24">
        <Loader2 className="size-8 animate-spin text-stone-300 dark:text-white/20" />
      </div>
    ) : isError ? (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400">
          <AlertCircle size={22} strokeWidth={1.8} />
        </div>
        <p className="text-[14px] text-stone-400 dark:text-white/35">
          Не удалось загрузить филиалы
        </p>
      </div>
    ) : branches.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-stone-100 dark:bg-ink-800 text-stone-300 dark:text-white/20">
          <Building2 size={26} strokeWidth={1.3} />
        </div>
        <div className="text-center">
          <p className="text-[15px] font-semibold text-stone-600 dark:text-white/65">
            Нет филиалов
          </p>
          <p className="mt-1 text-[13px] text-stone-400 dark:text-white/35">
            Добавьте первый филиал
          </p>
        </div>
        <Button variant="forest" className="rounded-xl mt-1" onClick={onAdd}>
          <Plus size={15} strokeWidth={2.5} />
          Добавить филиал
        </Button>
      </div>
    ) : (
      <Table>
        <colgroup>
          <col />
          <col style={{ width: 140 }} />
          <col style={{ width: 56 }} />
        </colgroup>

        <TableHeader>
          <TableRow className="h-10.5 hover:bg-transparent border-stone-100 dark:border-white/6">
            <TableHead className={`${HEAD_CLS} pl-5`}>Адрес</TableHead>
            <TableHead className={HEAD_CLS}>Префикс</TableHead>
            <TableHead className={HEAD_CLS} />
          </TableRow>
        </TableHeader>

        <TableBody>
          {branches.map((b) => (
            <TableRow
              key={b.id}
              className="border-stone-100 dark:border-white/5 hover:bg-stone-50/80 dark:hover:bg-white/2"
            >
              <TableCell className="pl-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-forest-50 dark:bg-forest-400/10 text-forest-600 dark:text-forest-400">
                    <MapPin size={16} strokeWidth={1.8} />
                  </div>
                  <span className="text-[13.5px] font-semibold text-stone-900 dark:text-white leading-snug">
                    {b.address}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <span className="inline-flex items-center h-7 px-2.5 rounded-lg font-mono text-[13px] font-bold tracking-wider bg-stone-100 dark:bg-white/6 text-stone-700 dark:text-white/80">
                  {b.personalCodePrefix}
                </span>
              </TableCell>

              <TableCell className="pr-4">
                <div className="flex items-center justify-end">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    title="Редактировать на карте"
                    className="rounded-lg text-stone-400 hover:text-stone-700 dark:text-white/40 dark:hover:text-white"
                    onClick={() => onOpenOnMap(b)}
                  >
                    <Pencil size={14} strokeWidth={2} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </div>
)
