import {
  DEFAULT_BILL_TO_ADDRESS,
  DEFAULT_BILL_TO_NAME,
  DEFAULT_LINE_DESCRIPTION,
  DEFAULT_PAYMENT_TERMS,
} from "../constants"
import type { InvoiceData } from "../types"
import { previousMonthPeriod, todayIso } from "./format"

export function createDefaultInvoice(): InvoiceData {
  const now = new Date()
  const year = now.getFullYear()

  return {
    fromName: "",
    fromAddress: "",
    fromTin: "",

    toName: DEFAULT_BILL_TO_NAME,
    toAddress: DEFAULT_BILL_TO_ADDRESS,

    invoiceNo: `INV-${year}-001`,
    invoiceDate: todayIso(),
    servicePeriod: previousMonthPeriod(),
    paymentTerms: DEFAULT_PAYMENT_TERMS,

    quickFill: {
      fromMonth: "0",
      toMonth: String(now.getMonth()),
      year: String(year),
      monthlyAmount: "",
      description: DEFAULT_LINE_DESCRIPTION,
    },
    items: [],

    bankName: "",
    branch: "",
    accountHolder: "",
    accountNumber: "",
  }
}
