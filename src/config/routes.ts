export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  MANAGERS: '/managers',
  BRANCHES: '/branches',
  NEWS: {
    LIST: '/news',
    DETAIL: (id: string | number) => `/news/${id}`,
    DETAIL_PATTERN: '/news/:id',
  },
} as const
