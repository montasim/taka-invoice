import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { useInvoice } from "../../hooks/use-invoice"
import { PrintButton } from "../print-button"
import { ClearFormDialog } from "./clear-form-dialog"
import { BillToSection } from "./sections/bill-to-section"
import { FromSection } from "./sections/from-section"
import { InvoiceInfoSection } from "./sections/invoice-info-section"
import { LinesSection } from "./sections/lines-section"
import { PaymentSection } from "./sections/payment-section"

export function InvoiceForm() {
  const { isSaved } = useInvoice()

  return (
    // size="sm" sets the card's padding and inner gaps to 16px.
    <Card
      id="invoice-form"
      size="sm"
      className="scroll-mt-20 max-lg:order-first lg:h-full lg:min-h-0 print:hidden"
    >
      <CardHeader className="gap-1 lg:border-b lg:pb-4">
        <CardTitle className="text-lg font-bold">Invoice form</CardTitle>
        <CardDescription>The invoice updates as you type.</CardDescription>
      </CardHeader>

      {/* On large screens only this part scrolls; header and actions stay put.
          `relative` keeps Radix's hidden native <select> inside the scroll area;
          pr-2 + the 8px scrollbar keep fields aligned with the 16px card edge. */}
      <CardContent className="relative lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2 lg:pb-1 lg:scrollbar-slim">
        <form
          aria-label="Invoice details"
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <FromSection />
          <BillToSection />
          <InvoiceInfoSection />
          <LinesSection />
          <PaymentSection />
        </form>
      </CardContent>

      <CardFooter className="justify-between gap-2 lg:border-t lg:pt-4">
        <div className="flex flex-wrap gap-2">
          <PrintButton />
          <ClearFormDialog />
        </div>
        <p
          className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground"
          aria-live="polite"
          title="Saved in this browser"
        >
          {isSaved && (
            <>
              <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-3.5" />
              Saved
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  )
}
