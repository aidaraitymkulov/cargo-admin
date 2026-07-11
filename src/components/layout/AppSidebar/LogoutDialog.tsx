import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useLogoutMutation } from '@/api/admin/auth'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui'
import { ROUTES } from '@/config'

interface LogoutDialogProps {
  open: boolean
  onCancel: () => void
}

export const LogoutDialog = ({ open, onCancel }: LogoutDialogProps) => {
  const navigate = useNavigate()
  const [logout, { isLoading }] = useLogoutMutation()

  const handleConfirm = async () => {
    try {
      await logout().unwrap()
      navigate(ROUTES.LOGIN, { replace: true })
    } catch {
      toast.error('Не удалось выйти из системы. Попробуйте снова.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Выход из системы</DialogTitle>
          <DialogDescription>Вы уверены, что хотите выйти?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Отмена
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isLoading}>
            Выйти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
