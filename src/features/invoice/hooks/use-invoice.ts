import { useContext } from "react"

import { InvoiceContext } from "../context/invoice-context"
import type { InvoiceState } from "./use-invoice-state"

export function useInvoice(): InvoiceState {
  const ctx = useContext(InvoiceContext)
  if (!ctx) throw new Error("useInvoice must be used inside <InvoiceProvider>")
  return ctx
}
