# Admin API

Base URL: `https://api.adesexpress.com/admin`

## Аутентификация
- JWT в **HttpOnly Secure cookie** (устанавливается при логине)
- Все запросы с `credentials: 'include'` (withCredentials: true в Axios)
- Заголовок `Authorization` не используется

## Роли
- `MANAGER` — базовый доступ (пользователи, импорт, чат, уведомления, новости)
- `SUPER_ADMIN` — полный доступ (+ менеджеры, филиалы, отчёты по пользователям)

## Модели

### User
```ts
{
  id: string           // uuid
  role: 'SUPER_ADMIN' | 'MANAGER' | 'USER'
  email: string
  firstName: string
  lastName: string
  phone: string
  personalCode: string  // "AN0001"
  branch: Branch
  chatBanned: boolean
  status: 0 | 1 | 2 | 3  // ACTIVE | INACTIVE | DELETED | PENDING_DELETION
  createdAt: string    // ISO
  updatedAt: string    // ISO
}
```

### Branch
```ts
{
  id: string
  address: string       // "г. Бишкек, Анкара-10"
  personalCodePrefix: string  // "AN"
  isActive: boolean
  nextSequence: number
  createdAt: string
  updatedAt: string
}
```

### Product
```ts
{
  id: string
  hatch: string         // трекинг-номер "YT123"
  userId: string
  orderId: string | null
  status: 'IN_CHINA' | 'ON_THE_WAY' | 'IN_KG' | 'DELIVERED'
  createdAt: string
  updatedAt: string
}
```

### Order
```ts
{
  id: string
  userId: string
  branch: Branch
  price: number
  weight: number
  itemCount: number
  status: 'PENDING_PICKUP' | 'DELIVERED'
  createdAt: string
  updatedAt: string
}
```

### News
```ts
{
  id: string
  cover: string | null  // URL картинки
  title: string
  content: string
  createdAt: string
  updatedAt: string
}
```

### ChatMessage
```ts
{
  id: string
  userId: string
  managerId: string | null
  senderType: 'USER' | 'MANAGER'
  message: string
  isRead: boolean
  createdAt: string
}
```

### Paginated<T>
```ts
{
  items: T[]
  page: number
  pageSize: number
  total: number
}
```

### ImportError
```ts
{ row: number; code: string; message: string }
```

---

## Единый формат ошибок
```json
{
  "error": "ERROR_CODE",
  "message": "Человекочитаемое описание",
  "details": { "field": "описание" }
}
```

---

## Auth

### POST /auth/login
Заголовок `X-Client-Type: web` — токены идут в HttpOnly cookie.
```ts
// Request
{ login: string, password: string }

// Response 200
{ success: true, user: User }

// Errors
// 401 INVALID_CREDENTIALS
```

### POST /auth/refresh
Обновляет access-token через refresh-cookie. Без тела.

### POST /auth/logout
Очищает cookie. Без тела.

---

## Менеджеры — /admin/managers (SUPER_ADMIN)

### POST /admin/managers
```ts
// Request
{
  login: string
  password: string
  firstName: string
  lastName: string
  phone: string
  branchId: string    // uuid
  role: 'MANAGER' | 'SUPER_ADMIN'
}

// Response 201: User
// Errors: 400 VALIDATION_ERROR, 403 FORBIDDEN, 409 CONFLICT, 404 BRANCH_NOT_FOUND
```

### GET /admin/managers
```ts
// Query
{ page?: number, pageSize?: number }

// Response 200: Paginated<User>
```

### PATCH /admin/managers/{managerId}
```ts
// Request (все поля опциональные)
{ firstName?: string, lastName?: string, phone?: string }

// Response 200: User
// Errors: 401, 403, 404 USER_NOT_FOUND, 400 VALIDATION_ERROR
```

### DELETE /admin/managers/{managerId}
```
Response 204
Errors: 401, 403, 404 USER_NOT_FOUND, 409 CONFLICT (нельзя удалить себя)
```

---

## Филиалы — /admin/branches (SUPER_ADMIN)

### POST /admin/branches
```ts
// Request
{ address: string, personalCodePrefix: string }

// Response 201: Branch
// Errors: 400 VALIDATION_ERROR, 409 CONFLICT (prefix уже занят)
```

### GET /admin/branches
```ts
// Response 200: Paginated<Branch>  (pageSize по умолчанию 50)
```

### GET /admin/branches/{branchId}
```
Response 200: Branch
Errors: 404 BRANCH_NOT_FOUND
```

### PATCH /admin/branches/{branchId}
```ts
// Request (все поля опциональные)
{ address?: string, personalCodePrefix?: string, isActive?: boolean }

// Response 200: Branch
// Errors: 404 BRANCH_NOT_FOUND, 409 CONFLICT
```

### PATCH /admin/branches/{branchId}/activate
Без тела. Response 200: Branch. Errors: 404 BRANCH_NOT_FOUND

### PATCH /admin/branches/{branchId}/deactivate
Без тела. Response 200: Branch. Errors: 404 BRANCH_NOT_FOUND

---

## Пользователи — /admin/users (MANAGER + SUPER_ADMIN)

### GET /admin/users
```ts
// Query
{
  prefix?: string     // фильтр по prefix personalCode
  code?: string       // фильтр по personalCode
  branchId?: string
  role?: string
  page?: number
  pageSize?: number
}

// Response 200: Paginated<User>
```

### GET /admin/users/{userId}
```
Response 200: User
Errors: 404 USER_NOT_FOUND
```

### DELETE /admin/users/{userId}
```
Response 204
Errors: 404 USER_NOT_FOUND
```

### PATCH /admin/users/{userId}/chat-ban
Без тела. Response 200: User. Errors: 404 USER_NOT_FOUND

### PATCH /admin/users/{userId}/chat-unban
Без тела. Response 200: User. Errors: 404 USER_NOT_FOUND

### GET /admin/users/{userId}/products
```ts
// Response 200: Paginated<Product>  (pageSize по умолчанию 50)
```

### GET /admin/users/{userId}/orders
```ts
// Response 200: Paginated<Order>
```

---

## Импорт Excel — /admin/import (MANAGER + SUPER_ADMIN)

Каждый файл обрабатывается независимо. Количество загрузок в день не ограничено.
MANAGER — только свой филиал. SUPER_ADMIN — любой филиал.

### POST /admin/import/parcels/cn
Body: `multipart/form-data`, поле `file` (.xlsx / .xls)
Колонки: **A = hatch**, **B = personalCode**

```ts
// Response 200
{
  processed: number
  createdProducts: number
  updatedProducts: number
  errors: ImportError[]
}

// HTTP Errors: 400 VALIDATION_ERROR, 413 PAYLOAD_TOO_LARGE, 500 IMPORT_ERROR
```

### POST /admin/import/parcels/kg/{personalCodePrefix}/in-kg
Body: `multipart/form-data`, поле `file` (.xlsx / .xls)
Колонки: **A = personalCode (только итоговая строка)**, **B = hatch**, **C = вес**, **D = цена**

Формат блока в Excel:
```
           | YT12345 |     |
           | YT62782 |     |
AN0001     | YT39292 | 3.0 | 5000  ← итоговая строка блока
```

```ts
// Response 200
{
  processedOrders: number
  createdOrders: number
  productsLinked: number
  newProductsCreated: number
  errors: ImportError[]
}

// HTTP Errors:
// 400 VALIDATION_ERROR — prefix в пути ≠ кодам в файле
// 403 FORBIDDEN — менеджер загружает не свой филиал
// 404 BRANCH_NOT_FOUND
// 500 IMPORT_ERROR
```

### POST /admin/import/parcels/kg/{personalCodePrefix}/delivered
Тот же формат файла. Переводит заказы в статус DELIVERED.

```ts
// Response 200
{
  processedOrders: number
  updatedOrders: number
  errors: ImportError[]  // ORDER_NOT_FOUND, ORDER_ALREADY_DELIVERED
}

// HTTP Errors: 400, 403, 404, 500 (аналогично in-kg)
```

---

## Новости — /admin/news

### POST /admin/news
Body: `multipart/form-data`: `title`, `content`, `image` (файл, опционально)
```ts
// Response 201: News
// Errors: 400 VALIDATION_ERROR, 413 PAYLOAD_TOO_LARGE
```

### GET /admin/news
```ts
// Response 200: Paginated<News>
```

### GET /admin/news/{newsId}
```
Response 200: News
Errors: 404 NEWS_NOT_FOUND
```

### PATCH /admin/news/{newsId}
```ts
// Request (все поля опциональные)
{ title?: string, content?: string }

// Response 200: News
// Errors: 404 NEWS_NOT_FOUND, 400 VALIDATION_ERROR
```

### DELETE /admin/news/{newsId}
```
Response 204
Errors: 404 NEWS_NOT_FOUND
```

---

## Push-уведомления — /admin/notifications

### POST /admin/notifications/test
```ts
// Request
{ userId: string, title: string, body: string, data: { type: 'TEST' } }

// Response 200
{ success: true, notificationId: string }

// Errors: 404 USER_NOT_FOUND, 400 VALIDATION_ERROR
```

### POST /admin/notifications/broadcast
```ts
// Request
{ title: string, body: string, data: { type: 'BROADCAST' } }

// Response 200
{ success: true, sentCount: number }
```

### POST /admin/notifications/by-personal-code
```ts
// Request
{ codePrefix: string, title: string, body: string, data: { type: 'BRANCH_INFO' } }

// Response 200
{ success: true, sentCount: number }

// Errors: 400 VALIDATION_ERROR
```

---

## Чат — /admin/chats

### GET /admin/chats/conversations
```ts
// Response 200
{
  items: Array<{
    user: User
    lastMessage: ChatMessage
    lastMessageAt: string
    unreadCount: number
  }>
  page: number
  pageSize: number
  total: number
}
```

### GET /admin/chats/conversations/{userId}/messages
```ts
// Query
{ page?: number, pageSize?: number }

// Response 200: Paginated<ChatMessage>
// Errors: 404 USER_NOT_FOUND
```

### POST /admin/chats/conversations/{userId}/messages
```ts
// Request
{ message: string }

// Response 201: ChatMessage  (senderType: "MANAGER")
// Errors: 404 USER_NOT_FOUND, 400 VALIDATION_ERROR
```

### WebSocket
```
URL: ws://api.adesexpress.com/ws/chat  (cookie прикладывается автоматически)
Подписка: /user/queue/messages
Отправка:  /app/chat.send → { message: string }
```

---

## Отчёты — /admin/reports

### GET /admin/reports/orders/summary
```ts
// Query
{
  period: 'day' | 'week' | 'month' | 'custom'
  from?: string    // ISO date, только для period=custom
  to?: string      // ISO date, только для period=custom
  branchId?: string  // только SUPER_ADMIN; MANAGER видит только свой филиал
}

// Response 200
{
  items: Array<{
    date: string    // "2025-11-29"
    branch: Branch
    ordersCount: number
    totalWeight: number
    totalPrice: number
  }>
  total: number
}

// Errors: 400 VALIDATION_ERROR, 404 BRANCH_NOT_FOUND
```

### GET /admin/reports/orders/summary/export
Те же query-параметры + `format: 'xlsx' | 'csv'`
Response: бинарный файл (Content-Disposition: attachment)

### GET /admin/reports/users/summary (только SUPER_ADMIN)
```ts
// Query
{ period: 'day' | 'week' | 'month' | 'custom', from?: string, to?: string }

// Response 200
{
  items: Array<{
    date: string
    newUsersCount: number
    deletedUsersCount: number
    totalUsersCount: number
  }>
  total: number
}

// Errors: 403 FORBIDDEN, 400 VALIDATION_ERROR
```

### GET /admin/reports/users/summary/export (только SUPER_ADMIN)
Те же query-параметры + `format: 'xlsx' | 'csv'`
Response: бинарный файл
