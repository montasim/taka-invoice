import type { CSSProperties } from "react"

import { useFitWidth } from "../../hooks/use-fit-width"
import { InvoicePaper } from "./invoice-paper"

/** 210mm at 96 dpi. */
const A4_WIDTH_PX = 794

export function InvoicePreview() {
  const { ref, scale } = useFitWidth<HTMLDivElement>(A4_WIDTH_PX)

  return (
    <section
      id="invoice-preview"
      aria-label="Invoice preview"
      className="flex min-w-0 scroll-mt-20 flex-col lg:h-full lg:min-h-0 print:block print:h-auto"
    >
      {/* On large screens the sheet scrolls here instead of the page. */}
      <div
        ref={ref}
        className="relative lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:scrollbar-slim print:overflow-visible"
      >
        {/* Shrink the A4 sheet to fit the column; printing always uses full size. */}
        <div
          style={{ "--paper-zoom": scale } as CSSProperties}
          className="[zoom:var(--paper-zoom)] print:[zoom:1]"
        >
          <InvoicePaper />
        </div>
      </div>
    </section>
  )
}
