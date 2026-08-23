import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { getApiErrorMessage } from '@/shared/lib'
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui'
import { useDeleteUserMutation } from '../api/usersApi'
import type { User } from '../types/types'

interface IProps {
  user: User
  onClose: () => void
  onDeleted: () => void
}

export const DeleteUserDialog = ({ user, onClose, onDeleted }: IProps) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation()

  const handleDelete = async () => {
    try {
      await deleteUser(user.id).unwrap()
      toast.success('Пользователь удалён')
      onDeleted()
    } catch (err) {
      toast.error(getApiErrorMessage(err))
      console.error('[DeleteUserDialog] mutation failed:', err)
    }
  }

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Удалить пользователя?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Данные{' '}
          <span className="font-medium text-foreground">
            {user.firstName} {user.lastName}
          </span>{' '}
          будут анонимизированы немедленно, без 30-дневного ожидания. Это действие нельзя отменить.
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
