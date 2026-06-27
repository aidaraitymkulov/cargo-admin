# AdesExpress — Admin Console

Веб-панель для управления логистикой грузов Китай → Кыргызстан.

## Запуск

```bash
npm install
npm run dev
```

Создайте `.env.local`:

```env
VITE_API_URL=https://api.example.com
```

## Стек

| | |
|---|---|
| Vite + React 19 + TypeScript | сборка и UI |
| React Router v6 | роутинг |
| RTK Query | серверный стейт и кэш |
| Redux Toolkit | глобальный стейт |
| React Hook Form + Zod | формы и валидация |
| shadcn/ui + Tailwind CSS | компоненты и стили |
| TanStack Table | таблицы с пагинацией |
| Recharts | графики |
| @stomp/stompjs | WebSocket |
| Sonner | toast-уведомления |

## Роли

| Раздел | MANAGER | SUPER_ADMIN |
|---|---|---|
| Пользователи, новости, уведомления, чат, импорт | ✅ | ✅ |
| Менеджеры, филиалы, отчёт по пользователям | ❌ | ✅ |

## Структура

```
src/
├── api/admin/        # RTK Query эндпоинты по доменам
├── components/       # ui/, layout/, shared/
├── pages/            # страницы + диалоги + formViews/
├── types/entities/   # Zod-схемы API-сущностей
├── lib/              # cn(), FORM_INPUT_CLS, formatPhoneInput
├── hooks/            # useAuth, useTheme и доменные хуки
├── store/            # Redux store
└── router/           # lazy-маршруты
```

## Авторизация

HttpOnly cookie — токены не хранятся в JS. При 401 axios-interceptor автоматически делает refresh и повторяет запрос.
