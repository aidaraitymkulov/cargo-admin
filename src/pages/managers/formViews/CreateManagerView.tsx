import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useGetBranchesQuery } from '@/api/admin/branches/branchesApi'
import { useCreateManagerMutation } from '@/api/admin/managers/managersApi'
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
import { type CreateManagerFormValues, createManagerSchema } from '@/types/entities/managers'

interface Props {
  onClose: () => void
}

export const CreateManagerView = ({ onClose }: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const { data: branchesData, isError: isBranchesError } = useGetBranchesQuery()
  const [createManager, { isLoading }] = useCreateManagerMutation()

  const form = useForm<CreateManagerFormValues>({
    resolver: zodResolver(createManagerSchema),
    defaultValues: {
      login: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '+996',
      branchId: '',
    },
  })

  const onSubmit = async (values: CreateManagerFormValues) => {
    try {
      await createManager({ ...values, phone: values.phone.replace(/^\+/, '') }).unwrap()
      toast.success('Менеджер создан')
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={FORM_LABEL_CLS}>Пароль</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••"
                      autoComplete="new-password"
                      className={`${FORM_INPUT_CLS} pr-11 font-mono`}
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
            {isLoading ? 'Сохранение...' : 'Создать'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
