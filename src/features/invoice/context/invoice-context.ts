import { createContext } from "react"

import type { InvoiceState } from "../hooks/use-invoice-state"

export const InvoiceContext = createContext<InvoiceState | null>(null)
