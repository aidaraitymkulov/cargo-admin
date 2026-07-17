import { zodResolver } from '@hookform/resolvers/zod'
import { Hash, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useCreateBranchMutation } from '@/api/admin/branches/branchesApi'
import {
  Button,
  Dialog,
  DialogContent,
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

interface Props {
  onClose: () => void
  onCreated: (branch: Branch) => void
}

export const BranchCreateForm = ({ onClose, onCreated }: Props) => {
  const [createBranch, { isLoading }] = useCreateBranchMutation()

  const form = useForm<BranchFormValues>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: { address: '', personalCodePrefix: '' },
  })

  const prefixValue = form.watch('personalCodePrefix')
  const prefixError = form.formState.errors.personalCodePrefix

  const onSubmit = async (values: BranchFormValues) => {
    try {
      const formData = new FormData()
      formData.append('address', values.address)
      formData.append('personalCodePrefix', values.personalCodePrefix)
      const created = await createBranch(formData).unwrap()
      toast.success('Филиал создан')
      onCreated(created)
      onClose()
    } catch (err) {
      toast.error(getApiErrorMessage(err))
    }
  }

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-115">
        <DialogHeader>
          <DialogTitle>Добавить филиал</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 relative">
            {isLoading && (
              <div className="absolute inset-0 rounded-b-2xl z-10 bg-white/70 dark:bg-ink-900/70 backdrop-blur-[2px] flex items-center justify-center">
                <Loader2 className="size-6 animate-spin text-forest-700 dark:text-forest-400" />
              </div>
            )}

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
                      className={FORM_INPUT_CLS}
                      placeholder="ул. Манаса 42, Бишкек"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <div className="flex gap-2.5 mt-1">
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
                Создать
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
