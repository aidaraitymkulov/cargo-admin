import { AlertCircle, Loader2, Pencil, Plus, Trash2, UserCog } from 'lucide-react'
import { roleLabel } from '@/shared/constants/enums'
import { fmtDate } from '@/shared/lib/utils'
import {
  Badge,
  Button,
  InitialsAvatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui'
import type { Manager } from '../types/types'

const HEAD_CLS =
  'text-[10.5px] font-semibold font-mono tracking-widest uppercase text-stone-400 dark:text-white/30 h-10.5'

interface ManagersTableProps {
  managers: Manager[]
  isLoading: boolean
  isError: boolean
  onAdd: () => void
  onEdit: (m: Manager) => void
  onDelete: (m: Manager) => void
  onRetry?: () => void
}

export const ManagersTable = ({
  managers,
  isLoading,
  isError,
  onAdd,
  onEdit,
  onDelete,
  onRetry,
}: ManagersTableProps) => (
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
          Не удалось загрузить менеджеров
        </p>
        {onRetry && (
          <Button
            variant="ghost"
            size="sm"
            className="text-stone-500 dark:text-white/50"
            onClick={onRetry}
          >
            Попробовать снова
          </Button>
        )}
      </div>
    ) : managers.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-stone-100 dark:bg-ink-800 text-stone-300 dark:text-white/20">
          <UserCog size={26} strokeWidth={1.3} />
        </div>
        <div className="text-center">
          <p className="text-[15px] font-semibold text-stone-600 dark:text-white/65">
            Нет менеджеров
          </p>
          <p className="mt-1 text-[13px] text-stone-400 dark:text-white/35">
            Создайте первого менеджера
          </p>
        </div>
        <Button variant="forest" className="rounded-xl mt-1" onClick={onAdd}>
          <Plus size={15} strokeWidth={2.5} />
          Создать менеджера
        </Button>
      </div>
    ) : (
      <Table>
        <colgroup>
          <col />
          <col style={{ width: 148 }} />
          <col />
          <col style={{ width: 108 }} />
          <col style={{ width: 108 }} />
          <col style={{ width: 76 }} />
        </colgroup>

        <TableHeader>
          <TableRow className="h-10.5 hover:bg-transparent border-stone-100 dark:border-white/6">
            <TableHead className={`${HEAD_CLS} pl-5`}>Менеджер</TableHead>
            <TableHead className={HEAD_CLS}>Телефон</TableHead>
            <TableHead className={HEAD_CLS}>Филиал</TableHead>
            <TableHead className={HEAD_CLS}>Роль</TableHead>
            <TableHead className={HEAD_CLS}>Добавлен</TableHead>
            <TableHead className={HEAD_CLS} />
          </TableRow>
        </TableHeader>

        <TableBody>
          {managers.map((m) => (
            <TableRow
              key={m.id}
              className="border-stone-100 dark:border-white/5 hover:bg-stone-50/80 dark:hover:bg-white/2"
            >
              <TableCell className="pl-5 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <InitialsAvatar
                    firstName={m.firstName}
                    lastName={m.lastName}
                    className="shrink-0 w-9 h-9"
                  />
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-stone-900 dark:text-white truncate">
                      {m.firstName} {m.lastName}
                    </p>
                    <p className="text-xs font-mono text-stone-400 dark:text-white/38 truncate">
                      {m.login}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="text-xs font-mono font-medium text-stone-600 dark:text-white/65">
                {m.phone}
              </TableCell>

              <TableCell>
                {m.branch ? (
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="shrink-0 inline-flex items-center h-5.5 px-2 rounded-md font-mono text-[11px] font-bold tracking-wider bg-stone-100 dark:bg-white/6 text-stone-500 dark:text-white/55">
                      {m.branch.personalCodePrefix}
                    </span>
                    <span className="text-[12.5px] text-stone-500 dark:text-white/50 truncate">
                      {m.branch.address}
                    </span>
                  </div>
                ) : (
                  <span className="text-[12.5px] text-stone-300 dark:text-white/20">—</span>
                )}
              </TableCell>

              <TableCell>
                <Badge className="bg-forest-50 text-forest-700 border-forest-100 dark:bg-forest-400/10 dark:text-forest-400 dark:border-forest-400/20">
                  {roleLabel[m.role]}
                </Badge>
              </TableCell>

              <TableCell className="text-[12px] text-stone-400 dark:text-white/32 font-medium">
                {fmtDate(m.createdAt)}
              </TableCell>

              <TableCell className="pr-4">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    title="Редактировать"
                    className="rounded-lg text-stone-400 hover:text-stone-700 dark:text-white/40 dark:hover:text-white"
                    onClick={() => onEdit(m)}
                  >
                    <Pencil size={14} strokeWidth={2} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    title="Удалить"
                    className="rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 dark:text-white/40 dark:hover:text-red-400 dark:hover:bg-red-500/10"
                    onClick={() => onDelete(m)}
                  >
                    <Trash2 size={14} strokeWidth={2} />
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
