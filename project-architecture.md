# Архитектура проекта — cargo-admin

Справочник по фронтенд-проекту AdesExpress (веб-админка логистической системы: доставка Китай → Кыргызстан). Дополняет `CLAUDE.md` — там паттерны кода для агента, здесь — более широкий контекст: стек, реальная структура проекта на сегодня, авторизация, роли, пагинация, темы.

> Точные примеры кода (Zod-схемы, RTK Query эндпоинты, диалоги форм) — см. `CLAUDE.md`. Этот файл описывает состояние проекта, а не то, как писать код.

---

## О проекте

Веб-админка для сотрудников AdesExpress — логистической компании, доставляющей посылки из Китая в Кыргызстан. Два типа пользователей админки:

- **MANAGER** — сотрудник филиала, видит и управляет данными в рамках своих обязанностей.
- **SUPER_ADMIN** — полный доступ, включая управление менеджерами и филиалами.

Бэкенд — отдельный Java-проект (`D:\projects\cargo-app\cargo-java\`), его документация (API, схемы БД) — источник правды для контрактов бэкенда, живёт в `cargo-java\docs\`, не дублируется здесь.

---

## Стек

| Слой | Технология |
|---|---|
| Сборщик | Vite + React 19 + TypeScript |
| Роутинг | React Router v6 |
| Серверный стейт | RTK Query (`@reduxjs/toolkit/query`) |
| HTTP | Axios (`api/baseQuery.ts` — `axiosBaseQuery`) |
| Глобальный стейт | Redux Toolkit (`store/index.ts`) |
| Формы | React Hook Form + Zod |
| UI | shadcn/ui + Tailwind CSS |
| Таблицы | TanStack Table |
| Графики | Recharts |
| Toast | Sonner |

---

## Структура проекта — feature-based

Каждый домен — самодостаточная папка `src/features/{domain}/` (api + типы + страницы вместе). Наружу фича отдаёт только тонкий barrel `index.ts`: lazy-страницы, api-слайс с хуками, публичный тип сущности. Всё остальное — внутренние относительные импорты; кросс-фича импорты только через `@/features/{domain}`, никогда вглубь чужой фичи.

```
src/
├── features/
│   ├── auth/        # api/authApi.ts, types/auth.ts, pages/{LoginPage,LoginForm,LoginBackground}.tsx
│   ├── branches/    # api, types, pages/{BranchesPage,BranchesMapPage,BranchesTable}, forms/, map/
│   ├── dashboard/   # api, types, pages/DashboardPage + pages/components/{DashboardCharts,DashboardStatsCards}
│   ├── managers/    # api, types, pages/{ManagersPage,Table,диалоги} + pages/formViews/
│   ├── news/        # api, types, pages/{NewsPage,NewsDetailPage,Card,DeleteDialog} + pages/newsViews/
│   ├── products/    # api-only (не роутится)
│   └── users/       # api-only (страница не реализована)
│
├── api/
│   ├── baseQuery.ts          # axiosBaseQuery + axios instance (withCredentials, interceptors)
│   └── admin/adminApi.ts     # агрегатор reducers/middlewares — импортирует api из feature-барrelов
│
├── components/
│   ├── ui/          # shadcn-примитивы (добавлять только через CLI)
│   └── layout/      # Layout, PageHeader, AppSidebar
│
├── hooks/           # useStore, useTheme
├── store/           # configureStore (index.ts)
├── lib/             # env.ts, errors.ts, ui.ts + utils/ (cn, date, phone)
├── types/           # enums/ (role, parcel), pagination.ts, navigation.ts — только общее
├── config/          # navigation.tsx (пункты сайдбара), routes.ts (ROUTES const)
├── pages/           # ТОЛЬКО пустые заглушки нереализованных разделов (imports, notifications, reports, users)
└── router/
    ├── router.ts    # protectedRoutes — createElement(...), страницы из feature-барrelов
    └── index.ts
```

### Фичи на сегодня

| Фича | api | types | pages | Комментарий |
|---|---|---|---|---|
| `auth` | ✅ | ✅ | ✅ (LoginPage) | `getMe`/`login` валидируют ответ как `Manager` — импортирует `managerSchema` из `@/features/managers` |
| `branches` | ✅ | ✅ | ✅ | самая большая: `forms/` и `map/` на уровне фичи; barrel экспортирует `branchSchema` (нужна managers) |
| `managers` | ✅ | ✅ | ✅ | эталонная фича; barrel экспортирует `managerSchema` (нужна auth) |
| `news` | ✅ | ✅ | ✅ | `pages/newsViews/` |
| `dashboard` | ✅ | ✅ | ✅ | `pages/components/{DashboardCharts,DashboardStatsCards}`; chart-утилиты внутри фичи |
| `products` | ✅ | — | — | api-only, не роутится |
| `users` | ✅ | — | — | api-only; заглушка страницы в `src/pages/users/` |
| `imports`, `notifications`, `reports` | — | — | — | не реализованы (пустые заглушки в `src/pages/`); при реализации создавать сразу в `features/` |

**Известные отклонения** (зафиксировано по факту):
- В `CLAUDE.md` описан паттерн `<RoleGuard roles={['SUPER_ADMIN']}>` в роутере — в коде `router.ts` такого компонента нет, доступ по ролям на уровне роутинга не реализован.
- Кросс-фича схемы: `managerSchema` и `branchSchema` экспортируются из барrelов своих фич как осознанное исключение из правила «схемы не публичны» — они нужны для `transformResponse` в соседних фичах.

---

## Авторизация

Бэкенд — HttpOnly Secure cookie, а не Bearer-токен. `axiosBaseQuery`:
- Отправляет `withCredentials: true` и заголовок `X-Client-Type: web`.
- При 401 на не-`/auth/*` запросе — вызывает `POST /auth/refresh` и повторяет исходный запрос.
- При повторном 401 после refresh — пробрасывает ошибку (обработку/редирект на логин должен делать вызывающий код).

---

## Роли и доступ

| Раздел | MANAGER | SUPER_ADMIN |
|---|---|---|
| Пользователи, импорт, новости, уведомления, чат, отчёт по заказам | ✅ | ✅ |
| Менеджеры, филиалы, отчёт по пользователям | ❌ | ✅ |

Разграничение задокументировано как целевое поведение; фактическая защита на уровне роутинга (`RoleGuard`) в коде на сегодня отсутствует (см. отклонения выше).

---

## Пагинация

Стандарт ответа бэкенда: `{ items: T[], page: number, pageSize: number, total: number }`.
Дефолтный `pageSize`: `20` (списки), `50` (филиалы/товары).

---

## Темы (light / dark)

Класс `.dark` на `<html>`, переключается через `useTheme` (`src/hooks/useTheme.ts`), хранится в `localStorage('theme')`. Инициализация без flash — inline-скрипт в `index.html` до рендера React. Подробности классов/цветов/autofill-исключений — см. `CLAUDE.md`.

---

## Общие правила проекта

- Только RTK Query для серверного стейта, только Redux для глобального — без TanStack Query/Zustand/голого fetch.
- shadcn-компоненты — только через `npx shadcn@latest add`, вручную не копировать.
- Zod-схемы для всех API-сущностей с `transformResponse`, не голые TS-интерфейсы.
- Toast — Sonner, не `alert`/`console`.
- Дизайн-макеты — `D:\projects\cargo-app\designs\cargo-app\`; документация бэкенда — `D:\projects\cargo-app\cargo-java\docs\`. При реализации нового раздела сначала смотреть туда.
