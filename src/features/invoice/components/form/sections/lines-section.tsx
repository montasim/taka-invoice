import { Add01Icon, CalendarAdd01Icon, Task01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useInvoice } from "../../../hooks/use-invoice"
import { FormSection } from "../form-section"
import { LineItemRow } from "../line-item-row"
import { MonthSelect } from "../month-select"

export function LinesSection() {
  const { invoice, setQuickFill, fillMonths, addItem } = useInvoice()
  const { quickFill, items } = invoice

  const handleFill = () => {
    const error = fillMonths()
    if (error) toast.error(error)
  }

  return (
    <FormSection
      title="Lines"
      icon={Task01Icon}
      description={
        <FieldDescription className="mt-0!">
          Pick months and an amount to add one line per month.
        </FieldDescription>
      }
    >
      <div className="grid grid-cols-3 gap-3">
        <Field className="gap-1.5">
          <FieldLabel htmlFor="qfFrom">From</FieldLabel>
          <MonthSelect
            id="qfFrom"
            value={quickFill.fromMonth}
            onValueChange={(v) => setQuickFill("fromMonth", v)}
          />
        </Field>
        <Field className="gap-1.5">
          <FieldLabel htmlFor="qfTo">To</FieldLabel>
          <MonthSelect
            id="qfTo"
            value={quickFill.toMonth}
            onValueChange={(v) => setQuickFill("toMonth", v)}
          />
        </Field>
        <Field className="gap-1.5">
          <FieldLabel htmlFor="qfYear">Year</FieldLabel>
          <Input
            id="qfYear"
            type="number"
            min={2000}
            max={2100}
            value={quickFill.year}
            onChange={(e) => setQuickFill("year", e.target.value)}
          />
        </Field>
      </div>

      <Field className="gap-1.5">
        <FieldLabel htmlFor="qfAmount">Monthly amount (BDT)</FieldLabel>
        <Input
          id="qfAmount"
          type="number"
          min={0}
          step={1}
          placeholder="e.g. 50000"
          value={quickFill.monthlyAmount}
          onChange={(e) => setQuickFill("monthlyAmount", e.target.value)}
        />
      </Field>

      <Field className="gap-1.5">
        <FieldLabel htmlFor="qfDesc">Description</FieldLabel>
        <Textarea
          id="qfDesc"
          className="min-h-16"
          value={quickFill.description}
          onChange={(e) => setQuickFill("description", e.target.value)}
        />
      </Field>

      <div>
        <Button type="button" onClick={handleFill}>
          <HugeiconsIcon icon={CalendarAdd01Icon} strokeWidth={2} data-icon="inline-start" />
          Fill months
        </Button>
      </div>

      {items.length > 0 && (
        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <LineItemRow key={item.id} item={item} index={index} />
          ))}
        </div>
      )}

      <div>
        <Button type="button" variant="outline" onClick={addItem}>
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
          Add a line
        </Button>
      </div>
    </FormSection>
  )
}
