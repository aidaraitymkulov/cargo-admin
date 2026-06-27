export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  MANAGERS: '/managers',
  BRANCHES: '/branches',
  NEWS: {
    LIST: '/news',
    CREATE: '/news/create',
    DETAIL: (id: string) => `/news/${id}`,
    DETAIL_PATTERN: '/news/:id',
    CREATE_PATTERN: '/news/create',
  },
} as const
