import { STORAGE_KEY } from "../constants"
import type { InvoiceData } from "../types"
import { createDefaultInvoice } from "./defaults"
import { createLineItem } from "./line-items"

/**
 * Reads the saved invoice, filling any missing fields from the defaults.
 * Storage can be unavailable (private mode, blocked site data), so every
 * access is guarded and falls back to a fresh invoice.
 */
export function loadInvoice(): InvoiceData {
  const defaults = createDefaultInvoice()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaults
    const saved = JSON.parse(raw) as Partial<InvoiceData>
    return {
      ...defaults,
      ...saved,
      toName: saved.toName || defaults.toName,
      toAddress: saved.toAddress || defaults.toAddress,
      invoiceNo: saved.invoiceNo || defaults.invoiceNo,
      // Always start from today's date and the previous month; both can still be
      // changed for this session.
      invoiceDate: defaults.invoiceDate,
      servicePeriod: defaults.servicePeriod,
      paymentTerms: saved.paymentTerms || defaults.paymentTerms,
      quickFill: { ...defaults.quickFill, ...saved.quickFill },
      items: Array.isArray(saved.items)
        ? saved.items.map((item) => createLineItem(item))
        : [],
    }
  } catch {
    return defaults
  }
}

export function saveInvoice(data: InvoiceData): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch {
    return false
  }
}

export function clearSavedInvoice(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing to clear when storage is unavailable.
  }
}
