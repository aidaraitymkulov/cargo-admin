export type Range = '7d' | '30d' | '90d'

export function getDateRange(range: Range): { from: string; to: string } {
  const to = new Date()
  const from = new Date()
  from.setDate(to.getDate() - (range === '7d' ? 6 : range === '30d' ? 29 : 89))
  const fmt = (d: Date) => d.toISOString().slice(0, 10)
  return { from: fmt(from), to: fmt(to) }
}

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function fmtDateTime(iso: string) {
  const d = new Date(iso)
  return (
    d.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }) +
    ' · ' +
    d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  )
}

function fmtAge(n: number): string {
  if (n % 10 === 1 && n % 100 !== 11) return `${n} год`
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return `${n} года`
  return `${n} лет`
}

export function fmtDob(iso: string) {
  const age = Math.floor((Date.now() - new Date(iso).getTime()) / (365.25 * 86400000))
  return `${fmtDate(iso)} · ${fmtAge(age)}`
}
