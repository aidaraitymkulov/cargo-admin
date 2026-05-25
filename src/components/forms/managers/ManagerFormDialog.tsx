import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useGetBranchesQuery } from '@/api/admin/branches/branchesApi'
import {
  useCreateManagerMutation,
  useUpdateManagerMutation,
} from '@/api/admin/managers/managersApi'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  Dropdown,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui'
import { getApiErrorMessage } from '@/lib'
import {
  createManagerSchema,
  type EditManagerFormValues,
  editManagerSchema,
  type Manager,
} from '@/types/entities/managers'

type FormValues = EditManagerFormValues

const LABEL_CLS = 'text-[12px] font-semibold tracking-tight text-stone-600 dark:text-white/65'
const INPUT_CLS =
  'h-[46px] rounded-xl px-3.5 text-[14px] font-medium dark:bg-ink-800 ' +
  'focus-visible:border-forest-700 dark:focus-visible:border-forest-400 ' +
  'focus-visible:ring-4 focus-visible:ring-forest-700/8 dark:focus-visible:ring-forest-400/10'

type Props = {
  onClose: () => void
  manager?: Manager
}

export const ManagerFormDialog = ({ onClose, manager }: Props) => {
  const isEdit = !!manager
  const [showPassword, setShowPassword] = useState(false)
  const { data: branchesData, isError: isBranchesError } = useGetBranchesQuery()
  const [createManager, { isLoading: isCreating }] = useCreateManagerMutation()
  const [updateManager, { isLoading: isUpdating }] = useUpdateManagerMutation()

  const form = useForm<FormValues>({
    resolver: zodResolver(isEdit ? editManagerSchema : createManagerSchema),
    defaultValues: {
      login: manager?.login ?? '',
      password: '',
      firstName: manager?.firstName ?? '',
      lastName: manager?.lastName ?? '',
      phone: manager?.phone ?? '+996',
      branchId: manager?.branch?.id ?? '',
    },
  })

  useEffect(() => {
    form.reset({
      login: manager?.login ?? '',
      password: '',
      firstName: manager?.firstName ?? '',
      lastName: manager?.lastName ?? '',
      phone: manager?.phone ?? '+996',
      branchId: manager?.branch?.id ?? '',
    })
  }, [manager?.id])

  const onSubmit = async (values: FormValues) => {
    const payload = { ...values, phone: values.phone.replace(/^\+/, '') }
    try {
      if (isEdit) {
        const { password, ...rest } = payload
        await updateManager({
          id: manager.id,
          data: password ? { ...rest, password } : rest,
        }).unwrap()
        toast.success('Менеджер обновлён')
      } else {
        const { password, ...rest } = payload
        if (!password) return
        await createManager({ ...rest, password }).unwrap()
        toast.success('Менеджер создан')
      }
      onClose()
    } catch (err) {
      if (err instanceof TypeError || err instanceof RangeError) throw err
      toast.error(getApiErrorMessage(err) || 'Произошла непредвиденная ошибка')
    }
  }

  const isLoading = isCreating || isUpdating

  return (
    <Dialog open onOpenChange={(v) => !v && !isLoading && onClose()}>
      <DialogContent
        className="sm:max-w-120 rounded-2xl p-0 gap-0
                   bg-white dark:bg-ink-900
                   border-stone-200/70 dark:border-white/8"
        showCloseButton={false}
      >
        {isLoading && (
          <div className="absolute inset-0 rounded-2xl z-20 bg-white/70 dark:bg-ink-900/70 backdrop-blur-[2px] flex items-center justify-center">
            <Loader2 className="size-6 animate-spin text-forest-700 dark:text-forest-400" />
          </div>
        )}

        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-stone-100 dark:border-white/6">
          <DialogTitle className="text-[16px] font-bold tracking-tight text-stone-900 dark:text-white">
            {isEdit ? 'Редактировать менеджера' : 'Создать менеджера'}
          </DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-stone-400 hover:text-stone-700 dark:text-white/40 dark:hover:text-white"
            >
              <X size={16} strokeWidth={2.5} />
            </Button>
          </DialogClose>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <div className="px-6 py-5 flex flex-col gap-3.5 overflow-y-auto max-h-[calc(100dvh-10rem)]">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LABEL_CLS}>Имя</FormLabel>
                      <FormControl>
                        <Input className={INPUT_CLS} placeholder="Айгул" {...field} />
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
                      <FormLabel className={LABEL_CLS}>Фамилия</FormLabel>
                      <FormControl>
                        <Input className={INPUT_CLS} placeholder="Сатыбалдиева" {...field} />
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
                    <FormLabel className={LABEL_CLS}>Логин</FormLabel>
                    <FormControl>
                      <Input
                        className={INPUT_CLS}
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={LABEL_CLS}>
                      Пароль
                      {isEdit && (
                        <span className="ml-1.5 font-normal text-stone-400 dark:text-white/35">
                          — оставьте пустым, чтобы не менять
                        </span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder={isEdit ? 'Новый пароль' : '••••••'}
                          autoComplete="new-password"
                          className={`${INPUT_CLS} pr-11 font-mono`}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute inset-y-0 right-1 my-auto text-stone-400 hover:text-stone-700 dark:text-white/35 dark:hover:text-white/70"
                        >
                          {showPassword ? (
                            <EyeOff size={15} strokeWidth={1.8} />
                          ) : (
                            <Eye size={15} strokeWidth={1.8} />
                          )}
                        </Button>
                      </div>
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
                    <FormLabel className={LABEL_CLS}>Телефон</FormLabel>
                    <FormControl>
                      <Input
                        className={`${INPUT_CLS} font-mono`}
                        placeholder="+996700000000"
                        {...field}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, '').replace(/^996/, '')
                          field.onChange('+996' + digits.slice(0, 9))
                        }}
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
                    <FormLabel className={LABEL_CLS}>Филиал</FormLabel>
                    {isBranchesError && (
                      <p className="text-xs text-red-500 dark:text-red-400">
                        Не удалось загрузить список филиалов
                      </p>
                    )}
                    <FormControl>
                      <Dropdown
                        className={INPUT_CLS}
                        placeholder="— Выберите филиал —"
                        value={field.value}
                        onChange={field.onChange}
                        options={
                          branchesData?.map((branch) => ({
                            value: branch.id,
                            label: (
                              <>
                                <span className="font-mono font-bold text-[11px] tracking-wider text-stone-500 dark:text-white/55">
                                  {branch.personalCodePrefix}
                                </span>
                                <span className="text-[13px]">{branch.address}</span>
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
            </div>

            <div className="flex gap-2.5 px-6 pb-5 pt-2">
              <Button
                type="button"
                variant="cancel"
                className="flex-1 h-10 rounded-xl"
                disabled={isLoading}
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
                {isLoading ? 'Сохранение...' : isEdit ? 'Сохранить' : 'Создать'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
