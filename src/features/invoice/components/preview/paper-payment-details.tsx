import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

import type { InvoiceData } from "../../types"

export function PaperPaymentDetails({ invoice }: { invoice: InvoiceData }) {
  const rows: [string, string][] = [
    ["Bank Name:", invoice.bankName],
    ["Branch:", invoice.branch],
    ["Account Holder:", invoice.accountHolder.trim() || invoice.fromName],
    ["Account Number:", invoice.accountNumber],
  ]

  return (
    <div className="mt-[16mm]">
      <h3 className="mb-[2mm] text-[10pt] font-bold">PAYMENT DETAILS</h3>
      <Table className="w-auto text-[9pt]">
        <TableBody>
          {rows.map(([label, value]) => (
            <TableRow key={label} className="border-0 hover:bg-transparent">
              <TableCell className="py-[0.5mm] pr-[12mm] pl-0 font-bold">{label}</TableCell>
              <TableCell className="py-[0.5mm] pl-0">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
