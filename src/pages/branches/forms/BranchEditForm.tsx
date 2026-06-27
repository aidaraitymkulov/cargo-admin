import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useUpdateBranchMutation } from '@/api/admin/branches/branchesApi'
import {
  Button,
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
  branch: Branch
  onClose: () => void
}

export const BranchEditForm = ({ branch, onClose }: Props) => {
  const [updateBranch, { isLoading }] = useUpdateBranchMutation()

  const form = useForm<BranchFormValues>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: {
      address: branch.address,
      personalCodePrefix: branch.personalCodePrefix,
    },
  })

  const onSubmit = async (values: BranchFormValues) => {
    try {
      await updateBranch({ id: branch.id, data: { address: values.address } }).unwrap()
      toast.success('Филиал обновлён')
      onClose()
    } catch (err) {
      toast.error(getApiErrorMessage(err))
    }
  }

  return (
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
                <Input className={FORM_INPUT_CLS} placeholder="ул. Манаса 42, Бишкек" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
            Сохранить
          </Button>
        </div>
      </form>
    </Form>
  )
}
