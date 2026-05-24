import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { getApiErrorMessage } from '@/lib'
import { type Manager, managerFormSchema, type managerFormValues } from '@/types/entities/managers'

type FormValues = managerFormValues

type Props = {
  onClose: () => void
  manager?: Manager
}

export const ManagerFormDialog = ({ onClose, manager }: Props) => {
  const isEdit = !!manager
  const [showPassword, setShowPassword] = useState(false)
  const { data: branchesData } = useGetBranchesQuery()
  const [createManager, { isLoading: isCreating }] = useCreateManagerMutation()
  const [updateManager, { isLoading: isUpdating }] = useUpdateManagerMutation()

  const form = useForm<FormValues>({
    resolver: zodResolver(managerFormSchema),
    defaultValues: {
      login: manager?.login ?? '',
      password: manager?.password ?? '',
      firstName: manager?.firstName ?? '',
      lastName: manager?.lastName ?? '',
      phone: manager?.phone ?? '',
      branchId: manager?.branch?.id ?? '',
    },
  })

  const { dirtyFields } = form.formState

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEdit) {
        const changedValues = Object.fromEntries(
          Object.keys(dirtyFields).map((key) => [key, values[key as keyof FormValues]]),
        )
        await updateManager({ id: manager.id, data: changedValues }).unwrap()
        toast.success('Менеджер обновлён')
      } else {
        await createManager(values).unwrap()
        toast.success('Менеджер создан')
      }
      onClose()
    } catch (err) {
      toast.error(getApiErrorMessage(err))
      console.error('[ManagerFormDialog] mutation failed:', err)
    }
  }

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Редактировать менеджера' : 'Добавить менеджера'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Айгул" {...field} />
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
                    <FormLabel>Фамилия</FormLabel>
                    <FormControl>
                      <Input placeholder="Сатыбалдиева" {...field} />
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
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <Input placeholder="aygul" autoComplete="new-password" {...field} />
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
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className="pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
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
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <Input placeholder="+996700000000" {...field} />
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
                  <FormLabel>Филиал</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите филиал" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {branchesData?.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.address} ({branch.personalCodePrefix})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
