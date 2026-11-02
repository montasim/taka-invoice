import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

import { formatLongDate } from "../../lib/format"
import type { InvoiceData } from "../../types"

export function PaperMeta({ invoice }: { invoice: InvoiceData }) {
  const rows: [string, string][] = [
    ["Invoice No.", invoice.invoiceNo],
    ["Invoice Date", formatLongDate(invoice.invoiceDate)],
    ["Service Period", invoice.servicePeriod],
    ["Payment Terms", invoice.paymentTerms],
  ]

  return (
    <Table className="w-auto text-[9pt]">
      <TableBody>
        {rows.map(([label, value]) => (
          <TableRow key={label} className="border-0 hover:bg-transparent">
            <TableCell className="py-[1.5px] pr-[14mm] pl-0 font-bold text-[#666]">
              {label}
            </TableCell>
            <TableCell className="py-[1.5px] pr-0 text-right text-[#666]">{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
