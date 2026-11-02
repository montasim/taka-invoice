# Contributing to Taka Invoice

Thanks for helping improve Taka Invoice. This guide covers how to set up the project, what to check before opening a pull request, and where code lives.

## Set up

You need Node.js 22.12 or newer (the repository pins 24 in `.nvmrc`) and npm.

```bash
git clone https://github.com/montasim/taka-invoice.git
cd taka-invoice
npm ci
npm run dev
```

The app runs at the address Vite prints, normally `http://localhost:5173`.

## Before you open a pull request

Run the same checks as CI:

```bash
npm run lint
npm run build
```

`npm run build` type-checks the project (`tsc -b`) and builds the production bundle into `dist/`. `npm run check` runs both.

Also check your change in the browser at a phone width and a desktop width. If you touched the invoice sheet, print it or save it as a PDF to confirm it still fits one A4 page.

## Where things live

- `src/features/invoice/` holds the invoice feature: types, state, helpers, the form and the A4 preview. Its public exports are in `src/features/invoice/index.ts`.
- `src/components/ui/` holds shadcn/ui components. Add new ones with `npx shadcn@latest add <component>` and keep the project's smaller corner radii (`rounded-md` for controls, `rounded-lg` for cards and popovers).
- `src/components/layout/` holds the header, footer and logo.
- `src/config/site.ts` reads the site name, description, URL and repository from `package.json`, so update `package.json` rather than hard-coding them elsewhere.
- Spacing follows the scale documented at the top of `src/App.tsx`.

## Pull requests

- Keep each pull request focused on one change.
- Describe what changed and how you checked it (the pull request template has a checklist).
- Do not include real names, addresses or bank details in screenshots or test data.

## Reporting bugs and security issues

Open a [GitHub issue](https://github.com/montasim/taka-invoice/issues) for bugs and feature ideas. For security vulnerabilities, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
