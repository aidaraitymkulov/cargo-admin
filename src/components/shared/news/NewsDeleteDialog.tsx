import { Loader2, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDeleteNewsMutation } from '@/api/admin/news'
import { Button } from '@/components/ui'
import { ROUTES } from '@/config'
import { getApiErrorMessage } from '@/lib'

interface IProps {
  id: string
  title: string
  onCancel: () => void
}

export const NewsDeleteDialog = ({ id, title, onCancel }: IProps) => {
  const navigate = useNavigate()
  const [deleteNews, { isLoading: isDeleting }] = useDeleteNewsMutation()

  const handleDelete = async () => {
    try {
      await deleteNews(id).unwrap()
      toast.success('Новость удалена')
      navigate(ROUTES.NEWS.LIST)
    } catch (err) {
      toast.error(getApiErrorMessage(err))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
      <div className="w-full max-w-100 rounded-2xl p-6 shadow-modal bg-white dark:bg-white/3 border border-stone-200/70 dark:border-white/8">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 mb-4">
          <Trash2 className="size-5" strokeWidth={1.8} />
        </div>
        <h3 className="text-[17px] font-bold text-stone-900 dark:text-white tracking-tight">
          Удалить новость?
        </h3>
        <p className="mt-2 text-[13.5px] text-stone-500 dark:text-white/55 leading-relaxed">
          «{title}» будет удалена без возможности восстановления.
        </p>
        <div className="mt-5 flex gap-2.5">
          <Button variant="outline" className="flex-1" onClick={onCancel} disabled={isDeleting}>
            Отмена
          </Button>
          <Button
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? <Loader2 className="size-4 animate-spin" /> : 'Удалить'}
          </Button>
        </div>
      </div>
    </div>
  )
}
