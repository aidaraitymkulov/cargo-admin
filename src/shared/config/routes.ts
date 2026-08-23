export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  MANAGERS: '/managers',
  BRANCHES: {
    LIST: '/branches',
    MAP: '/branches/map',
    MAP_FOCUS: (id: string) => `/branches/map/${id}`,
    MAP_FOCUS_PATTERN: '/branches/map/:id',
  },
  NEWS: {
    LIST: '/news',
    CREATE: '/news/create',
    DETAIL: (id: string) => `/news/${id}`,
    DETAIL_PATTERN: '/news/:id',
    CREATE_PATTERN: '/news/create',
  },
} as const
