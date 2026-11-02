import { Building03Icon } from "@hugeicons/core-free-icons"

import { DEFAULT_BILL_TO_NAME } from "../../../constants"
import { FormSection } from "../form-section"
import { InvoiceInputField, InvoiceTextareaField } from "../invoice-fields"

export function BillToSection() {
  return (
    <FormSection title="Bill to" icon={Building03Icon}>
      <InvoiceInputField name="toName" label="Name" placeholder={DEFAULT_BILL_TO_NAME} />
      <InvoiceTextareaField name="toAddress" label="Address" />
    </FormSection>
  )
}
