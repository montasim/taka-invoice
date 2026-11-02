import { readFileSync } from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Site metadata, derived once from package.json so the HTML head, the app
 * and the README never drift apart. `index.html` uses it through
 * `%SITE_*%` tokens; app code reads it as the `__SITE__` constant.
 */
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

const site = {
  name: pkg.displayName as string,
  title: `${pkg.displayName} — BDT salary and service invoices`,
  description: pkg.description as string,
  url: (pkg.homepage as string).replace(/\/$/, ''),
  repositoryUrl: (pkg.repository.url as string).replace(/^git\+/, '').replace(/\.git$/, ''),
  ogImage: {
    // Versioned filename: bump it when the image changes so crawlers refetch.
    path: '/social-preview-v1.png',
    width: 1200,
    height: 630,
    alt: `${pkg.displayName}: fill in a form and get a print-ready A4 invoice in Bangladeshi Taka.`,
  },
  themeColor: { light: '#ffffff', dark: '#0a0a0a' },
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Files generated from the same metadata, served in dev and emitted on build. */
const generatedFiles: Record<string, { type: string; body: string }> = {
  'site.webmanifest': {
    type: 'application/manifest+json',
    body: JSON.stringify(
      {
        name: site.name,
        short_name: site.name,
        description: site.description,
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: site.themeColor.light,
        theme_color: site.themeColor.dark,
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      null,
      2,
    ),
  },
  'robots.txt': {
    type: 'text/plain',
    body: `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`,
  },
  'sitemap.xml': {
    type: 'application/xml',
    body: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${site.url}/</loc></url>
</urlset>
`,
  },
}

/**
 * Replaces `%SITE_*%` tokens in index.html (failing the build on an unknown
 * token) and generates the manifest, robots.txt and sitemap.xml.
 */
function siteMetadata(): Plugin {
  const tokens: Record<string, string> = {
    NAME: site.name,
    TITLE: site.title,
    DESCRIPTION: site.description,
    URL: `${site.url}/`,
    OG_IMAGE: `${site.url}${site.ogImage.path}`,
    OG_IMAGE_WIDTH: String(site.ogImage.width),
    OG_IMAGE_HEIGHT: String(site.ogImage.height),
    OG_IMAGE_ALT: site.ogImage.alt,
    THEME_LIGHT: site.themeColor.light,
    THEME_DARK: site.themeColor.dark,
  }
  return {
    name: 'site-metadata',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = generatedFiles[(req.url ?? '').split('?')[0].slice(1)]
        if (!file) return next()
        res.setHeader('Content-Type', file.type)
        res.end(file.body)
      })
    },
    generateBundle() {
      for (const [fileName, file] of Object.entries(generatedFiles)) {
        this.emitFile({ type: 'asset', fileName, source: file.body })
      }
    },
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html.replace(/%SITE_([A-Z_]+)%/g, (match, key: string) => {
          if (!(key in tokens)) throw new Error(`Unknown metadata token ${match} in index.html`)
          return escapeHtml(tokens[key])
        }),
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [siteMetadata(), react(), tailwindcss()],
  define: {
    __SITE__: JSON.stringify(site),
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
