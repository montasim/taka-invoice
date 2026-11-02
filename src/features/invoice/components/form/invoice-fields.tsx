import type { ComponentProps } from "react"

import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useInvoice } from "../../hooks/use-invoice"
import type { InvoiceTextField } from "../../types"

interface BaseProps {
  name: InvoiceTextField
  label: string
}

/** Input bound to a top-level invoice field. */
export function InvoiceInputField({
  name,
  label,
  ...props
}: BaseProps & Omit<ComponentProps<typeof Input>, "name" | "value" | "onChange">) {
  const { invoice, setField } = useInvoice()
  return (
    <Field className="gap-1.5">
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        id={name}
        value={invoice[name]}
        onChange={(e) => setField(name, e.target.value)}
        {...props}
      />
    </Field>
  )
}

/** Textarea bound to a top-level invoice field. */
export function InvoiceTextareaField({
  name,
  label,
  ...props
}: BaseProps & Omit<ComponentProps<typeof Textarea>, "name" | "value" | "onChange">) {
  const { invoice, setField } = useInvoice()
  return (
    <Field className="gap-1.5">
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Textarea
        id={name}
        rows={3}
        value={invoice[name]}
        onChange={(e) => setField(name, e.target.value)}
        {...props}
      />
    </Field>
  )
}
