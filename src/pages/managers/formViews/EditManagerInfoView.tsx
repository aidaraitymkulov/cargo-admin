import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useGetBranchesQuery } from '@/api/admin/branches/branchesApi'
import { useUpdateManagerMutation } from '@/api/admin/managers/managersApi'
import {
  Button,
  Dropdown,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui'
import { FORM_INPUT_CLS, FORM_LABEL_CLS, getApiErrorMessage } from '@/lib'
import { formatPhoneInput } from '@/lib/utils'
import {
  type EditManagerFormValues,
  editManagerSchema,
  type Manager,
} from '@/types/entities/managers'

interface Props {
  manager: Manager
  onPasswordChange: () => void
  onClose: () => void
}

export const EditManagerInfoView = ({ manager, onPasswordChange, onClose }: Props) => {
  const { data: branchesData, isError: isBranchesError } = useGetBranchesQuery()
  const [updateManager, { isLoading }] = useUpdateManagerMutation()

  const form = useForm<EditManagerFormValues>({
    resolver: zodResolver(editManagerSchema),
    defaultValues: {
      login: manager.login,
      firstName: manager.firstName,
      lastName: manager.lastName,
      phone: manager.phone,
      branchId: manager.branch?.id ?? '',
    },
  })

  const onSubmit = async (values: EditManagerFormValues) => {
    try {
      await updateManager({
        id: manager.id,
        data: { ...values, phone: values.phone.replace(/^\+/, '') },
      }).unwrap()
      toast.success('Менеджер обновлён')
      onClose()
    } catch (err) {
      toast.error(getApiErrorMessage(err) || 'Произошла непредвиденная ошибка')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className="relative">
        {isLoading && (
          <div className="absolute inset-0 rounded-b-2xl z-10 bg-white/70 dark:bg-ink-900/70 backdrop-blur-[2px] flex items-center justify-center">
            <Loader2 className="size-6 animate-spin text-forest-700 dark:text-forest-400" />
          </div>
        )}

        <div className="px-6 py-5 flex flex-col gap-3.5 overflow-y-auto max-h-[calc(100dvh-10rem)]">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={FORM_LABEL_CLS}>Имя</FormLabel>
                  <FormControl>
                    <Input className={FORM_INPUT_CLS} placeholder="Айгул" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={FORM_LABEL_CLS}>Фамилия</FormLabel>
                  <FormControl>
                    <Input className={FORM_INPUT_CLS} placeholder="Сатыбалдиева" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={FORM_LABEL_CLS}>Логин</FormLabel>
                <FormControl>
                  <Input
                    className={FORM_INPUT_CLS}
                    placeholder="manager_bishkek"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={FORM_LABEL_CLS}>Телефон</FormLabel>
                <FormControl>
                  <Input
                    className={`${FORM_INPUT_CLS} font-mono`}
                    placeholder="+996700000000"
                    {...field}
                    onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branchId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={FORM_LABEL_CLS}>Филиал</FormLabel>
                {isBranchesError && (
                  <p className="text-xs text-red-500 dark:text-red-400">
                    Не удалось загрузить список филиалов
                  </p>
                )}
                <FormControl>
                  <Dropdown
                    className={FORM_INPUT_CLS}
                    placeholder="— Выберите филиал —"
                    value={field.value}
                    onChange={field.onChange}
                    options={
                      branchesData?.map((b) => ({
                        value: b.id,
                        label: (
                          <>
                            <span className="font-mono font-bold text-[11px] tracking-wider text-stone-500 dark:text-white/55">
                              {b.personalCodePrefix}
                            </span>
                            <span className="text-[13px]">{b.address}</span>
                          </>
                        ),
                      })) ?? []
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="button"
            onClick={onPasswordChange}
            className="flex items-center gap-1.5 self-start text-[13px] text-stone-400 hover:text-forest-700 dark:text-white/35 dark:hover:text-forest-400 transition-colors"
          >
            <KeyRound size={13} strokeWidth={2} />
            Сменить пароль
          </button>
        </div>

        <div className="flex gap-2.5 px-6 pb-5 pt-2">
          <Button
            type="button"
            variant="cancel"
            className="flex-1 h-10 rounded-xl"
            onClick={onClose}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="forest"
            className="flex-1 h-10 rounded-xl"
            disabled={isLoading}
          >
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
