import { BankIcon } from "@hugeicons/core-free-icons"

import { FormSection } from "../form-section"
import { InvoiceInputField } from "../invoice-fields"

export function PaymentSection() {
  return (
    <FormSection title="Payment details" icon={BankIcon}>
      <div className="grid grid-cols-2 gap-3">
        <InvoiceInputField name="bankName" label="Bank name" />
        <InvoiceInputField name="branch" label="Branch" />
      </div>
      <InvoiceInputField name="accountHolder" label="Account holder (blank = your name)" />
      <InvoiceInputField name="accountNumber" label="Account number" inputMode="numeric" />
    </FormSection>
  )
}
