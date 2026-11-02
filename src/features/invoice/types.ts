export interface LineItem {
  id: string
  description: string
  period: string
  amount: string
}

/** Settings for the "Fill months" quick generator. */
export interface QuickFill {
  fromMonth: string
  toMonth: string
  year: string
  monthlyAmount: string
  description: string
}

export interface InvoiceData {
  fromName: string
  fromAddress: string
  fromTin: string

  toName: string
  toAddress: string

  invoiceNo: string
  invoiceDate: string
  servicePeriod: string
  paymentTerms: string

  quickFill: QuickFill
  items: LineItem[]

  bankName: string
  branch: string
  accountHolder: string
  accountNumber: string
}

/** Top-level string fields that a plain text input can edit. */
export type InvoiceTextField = {
  [K in keyof InvoiceData]: InvoiceData[K] extends string ? K : never
}[keyof InvoiceData]
