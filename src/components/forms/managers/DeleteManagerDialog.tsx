import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useDeleteManagerMutation } from '@/api/admin/managers/managersApi'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Manager } from '@/types'

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
    } catch {
      toast.error('Произошла ошибка')
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
