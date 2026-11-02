import { MONTHS } from "../constants"
import type { LineItem, QuickFill } from "../types"
import { servicePeriodLabel } from "./format"

export function createLineItem(partial: Partial<Omit<LineItem, "id">> = {}): LineItem {
  return {
    id: crypto.randomUUID(),
    description: "",
    period: "",
    amount: "",
    ...partial,
  }
}

export function isLineItemEmpty(item: LineItem): boolean {
  return !item.description && !item.period && !item.amount
}

export function totalOf(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
}

export type QuickFillResult =
  | { ok: true; items: LineItem[]; servicePeriod: string }
  | { ok: false; error: string }

/** One line per month in the range, plus a matching service-period label. */
export function generateMonthlyLines(fill: QuickFill): QuickFillResult {
  const from = Number(fill.fromMonth)
  const to = Number(fill.toMonth)
  const year = Number(fill.year) || new Date().getFullYear()

  if (to < from) {
    return {
      ok: false,
      error: "The 'To' month must be the same as or after the 'From' month.",
    }
  }

  const description = fill.description || "Services"
  const items: LineItem[] = []
  for (let m = from; m <= to; m++) {
    items.push(
      createLineItem({
        description,
        period: `${MONTHS[m].slice(0, 3)} ${year}`,
        amount: fill.monthlyAmount,
      })
    )
  }

  const servicePeriod = servicePeriodLabel(year, from, to)

  return { ok: true, items, servicePeriod }
}
