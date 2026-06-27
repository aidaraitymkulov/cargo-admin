import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui'
import type { Branch } from '@/types/entities/branches'
import { BranchCreateForm } from './forms/BranchCreateForm'
import { BranchEditForm } from './forms/BranchEditForm'

type Props =
  | { mode: 'create'; onClose: () => void }
  | { mode: 'edit'; onClose: () => void; branch: Branch }

export const BranchFormDialog = (props: Props) => {
  const { mode, onClose } = props

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-115">
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'Редактировать филиал' : 'Добавить филиал'}</DialogTitle>
        </DialogHeader>

        {mode === 'create' && <BranchCreateForm onClose={onClose} />}
        {mode === 'edit' && <BranchEditForm branch={props.branch} onClose={onClose} />}
      </DialogContent>
    </Dialog>
  )
}
