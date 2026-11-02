import { ThemeToggle } from "@/components/theme-toggle"

import { GithubButton } from "./github-button"
import { SiteLogo } from "./site-logo"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 print:hidden">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:px-6">
        <SiteLogo />

        <div className="ml-auto flex items-center gap-1">
          <GithubButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
