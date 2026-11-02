import { MONTHS } from "../constants"

export function formatBDT(value: string | number): string {
  const n = Number(value) || 0
  return (
    "BDT " +
    n.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
  )
}

/** "2026-09-30" → "30 September 2026" */
export function formatLongDate(isoDate: string): string {
  if (!isoDate) return ""
  const d = new Date(isoDate + "T00:00:00")
  if (Number.isNaN(d.getTime())) return ""
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export function lastDayOfMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate()
}

/** Local date as YYYY-MM-DD (toISOString would shift to UTC). */
export function todayIso(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** "01-30 November 2026" for one month, "01 January - 30 November 2026" for a range. */
export function servicePeriodLabel(year: number, fromMonth: number, toMonth = fromMonth): string {
  return fromMonth === toMonth
    ? `01-${lastDayOfMonth(year, fromMonth)} ${MONTHS[fromMonth]} ${year}`
    : `01 ${MONTHS[fromMonth]} - ${lastDayOfMonth(year, toMonth)} ${MONTHS[toMonth]} ${year}`
}

/** Service period covering the previous calendar month (December of last year in January). */
export function previousMonthPeriod(): string {
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  return servicePeriodLabel(lastMonth.getFullYear(), lastMonth.getMonth())
}
