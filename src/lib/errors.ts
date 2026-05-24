export function getApiErrorMessage(err: unknown, fallback = 'Произошла ошибка'): string {
  if (err && typeof err === 'object' && 'data' in err) {
    const message = (err as { data?: { message?: string } }).data?.message
    if (message) return message
  }
  return fallback
}
