import { Separator } from "@/components/ui/separator"

import { useInvoice } from "../../hooks/use-invoice"
import { formatBDT } from "../../lib/format"
import { isLineItemEmpty, totalOf } from "../../lib/line-items"
import { PaperLines } from "./paper-lines"
import { PaperMeta } from "./paper-meta"
import { PaperParties } from "./paper-parties"
import { PaperPaymentDetails } from "./paper-payment-details"

/** A4 invoice sheet. Always printed in light colours, whatever the app theme. */
export function InvoicePaper() {
  const { invoice } = useInvoice()
  const items = invoice.items.filter((item) => !isLineItemEmpty(item))

  return (
    <article
      className="invoice-paper mx-auto flex min-h-[297mm] w-[210mm] flex-col bg-white px-[15mm] pt-[16mm] pb-[12mm] font-[Helvetica,Arial,'Liberation_Sans',sans-serif] text-[10pt] leading-normal text-[#111] shadow-[0_1px_3px_rgba(0,0,0,.12),0_8px_24px_rgba(0,0,0,.08)] print:shadow-none"
    >
      <header className="flex items-start justify-between pb-[14mm]">
        <h2 className="m-0 text-[26pt] leading-none font-bold tracking-[-0.3px]">INVOICE</h2>
        <div className="shrink-0">
          <PaperMeta invoice={invoice} />
        </div>
      </header>
      <Separator className="bg-[#DDD]" />

      <PaperParties invoice={invoice} />
      <PaperLines items={items} />

      <div className="mt-[6mm] flex items-baseline justify-end gap-[8mm]">
        <span className="text-[10pt] font-bold">TOTAL DUE</span>
        <span className="text-[14pt] font-bold">{formatBDT(totalOf(items))}</span>
      </div>

      <div className="mb-[10mm]">
        <PaperPaymentDetails invoice={invoice} />
      </div>

      {/* Sits at the bottom of the page, but moves down with long content instead of overlapping it. */}
      <footer className="mt-auto border-t border-[#DDD] pt-[2mm] text-[8pt] text-[#777]">
        Thank you.
      </footer>
    </article>
  )
}
