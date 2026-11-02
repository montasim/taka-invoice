/** Site identity, injected at build time from package.json (see vite.config.ts). */
declare const __SITE__: {
  name: string
  title: string
  description: string
  url: string
  repositoryUrl: string
}

export const siteConfig = {
  name: __SITE__.name,
  description: __SITE__.description,
  url: __SITE__.url,
  githubUrl: __SITE__.repositoryUrl,
  nav: [
    { title: "Invoice form", href: "#invoice-form" },
    { title: "Preview", href: "#invoice-preview" },
  ],
} as const
