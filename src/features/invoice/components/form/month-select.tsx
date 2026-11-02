import { useState } from "react"
import { UnfoldMoreIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { MONTHS } from "../../constants"

interface MonthSelectProps {
  id: string
  value: string
  onValueChange: (value: string) => void
}

/**
 * Searchable month picker (combobox). The value is the zero-based month
 * index as a string.
 */
export function MonthSelect({ id, value, onValueChange }: MonthSelectProps) {
  const [open, setOpen] = useState(false)
  const selected = MONTHS[Number(value)]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between px-3 font-normal"
        >
          <span className="truncate">{selected ?? "Month"}</span>
          <HugeiconsIcon
            icon={UnfoldMoreIcon}
            strokeWidth={2}
            className="text-muted-foreground"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-48 p-0">
        {/* Start with the current month highlighted. */}
        <Command defaultValue={selected}>
          <CommandInput placeholder="Search month…" />
          <CommandList>
            <CommandEmpty>No month found.</CommandEmpty>
            <CommandGroup>
              {MONTHS.map((month, index) => (
                <CommandItem
                  key={month}
                  value={month}
                  data-checked={String(index) === value}
                  onSelect={() => {
                    onValueChange(String(index))
                    setOpen(false)
                  }}
                >
                  {month}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
