import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { formatBDT } from "../../lib/format"
import type { LineItem } from "../../types"

const headClass = "h-auto bg-[#F2F2F2] p-[3mm] text-[8pt] font-bold text-[#111]"
const cellClass = "p-[3mm] py-[3.5mm] whitespace-normal"

export function PaperLines({ items }: { items: LineItem[] }) {
  return (
    <Table className="mt-[9mm] text-[9pt]">
      <TableHeader>
        <TableRow className="border-0 hover:bg-transparent">
          <TableHead className={headClass}>DESCRIPTION</TableHead>
          <TableHead className={`${headClass} w-[28%]`}>PERIOD</TableHead>
          <TableHead className={`${headClass} w-[22%] text-right`}>AMOUNT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow className="border-[#E2E2E2] hover:bg-transparent">
            <TableCell colSpan={3} className={`${cellClass} text-[#999]`}>
              Use "Fill months" to add your lines
            </TableCell>
          </TableRow>
        ) : (
          items.map((item) => (
            <TableRow key={item.id} className="border-[#E2E2E2] hover:bg-transparent">
              <TableCell className={`${cellClass} whitespace-pre-line`}>{item.description}</TableCell>
              <TableCell className={cellClass}>{item.period}</TableCell>
              <TableCell className={`${cellClass} text-right whitespace-nowrap`}>
                {formatBDT(item.amount)}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
