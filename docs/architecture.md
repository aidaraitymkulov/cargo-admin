# Архитектура Frontend — Админ-панель AdesExpress

## Стек

| Категория | Технология |
|---|---|
| Сборщик | Vite + React + TypeScript |
| Роутинг | React Router v6 |
| Серверный стейт | RTK Query (@reduxjs/toolkit) |
| HTTP-клиент | Axios |
| Формы | React Hook Form + Zod |
| UI-компоненты | shadcn/ui |
| Стилизация | Tailwind CSS + tailwind-merge + clsx + tailwindcss-animate |
| Таблицы | TanStack Table |
| Графики | Recharts |
| Загрузка файлов | react-dropzone |
| WebSocket (чат) | @stomp/stompjs + sockjs-client |
| Toast-уведомления | Sonner |
| Глобальный стейт | Redux Toolkit (authSlice) |
| Дата-пикер | react-day-picker (входит в shadcn) |

---

## Структура папок

```
src/
├── api/                        # HTTP-клиент и RTK Query API
│   ├── baseQuery.ts            # Axios instance (credentials, interceptors) + axiosBaseQuery
│   ├── authApi.ts              # createApi: login, logout
│   └── index.ts                # Реэкспорт authApi и хуков
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
│   ├── store.ts                # Redux configureStore
│   ├── authSlice.ts            # Redux slice: user | null + setUser
│   └── index.ts                # Реэкспорт всего из store
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

Axios instance создаётся внутри `api/baseQuery.ts` и не экспортируется — он используется только как транспорт для `axiosBaseQuery`.

```ts
// api/baseQuery.ts (фрагмент)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

// При 401 (не на /auth/*) — редирект на логин
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const isAuthRequest = error.config?.url?.startsWith('/auth/')
    if (error.response?.status === 401 && !isAuthRequest) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
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

## Серверный стейт — RTK Query

Вся работа с данными через RTK Query. Для каждого домена — свой `createApi` в `api/`.

```ts
// api/baseQuery.ts — общий Axios-транспорт
export const axiosBaseQuery: BaseQueryFn<Args, unknown, QueryError> = async ({ url, method, data, params, headers }) => {
  try {
    const result = await api({ url, method, data, params, headers })
    return { data: result.data }
  } catch (err) {
    if (isAxiosError(err)) {
      return { error: { status: err.response?.status, data: err.response?.data } }
    }
    return { error: { data: 'Unknown error' } }
  }
}

// api/authApi.ts
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginDto>({ ... }),
    logout: builder.mutation<void, void>({ ... }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = authApi
```

Redux store собирается в `store/store.ts`:

```ts
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    // + reducers для каждого нового домена
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware /* + остальные */),
})
```

После мутации — инвалидируем кэш через `providesTags` / `invalidatesTags`:

```ts
getManagers: builder.query<Manager[], void>({
  query: () => ({ url: '/admin/managers' }),
  providesTags: ['Manager'],
}),
createManager: builder.mutation<Manager, CreateManagerDto>({
  query: (data) => ({ url: '/admin/managers', method: 'POST', data }),
  invalidatesTags: ['Manager'],
}),
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

## Глобальный стейт — Redux Toolkit (authSlice)

Весь стейт — в Redux. Zustand не используется.

```ts
// store/authSlice.ts
export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null } as { user: User | null },
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = authSlice.actions
```

Использование:

```ts
// читать
const user = useSelector((state: RootState) => state.auth.user)

// писать
const dispatch = useDispatch()
dispatch(setUser(user))
```

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
