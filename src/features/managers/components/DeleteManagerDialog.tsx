import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { getApiErrorMessage } from '@/shared/lib'
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui'
import { useDeleteManagerMutation } from '../api/managersApi'
import type { Manager } from '../types/types'

type Props = {
  manager: Manager
  onClose: () => void
}

export const DeleteManagerDialog = ({ manager, onClose }: Props) => {
  const [deleteManager, { isLoading }] = useDeleteManagerMutation()

  const handleDelete = async () => {
    try {
      await deleteManager(manager.id).unwrap()
      toast.success('Менеджер удалён')
      onClose()
    } catch (err) {
      toast.error(getApiErrorMessage(err))
      console.error('[DeleteManagerDialog] mutation failed:', err)
    }
  }

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Удалить менеджера?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Вы собираетесь удалить{' '}
          <span className="font-medium text-foreground">
            {manager.firstName} {manager.lastName}
          </span>
          . Это действие нельзя отменить.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
