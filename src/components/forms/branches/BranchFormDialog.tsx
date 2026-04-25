import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useCreateBranchMutation, useUpdateBranchMutation } from '@/api/admin/branches/branchesApi'
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui'
import { type Branch, branchFormSchema, type branchFormValues } from '@/types'

type IProps = {
  onClose: () => void
  branch?: Branch
}

export const BranchFormDialog = ({ onClose, branch }: IProps) => {
  const isEdit = !!branch
  const [createBranch, { isLoading: isCreating }] = useCreateBranchMutation()
  const [updateBranch, { isLoading: isUpdating }] = useUpdateBranchMutation()

  const form = useForm<branchFormValues>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: {
      address: branch?.address ?? '',
      personalCodePrefix: branch?.personalCodePrefix ?? '',
    },
  })

  const { dirtyFields } = form.formState

  const onSubmit = async (values: branchFormValues) => {
    try {
      if (isEdit) {
        const changedValues = Object.fromEntries(
          Object.keys(dirtyFields).map((key) => [key, values[key as keyof branchFormValues]]),
        )
        await updateBranch({ id: branch.id, data: changedValues }).unwrap()
        toast.success('Филиал обновлён')
      } else {
        await createBranch(values).unwrap()
        toast.success('Филиал создан')
      }
      onClose()
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Редактировать филиал' : 'Добавить филиал'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес</FormLabel>
                  <FormControl>
                    <Input placeholder="г. Бишкек, ул. Манаса 40" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isEdit && (
              <FormField
                control={form.control}
                name="personalCodePrefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Префикс</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="AN"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase())
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button type="submit" disabled={isCreating || isUpdating}>
                {(isCreating || isUpdating) && <Loader2 className="size-4 animate-spin" />}
                {isEdit ? 'Сохранить' : 'Добавить'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
