import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface LogoutDialogProps {
  open: boolean
  isLoading: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const LogoutDialog = ({ open, isLoading, onConfirm, onCancel }: LogoutDialogProps) => (
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
        <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
          Выйти
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
