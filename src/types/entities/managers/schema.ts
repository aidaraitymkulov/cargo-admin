import { z } from 'zod'

export const managerFormSchema = z.object({
  login: z.string().min(3, 'Логин должен содержать не менее 3 символов'),
  password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
  firstName: z.string().min(1, 'Обязательное поле'),
  lastName: z.string().min(1, 'Обязательное поле'),
  phone: z.string().min(1, 'Обязательное поле'),
  branchId: z.string().uuid('Выберите филиал'),
})

export type managerFormValues = z.infer<typeof managerFormSchema>
