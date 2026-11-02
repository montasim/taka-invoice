import type { InvoiceData } from "../../types"

function Party({ heading, lines }: { heading: string; lines: string[] }) {
  return (
    <div>
      <h3 className="mb-[2mm] text-[9pt] font-bold">{heading}</h3>
      <p className="text-[9pt] whitespace-pre-line">{lines.filter(Boolean).join("\n")}</p>
    </div>
  )
}

export function PaperParties({ invoice }: { invoice: InvoiceData }) {
  return (
    <div className="mt-[8mm] grid grid-cols-2 gap-[10mm]">
      <Party
        heading="FROM"
        lines={[
          invoice.fromName.trim() || "Your name",
          invoice.fromAddress.trim(),
          invoice.fromTin.trim() ? `e-TIN: ${invoice.fromTin.trim()}` : "",
        ]}
      />
      <Party
        heading="BILL TO"
        lines={[invoice.toName.trim() || "Recipient name", invoice.toAddress.trim()]}
      />
    </div>
  )
}
