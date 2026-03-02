# Архитектура Frontend — Админ-панель AdesExpress

## Стек

| Категория | Технология |
|---|---|
| Сборщик | Vite + React + TypeScript |
| Роутинг | React Router v6 |
| Серверный стейт | TanStack Query (React Query) |
| HTTP-клиент | Axios |
| Формы | React Hook Form + Zod |
| UI-компоненты | shadcn/ui |
| Стилизация | Tailwind CSS + tailwind-merge + clsx + tailwindcss-animate |
| Таблицы | TanStack Table |
| Графики | Recharts |
| Загрузка файлов | react-dropzone |
| WebSocket (чат) | @stomp/stompjs + sockjs-client |
| Toast-уведомления | Sonner |
| Глобальный стейт | Zustand |
| Дата-пикер | react-day-picker (входит в shadcn) |

---

## Структура папок

```
src/
├── api/                        # Все запросы к бэкенду
│   ├── client.ts               # Axios instance (credentials: include, interceptors)
│   ├── managers.ts
│   ├── branches.ts
│   ├── users.ts
│   ├── imports.ts
│   ├── news.ts
│   ├── notifications.ts
│   ├── chat.ts
│   └── reports.ts
│
├── components/
│   ├── ui/                     # shadcn компоненты (генерируются CLI)
│   ├── layout/                 # Sidebar, Header, PageLayout
│   ├── tables/                 # Переиспользуемые таблицы с пагинацией
│   ├── forms/                  # Переиспользуемые формы
│   └── shared/                 # StatusBadge, ConfirmDialog, FileDropzone и т.д.
│
├── pages/
│   ├── LoginPage.tsx
│   ├── managers/
│   │   ├── ManagersPage.tsx
│   │   └── ManagerCreateDialog.tsx
│   ├── branches/
│   │   ├── BranchesPage.tsx
│   │   └── BranchFormDialog.tsx
│   ├── users/
│   │   ├── UsersPage.tsx
│   │   └── UserDetailPage.tsx
│   ├── imports/
│   │   └── ImportsPage.tsx
│   ├── news/
│   │   ├── NewsPage.tsx
│   │   └── NewsFormPage.tsx
│   ├── notifications/
│   │   └── NotificationsPage.tsx
│   ├── chat/
│   │   ├── ChatPage.tsx        # Список диалогов слева + чат справа
│   │   └── useChat.ts          # WebSocket логика (STOMP)
│   └── reports/
│       ├── OrdersReportPage.tsx
│       └── UsersReportPage.tsx
│
├── hooks/
│   ├── useAuth.ts              # Текущий пользователь и его роль
│   └── usePagination.ts        # Общая логика пагинации
│
├── store/
│   └── authStore.ts            # Zustand: текущий юзер + роль (минимум)
│
├── lib/
│   ├── utils.ts                # cn() = clsx + tailwind-merge
│   └── constants.ts            # Статусы, роли, pageSize и т.д.
│
├── types/                      # TypeScript типы из API контракта
│   ├── user.ts
│   ├── branch.ts
│   ├── product.ts
│   ├── order.ts
│   ├── news.ts
│   └── report.ts
│
└── router.tsx                  # Все роуты + ProtectedRoute + RoleGuard
```

---

## Авторизация и роли

Бэкенд использует **HttpOnly cookie** — фронт просто шлёт все запросы с `credentials: 'include'`, куки прикладываются автоматически.

### Axios instance

```ts
// api/client.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

// При 401 — редирект на логин
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

### Роутинг с защитой

```tsx
// router.tsx
<Route element={<ProtectedRoute />}>
  {/* Доступно всем авторизованным */}
  <Route path="/users" element={<UsersPage />} />
  <Route path="/users/:id" element={<UserDetailPage />} />
  <Route path="/imports" element={<ImportsPage />} />
  <Route path="/news" element={<NewsPage />} />
  <Route path="/notifications" element={<NotificationsPage />} />
  <Route path="/chat" element={<ChatPage />} />
  <Route path="/reports/orders" element={<OrdersReportPage />} />

  {/* Только SUPER_ADMIN */}
  <Route element={<RoleGuard roles={['SUPER_ADMIN']} />}>
    <Route path="/managers" element={<ManagersPage />} />
    <Route path="/branches" element={<BranchesPage />} />
    <Route path="/reports/users" element={<UsersReportPage />} />
  </Route>
</Route>
```

`ProtectedRoute` — проверяет наличие авторизованного юзера в Zustand store, если нет — редиректит на `/login`.
`RoleGuard` — проверяет роль из store, если не совпадает — показывает 403 или редиректит.

---

## Серверный стейт — TanStack Query

Вся работа с данными через React Query.

```ts
// api/users.ts
export const getUsers = (params: GetUsersParams) =>
  api.get('/admin/users', { params }).then(res => res.data)

// pages/users/UsersPage.tsx
const { data, isLoading } = useQuery({
  queryKey: ['users', filters],
  queryFn: () => getUsers(filters),
  placeholderData: keepPreviousData, // не мигает при смене страницы
})
```

После мутации — инвалидируем кэш:

```ts
const mutation = useMutation({
  mutationFn: createManager,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['managers'] })
    toast.success('Менеджер создан')
  },
})
```

---

## Формы — React Hook Form + Zod

```ts
const schema = z.object({
  firstName: z.string().min(1, 'Обязательное поле'),
  email: z.string().email('Некорректный email'),
  branchId: z.string().uuid('Выберите филиал'),
})

const form = useForm({ resolver: zodResolver(schema) })
```

---

## Загрузка Excel (Импорт)

Три типа импорта — один общий компонент `FileDropzone` на базе `react-dropzone`, принимает `.xlsx` / `.xls`.
Бэкенд возвращает детальный отчёт с ошибками по строкам — показываем таблицу с результатами на странице.

```ts
export const importFromChina = (file: File) => {
  const form = new FormData()
  form.append('file', file)
  return api.post('/admin/import/parcels/cn', form)
}
```

---

## Чат — WebSocket (STOMP)

```ts
// pages/chat/useChat.ts
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

const client = new Client({
  webSocketFactory: () => new SockJS('/ws/chat'),
  // cookie прикладывается автоматически браузером
})

client.onConnect = () => {
  client.subscribe('/user/queue/messages', (msg) => {
    const message = JSON.parse(msg.body)
    // добавляем в локальный стейт
  })
}

client.activate()
```

История сообщений — через REST (`GET /admin/chats/conversations/{userId}/messages`).
Новые сообщения — через WebSocket.

---

## Отчёты

- Данные в таблице (TanStack Table) и на графике (Recharts)
- Фильтры: period (day / week / month / custom) + datepicker для custom
- Экспорт в файл:

```ts
export const exportOrdersReport = async (params) => {
  const res = await api.get('/admin/reports/orders/summary/export', {
    params,
    responseType: 'blob',
  })
  const url = URL.createObjectURL(res.data)
  const a = document.createElement('a')
  a.href = url
  a.download = `report.${params.format}`
  a.click()
}
```

---

## Стилизация

- **Tailwind CSS** — основа
- **tailwind-merge** — разрешает конфликты классов
- **clsx** — условные классы
- **tailwindcss-animate** — анимации shadcn (модалки, дропдауны)

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Глобальный стейт — Zustand

Минимальный. Только авторизация:

```ts
// store/authStore.ts
interface AuthStore {
  user: User | null
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
```

Всё остальное — через TanStack Query. Redux не нужен.

---

## Разграничение доступа по ролям

| Раздел | MANAGER | SUPER_ADMIN |
|---|---|---|
| Пользователи | ✅ | ✅ |
| Импорт Excel | ✅ (только свой филиал) | ✅ (любой филиал) |
| Новости | ✅ | ✅ |
| Push-уведомления | ✅ | ✅ |
| Чат | ✅ | ✅ |
| Отчёт по заказам | ✅ (только свой филиал) | ✅ (все филиалы) |
| Менеджеры | ❌ | ✅ |
| Филиалы | ❌ | ✅ |
| Отчёт по пользователям | ❌ | ✅ |
