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
| Роутинг | React Router v7 |
| Серверный стейт | RTK Query (`@reduxjs/toolkit/query`) |
| HTTP | Axios (`shared/api/baseQuery.ts` — `axiosBaseQuery`) |
| Глобальный стейт | Redux Toolkit (`store/index.ts`) |
| Формы | React Hook Form + Zod |
| UI | shadcn/ui + Tailwind CSS |
| Таблицы | TanStack Table |
| Графики | Recharts |
| Карта филиалов | react-leaflet + Leaflet |
| Toast | Sonner |
| Линтер/форматтер | Biome (`npm run lint`, `npm run lint:fix`; husky + lint-staged на pre-commit) |

`@stomp/stompjs` и `sockjs-client` в зависимостях есть (под будущий чат через WebSocket), но в коде пока не используются — раздел не реализован.

---

## Структура проекта

Три уровня: **`features/`** (домены с api+типами+внутренними компонентами), **`pages/`** (тонкие роут-компоненты, по одному на URL), **`shared/`** (общий код без бизнес-логики домена) + `layout/`, `store/`.

```
src/
├── features/
│   └── {domain}/                  # auth, branches, dashboard, managers, news, products, users
│       ├── api/{domain}Api.ts     # createApi — endpoints, tags, хуки
│       ├── types/
│       │   ├── types.ts           # entitySchema + export type Entity (API-сущность)
│       │   ├── schema.ts          # DTO-схемы форм (create/edit/…)
│       │   └── constants.ts       # доменные константы (только branches — DEFAULT_MAP_CENTER и т.п.)
│       ├── components/            # таблицы, диалоги, формы, view — НЕ страницы
│       ├── utils/                 # доменные утилиты (только dashboard — chart.ts)
│       └── index.ts               # барrel: api+хуки, публичные компоненты, типы/схемы
│
├── pages/
│   └── {domain}/
│       ├── {Domain}Page.tsx       # тонкий роут-компонент, собирает components/ фичи
│       └── index.ts               # export const XPage = lazy(() => import('./XPage'))
│
├── layout/
│   ├── Layout.tsx                 # AuthGuard: useGetMeQuery + редирект на /login при ошибке/401
│   ├── PageHeader.tsx
│   ├── AppSidebar/                # AppSidebar, SidebarHeader, SidebarNav (данные меню внутри), SidebarNavItem, SidebarUser, navigation.ts (тип NavItem)
│   └── index.ts                   # export Layout, PageHeader
│
├── shared/
│   ├── api/baseQuery.ts           # axiosBaseQuery + axios instance (withCredentials, refresh-интерцептор)
│   ├── config/
│   │   ├── routes.ts              # ROUTES const
│   │   ├── Router.tsx             # protectedRoutes — JSX-элементы, страницы из @/pages/{domain}
│   │   └── index.ts               # барrel: ROUTES, protectedRoutes
│   ├── constants/enums/           # role.ts, parcel.ts + index.ts барrel
│   ├── lib/
│   │   ├── env.ts, errors.ts, ui.ts   # API_URL, getApiErrorMessage, FORM_*_CLS
│   │   ├── hooks/                 # useAppDispatch/useAppSelector, useTheme, useOutsideClick + index.ts
│   │   └── utils/                 # cn, fmtDate/fmtDateTime/getDateRange, formatPhoneInput + index.ts
│   ├── types/pagination.ts        # PaginatedResponse<T> (Spring Data page shape) + index.ts
│   └── ui/                        # shadcn-примитивы + кастомные (Dropdown, StatusBadge, ThemeToggle, InitialsAvatar, ImageDropZone, PaginationControl, CustomTooltip) + index.ts
│
├── store/
│   ├── adminApi.ts                # agregates reducers/middlewares — импортирует api из feature-барrelов
│   └── index.ts                   # configureStore
│
├── App.tsx                        # <Routes>: /login → LoginPage, остальное — <Layout> + protectedRoutes
└── main.tsx                       # Provider, BrowserRouter, Toaster
```

### Правило импортов фичи

`features/{domain}/index.ts` экспортирует: api-слайс + хуки, публичные компоненты (те, что реально используются вне фичи — таблицы/диалоги/формы верхнего уровня), Zod-схему + тип сущности, DTO form-схемы. Компоненты внутри фичи импортируют друг друга и api/types **только относительными путями** (`../api/...`, `../types/...`, `./Sibling`) — импорт своего же барrela изнутри фичи создаёт циклическую зависимость и запрещён. Кросс-фича — только через чужой барrel `@/features/{domain}`.

`pages/{domain}/index.ts` — отдельный `lazy()`-барrel только для роут-компонентов; фичи сами страницы не экспортируют (страница физически лежит в `pages/`, а не в `features/`).

### Фичи на сегодня

| Фича | api | types/schema | components | pages | Комментарий |
|---|---|---|---|---|---|
| `auth` | ✅ | ✅ | LoginForm, LoginBackground, LogoutDialog | `pages/auth/LoginPage.tsx` | `getMe`/`login` валидируют ответ как `Manager` — импортирует `managerSchema` из `@/features/managers` |
| `branches` | ✅ | ✅ | BranchCreateForm, BranchesTable, BranchMapView (+внутренние BranchMapSidebar/BranchLocationForm/branchMarkerIcon) | `pages/branches/{BranchesPage,BranchesMapPage}.tsx` | `types/constants.ts` — координаты карты по умолчанию; barrel экспортирует `branchSchema` (нужна managers) |
| `managers` | ✅ | ✅ | ManagersTable, ManagerFormDialog (+внутренние Create/Edit/ChangePasswordView) | `pages/managers/ManagersPage.tsx` | эталонная фича; barrel экспортирует `managerSchema` (нужна auth) |
| `news` | ✅ | ✅ | NewsCard, NewsDeleteDialog, NewsFormView, NewsReadView | `pages/news/{NewsPage,NewsDetailPage}.tsx` | единственная фича с серверной пагинацией (`getNews`) |
| `dashboard` | ✅ | ✅ | DashboardStatsCards, UsersChartCard, DeliveredChartCard (+внутренние ChartCardShell/DashboardAreaChart/DashboardChartCard/StatsCard) | `pages/dashboard/DashboardPage.tsx` | `utils/chart.ts` — трансформация точек графика, доменная (не в `shared/`) |
| `products` | ✅ | — | — | — | api-only, не роутится (используется только статистика на дашборде) |
| `users` | ✅ | — | — | — | api-only, статистика для дашборда; страница пользователей не реализована |

**Известные отклонения** (зафиксировано по факту):
- **Нет `RoleGuard`/`AuthGuard`-компонента на уровне роутера.** Защита от неавторизованного доступа — внутри `layout/Layout.tsx` (вызывает `useGetMeQuery`, редиректит на `/login` при ошибке). Разграничение по ролям (MANAGER/SUPER_ADMIN) нигде на уровне роутинга не реализовано — только на уровне того, что бэкенд отдаёт/принимает.
- **Пункты сайдбара опережают реализацию.** `SidebarNav.tsx` содержит ссылки на `/`, `/users`, `/imports`, `/notifications`, `/chat`, `/reports`, `/reports/orders`, `/reports/users` — ни для одного из них нет ни записи в `ROUTES`, ни страницы в `pages/`. Реально работающие маршруты: `/login`, `/dashboard`, `/managers`, `/branches` (+`/branches/map`), `/news` (+`/news/create`, `/news/:id`).
- **`shared/api/axios.ts` — пустой мёртвый файл.** Реальный axios-инстанс и `axiosBaseQuery` — в `shared/api/baseQuery.ts`; у `shared/api/` нет `index.ts`-барrela, все фичи импортируют `axiosBaseQuery` напрямую из `@/shared/api/baseQuery`.
- Кросс-фича схемы: `managerSchema` и `branchSchema` экспортируются из барrelов своих фич как осознанное исключение — нужны для `transformResponse` в соседних фичах (managers↔auth, branches↔managers).

---

## Авторизация

Бэкенд — HttpOnly Secure cookie, а не Bearer-токен. `axiosBaseQuery` (`src/shared/api/baseQuery.ts`):
- Отправляет `withCredentials: true` и заголовок `X-Client-Type: web`.
- При 401 на не-`/auth/*` запросе — вызывает `POST /auth/refresh` и повторяет исходный запрос (с флагом `_retry`, чтобы не зациклиться).
- При повторном 401 после refresh — пробрасывает ошибку.

Редирект на `/login` для неавторизованных — не отдельный guard-компонент, а часть `Layout.tsx` (см. «Известные отклонения»).

---

## Роли и доступ

| Раздел | MANAGER | SUPER_ADMIN |
|---|---|---|
| Пользователи, импорт, новости, уведомления, чат, отчёт по заказам | ✅ | ✅ |
| Менеджеры, филиалы, отчёт по пользователям | ❌ | ✅ |

Таблица описывает целевое поведение согласно замыслу продукта; фактического разграничения на фронтенде (ни на уровне роутинга, ни на уровне UI) нет — см. «Известные отклонения».

---

## Пагинация

Единого стандарта на весь проект нет:
- **`news`** — единственная фича с серверной пагинацией, формат Spring Data page (`shared/types/pagination.ts` → `PaginatedResponse<T>`): `{ content: T[], totalElements, totalPages, number, size, first, last, empty }`. Дефолт `pageSize` в UI — `20` (см. `PaginationControl`/`getNews`-параметры).
- **`managers`, `branches`** — без пагинации, бэкенд отдаёт плоский массив (`Manager[]`, `Branch[]`).

---

## Темы (light / dark)

Класс `.dark` на `<html>`, переключается через `useTheme` (`src/shared/lib/hooks/useTheme.ts`), хранится в `localStorage('theme')`. Компонент переключателя — `src/shared/ui/ThemeToggle.tsx`. Инициализация без flash — inline-скрипт в `index.html` до рендера React. Подробности классов/цветов/autofill-исключений — см. `CLAUDE.md`.

---

## Общие правила проекта

- Только RTK Query для серверного стейта, только Redux для глобального — без TanStack Query/Zustand/голого fetch.
- shadcn-компоненты — только через `npx shadcn@latest add`, вручную не копировать (кастомные небольшие компоненты вроде `Dropdown`, `StatusBadge`, `InitialsAvatar` живут рядом в `shared/ui/`, но пишутся вручную — это не shadcn-примитивы).
- Zod-схемы для всех API-сущностей с `transformResponse`, не голые TS-интерфейсы.
- Toast — Sonner, не `alert`/`console`.
- Импорты внутри фичи — только относительные пути; барrel фичи (`@/features/{domain}`) — только для кода **снаружи** этой фичи (см. «Правило импортов фичи» выше).
- Дизайн-макеты — `D:\projects\cargo-app\designs\cargo-app\`; документация бэкенда — `D:\projects\cargo-app\cargo-java\docs\`. При реализации нового раздела сначала смотреть туда.
