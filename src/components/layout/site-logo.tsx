import { Invoice01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { siteConfig } from "@/config/site"

export function SiteLogo() {
  return (
    <a href="#top" className="flex items-center gap-2 font-semibold">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <HugeiconsIcon icon={Invoice01Icon} strokeWidth={2} className="size-4.5" />
      </span>
      {siteConfig.name}
    </a>
  )
}
