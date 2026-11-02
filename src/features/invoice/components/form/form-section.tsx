import type { ReactNode } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field"

interface FormSectionProps {
  title: string
  icon: IconSvgElement
  description?: ReactNode
  children: ReactNode
}

export function FormSection({ title, icon, description, children }: FormSectionProps) {
  return (
    // The divider lives on a wrapper: a border on the <fieldset> itself would
    // draw through the <legend>. Legends also ignore flex `gap`, hence its mb-3.
    <div className="border-t pt-4 first:border-t-0 first:pt-0">
      <FieldSet className="gap-3">
        <FieldLegend className="mb-3 flex items-center gap-2">
          <HugeiconsIcon icon={icon} strokeWidth={2} className="size-4 text-muted-foreground" />
          {title}
        </FieldLegend>
        {description}
        <FieldGroup className="gap-3">{children}</FieldGroup>
      </FieldSet>
    </div>
  )
}
