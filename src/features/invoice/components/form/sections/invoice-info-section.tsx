import { FileEditIcon } from "@hugeicons/core-free-icons"

import { previousMonthPeriod } from "../../../lib/format"
import { FormSection } from "../form-section"
import { InvoiceInputField } from "../invoice-fields"

export function InvoiceInfoSection() {
  return (
    <FormSection title="Invoice info" icon={FileEditIcon}>
      <div className="grid grid-cols-2 gap-3">
        <InvoiceInputField name="invoiceNo" label="Invoice no." />
        <InvoiceInputField name="invoiceDate" label="Invoice date" type="date" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <InvoiceInputField
          name="servicePeriod"
          label="Service period"
          placeholder={previousMonthPeriod()}
        />
        <InvoiceInputField name="paymentTerms" label="Payment terms" />
      </div>
    </FormSection>
  )
}
