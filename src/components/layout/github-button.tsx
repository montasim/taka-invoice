import { GithubIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { siteConfig } from "@/config/site"

/** Renders nothing until `siteConfig.githubUrl` is set. */
export function GithubButton() {
  if (!siteConfig.githubUrl) return null

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" asChild>
          <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer" aria-label="Source on GitHub">
            <HugeiconsIcon icon={GithubIcon} strokeWidth={2} />
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Source on GitHub</TooltipContent>
    </Tooltip>
  )
}
