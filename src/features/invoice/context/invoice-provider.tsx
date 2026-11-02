import type { ReactNode } from "react"

import { useInvoiceState } from "../hooks/use-invoice-state"
import { InvoiceContext } from "./invoice-context"

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const state = useInvoiceState()
  return <InvoiceContext.Provider value={state}>{children}</InvoiceContext.Provider>
}
