import { ArrowLeft, X } from 'lucide-react'
import { useState } from 'react'
import { Button, Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui'
import type { Manager } from '@/types/entities/managers'
import { ChangePasswordView, CreateManagerView, EditManagerInfoView } from './formViews'

type Props =
  | { mode: 'create'; onClose: () => void }
  | { mode: 'edit'; onClose: () => void; manager: Manager }

type View = 'info' | 'password'

export const ManagerFormDialog = (props: Props) => {
  const { mode, onClose } = props
  const [view, setView] = useState<View>('info')

  const title =
    mode === 'create'
      ? 'Создать менеджера'
      : view === 'password'
        ? 'Смена пароля'
        : 'Редактировать менеджера'

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="sm:max-w-120 rounded-2xl p-0 gap-0
                   bg-white dark:bg-ink-900
                   border-stone-200/70 dark:border-white/8"
        showCloseButton={false}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-stone-100 dark:border-white/6">
          <div className="flex items-center gap-2">
            {mode === 'edit' && view === 'password' && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-stone-400 hover:text-stone-700 dark:text-white/40 dark:hover:text-white -ml-1"
                onClick={() => setView('info')}
              >
                <ArrowLeft size={16} strokeWidth={2.5} />
              </Button>
            )}
            <DialogTitle className="text-[16px] font-bold tracking-tight text-stone-900 dark:text-white">
              {title}
            </DialogTitle>
          </div>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-stone-400 hover:text-stone-700 dark:text-white/40 dark:hover:text-white"
            >
              <X size={16} strokeWidth={2.5} />
            </Button>
          </DialogClose>
        </div>
        {mode === 'create' && <CreateManagerView onClose={onClose} />}
        {mode === 'edit' && view === 'info' && (
          <EditManagerInfoView
            manager={props.manager}
            onPasswordChange={() => setView('password')}
            onClose={onClose}
          />
        )}
        {mode === 'edit' && view === 'password' && (
          <ChangePasswordView
            managerId={props.manager.id}
            onBack={() => setView('info')}
            onClose={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
