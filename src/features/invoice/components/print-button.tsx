import { PrinterIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ComponentProps } from "react"

import { Button } from "@/components/ui/button"

export function PrintButton(props: ComponentProps<typeof Button>) {
  return (
    <Button type="button" onClick={() => window.print()} {...props}>
      <HugeiconsIcon icon={PrinterIcon} strokeWidth={2} data-icon="inline-start" />
      Print / save as PDF
    </Button>
  )
}
