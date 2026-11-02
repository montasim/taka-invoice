import { ThemeProvider } from "next-themes"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { InvoiceForm, InvoicePreview, InvoiceProvider } from "@/features/invoice"

/*
 * Spacing scale used across the page:
 *   page gutter  px-4 / sm:px-6   (header, main, footer share it)
 *   columns      gap-4, main py-4
 *   form card    16px padding and gaps (Card size="sm"), dividers with 16px each side
 *   sections     gap-4 + pt-4 divider, title → content 12px
 *   fields       gap-3 between fields, gap-1.5 label → control
 *
 * On large screens the page itself never scrolls: the form and the
 * preview each scroll inside their own column.
 */
export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <InvoiceProvider>
          <div
            id="top"
            className="flex min-h-svh flex-col bg-muted/60 lg:h-svh lg:overflow-hidden print:block print:h-auto print:overflow-visible print:bg-white"
          >
            <SiteHeader />

            <main className="mx-auto grid w-full max-w-7xl flex-1 items-start gap-4 px-4 py-4 sm:px-6 lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-stretch print:block print:max-w-none print:p-0">
              {/* Desktop: invoice on the left, form on the right. Phones: form first. */}
              <InvoicePreview />
              <InvoiceForm />
            </main>

            <SiteFooter />
          </div>
          <Toaster richColors position="top-center" />
        </InvoiceProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}
