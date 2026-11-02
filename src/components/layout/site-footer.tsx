import { SecurityCheckIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/config/site"

import { SiteLogo } from "./site-logo"

const year = new Date().getFullYear()

/**
 * Full footer on small screens; on large screens only the slim bottom bar
 * shows, so the app fits the viewport without page scrolling.
 */
export function SiteFooter() {
  return (
    <footer className="border-t bg-background print:hidden">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:grid-cols-[2fr_1fr_1fr] sm:px-6 lg:hidden">
        <div className="flex flex-col gap-2">
          <SiteLogo />
          <p className="max-w-sm text-sm text-muted-foreground">{siteConfig.description}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
          <h2 className="font-medium">App</h2>
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm">
          <h2 className="font-medium">Tips</h2>
          <p className="text-muted-foreground">
            In the print dialog choose <span className="text-foreground">Save as PDF</span>,
            A4 paper and no margins.
          </p>
        </div>
      </div>

      <Separator className="lg:hidden" />

      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {year} {siteConfig.name}. Released under the{" "}
          <a
            href={`${siteConfig.githubUrl}/blob/main/LICENSE`}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            MIT License
          </a>
          .
        </p>
        <div className="flex items-center gap-4">
          <p className="flex items-center gap-2">
            <HugeiconsIcon icon={SecurityCheckIcon} strokeWidth={2} className="size-3.5" />
            Your details never leave this browser.
          </p>
          {siteConfig.githubUrl && (
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Source on GitHub
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
