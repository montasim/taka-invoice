import { Delete02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import { useInvoice } from "../../hooks/use-invoice"
import type { LineItem } from "../../types"

interface LineItemRowProps {
  item: LineItem
  index: number
}

/** One invoice line: description on top, period / amount / remove below. */
export function LineItemRow({ item, index }: LineItemRowProps) {
  const { updateItem, removeItem } = useInvoice()
  const n = index + 1

  return (
    <div className="flex flex-col gap-2 rounded-md border p-2">
      <Textarea
        aria-label={`Description line ${n}`}
        placeholder="Description"
        className="min-h-16"
        value={item.description}
        onChange={(e) => updateItem(item.id, { description: e.target.value })}
      />
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_36px] items-center gap-2">
        <Input
          aria-label={`Period line ${n}`}
          placeholder="Sep 2026"
          value={item.period}
          onChange={(e) => updateItem(item.id, { period: e.target.value })}
        />
        <Input
          aria-label={`Amount line ${n}`}
          placeholder="Amount"
          type="number"
          min={0}
          step={1}
          value={item.amount}
          onChange={(e) => updateItem(item.id, { amount: e.target.value })}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Remove line ${n}`}
              onClick={() => removeItem(item.id)}
            >
              <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove line</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
