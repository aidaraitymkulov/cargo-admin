import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useUpdateManagerMutation } from '@/api/admin/managers/managersApi'
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
import { type ChangePasswordFormValues, changePasswordSchema } from '@/types/entities/managers'

interface Props {
  managerId: string
  onBack: () => void
  onClose: () => void
}

export const ChangePasswordView = ({ managerId, onBack, onClose }: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const [updateManager, { isLoading }] = useUpdateManagerMutation()

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { password: '' },
  })

  const onSubmit = async ({ password }: ChangePasswordFormValues) => {
    try {
      await updateManager({ id: managerId, data: { password } }).unwrap()
      toast.success('Пароль изменён')
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

        <div className="px-6 py-5 flex flex-col gap-3.5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={FORM_LABEL_CLS}>Новый пароль</FormLabel>
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
        </div>

        <div className="flex gap-2.5 px-6 pb-5 pt-2">
          <Button
            type="button"
            variant="cancel"
            className="flex-1 h-10 rounded-xl"
            onClick={onBack}
          >
            Назад
          </Button>
          <Button
            type="submit"
            variant="forest"
            className="flex-1 h-10 rounded-xl"
            disabled={isLoading}
          >
            {isLoading ? 'Сохранение...' : 'Сохранить пароль'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
