import { useCallback, useEffect, useState } from "react"

import { createDefaultInvoice } from "../lib/defaults"
import {
  createLineItem,
  generateMonthlyLines,
} from "../lib/line-items"
import { clearSavedInvoice, loadInvoice, saveInvoice } from "../lib/storage"
import type {
  InvoiceData,
  InvoiceTextField,
  LineItem,
  QuickFill,
} from "../types"

const SAVE_DELAY_MS = 400

export function useInvoiceState() {
  const [invoice, setInvoice] = useState<InvoiceData>(loadInvoice)
  const [isSaved, setIsSaved] = useState(false)

  // Persist shortly after the last change.
  useEffect(() => {
    const timer = setTimeout(() => setIsSaved(saveInvoice(invoice)), SAVE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [invoice])

  useEffect(() => {
    document.title =
      `Invoice ${invoice.invoiceNo}` +
      (invoice.fromName ? ` - ${invoice.fromName}` : "")
  }, [invoice.invoiceNo, invoice.fromName])

  const setField = useCallback((field: InvoiceTextField, value: string) => {
    setInvoice((prev) => ({ ...prev, [field]: value }))
  }, [])

  const setQuickFill = useCallback(
    <K extends keyof QuickFill>(field: K, value: QuickFill[K]) => {
      setInvoice((prev) => ({
        ...prev,
        quickFill: { ...prev.quickFill, [field]: value },
      }))
    },
    []
  )

  const addItem = useCallback(() => {
    setInvoice((prev) => ({ ...prev, items: [...prev.items, createLineItem()] }))
  }, [])

  const updateItem = useCallback(
    (id: string, patch: Partial<Omit<LineItem, "id">>) => {
      setInvoice((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      }))
    },
    []
  )

  const removeItem = useCallback((id: string) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }, [])

  /** Replaces all lines from the quick-fill settings. Returns an error message on failure. */
  const fillMonths = useCallback((): string | null => {
    const result = generateMonthlyLines(invoice.quickFill)
    if (!result.ok) return result.error
    setInvoice((prev) => ({
      ...prev,
      items: result.items,
      servicePeriod: result.servicePeriod,
    }))
    return null
  }, [invoice.quickFill])

  const reset = useCallback(() => {
    clearSavedInvoice()
    setInvoice(createDefaultInvoice())
    setIsSaved(false)
  }, [])

  return {
    invoice,
    isSaved,
    setField,
    setQuickFill,
    addItem,
    updateItem,
    removeItem,
    fillMonths,
    reset,
  }
}

export type InvoiceState = ReturnType<typeof useInvoiceState>
