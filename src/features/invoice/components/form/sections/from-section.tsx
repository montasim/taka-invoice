import { UserIcon } from "@hugeicons/core-free-icons"

import { FormSection } from "../form-section"
import { InvoiceInputField, InvoiceTextareaField } from "../invoice-fields"

export function FromSection() {
  return (
    <FormSection title="From (you)" icon={UserIcon}>
      <InvoiceInputField name="fromName" label="Full name" placeholder="e.g. Md Rahim Uddin" />
      <InvoiceTextareaField
        name="fromAddress"
        label="Address"
        placeholder={"House, Road, Area\nSector / Area, Postcode\nDhaka, Bangladesh"}
      />
      <InvoiceInputField
        name="fromTin"
        label="e-TIN (leave blank to hide)"
        placeholder="000000000000"
        inputMode="numeric"
      />
    </FormSection>
  )
}
