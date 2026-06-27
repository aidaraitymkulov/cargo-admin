import { zodResolver } from '@hookform/resolvers/zod'
import { Hash, Loader2 } from 'lucide-react'
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
import { FORM_INPUT_CLS, FORM_LABEL_CLS, getApiErrorMessage } from '@/lib'
import { type Branch, type BranchFormValues, branchFormSchema } from '@/types/entities/branches'

type IProps = {
  onClose: () => void
  branch?: Branch
}

export const BranchFormDialog = ({ onClose, branch }: IProps) => {
  const isEdit = !!branch
  const [createBranch, { isLoading: isCreating }] = useCreateBranchMutation()
  const [updateBranch, { isLoading: isUpdating }] = useUpdateBranchMutation()
  const isLoading = isCreating || isUpdating

  const form = useForm<BranchFormValues>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: {
      address: branch?.address ?? '',
      personalCodePrefix: branch?.personalCodePrefix ?? '',
    },
  })

  const prefixValue = form.watch('personalCodePrefix')
  const prefixError = form.formState.errors.personalCodePrefix

  const onSubmit = async (values: BranchFormValues) => {
    try {
      if (isEdit) {
        await updateBranch({ id: branch.id, data: { address: values.address } }).unwrap()
        toast.success('Филиал обновлён')
      } else {
        await createBranch(values).unwrap()
        toast.success('Филиал создан')
      }
      onClose()
    } catch (err) {
      toast.error(getApiErrorMessage(err))
    }
  }

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-115">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Редактировать филиал' : 'Добавить филиал'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={FORM_LABEL_CLS}>
                    Адрес <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ул. Манаса 42, Бишкек"
                      className={FORM_INPUT_CLS}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isEdit && (
              <>
                <FormField
                  control={form.control}
                  name="personalCodePrefix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={FORM_LABEL_CLS}>
                        Префикс кода <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MN"
                          className={`${FORM_INPUT_CLS} font-mono tracking-wider`}
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase())
                          }
                        />
                      </FormControl>
                      <p className="text-xs text-stone-400 dark:text-white/35">
                        Уникальные латинские буквы. После создания не изменяется.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {prefixValue && !prefixError && (
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-forest-50 dark:bg-forest-400/10 border border-forest-100 dark:border-forest-400/20">
                    <Hash
                      size={14}
                      strokeWidth={2}
                      className="shrink-0 text-forest-600 dark:text-forest-400"
                    />
                    <span className="text-[12.5px] text-forest-800 dark:text-forest-300">
                      Клиентам будут присваиваться коды вида{' '}
                      <span className="font-mono font-bold">{prefixValue}0001</span>,{' '}
                      <span className="font-mono font-bold">{prefixValue}0002</span>…
                    </span>
                  </div>
                )}
              </>
            )}

            <DialogFooter className="mt-1">
              <Button
                type="button"
                disabled={isLoading}
                className="flex-1 h-10 rounded-xl text-[13.5px] font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 dark:bg-white/6 dark:hover:bg-white/10 dark:text-white/80 shadow-none border-0"
                onClick={onClose}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                variant="forest"
                disabled={isLoading}
                className="flex-1 h-10 rounded-xl text-[13.5px]"
              >
                {isLoading && <Loader2 className="size-4 animate-spin" />}
                {isEdit ? 'Сохранить' : 'Создать'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
