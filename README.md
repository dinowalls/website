# Dinowalls Website

Marketing site for Dinowalls, an iOS wallpaper app focused on dynamic wallpapers, AI-generated designs, and a browsable free catalog.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI primitives
- pnpm

## Development

Install dependencies and start the local dev server:

```bash
pnpm install
pnpm dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Project Structure

- `src/app` contains routes, layout, metadata, and global styles.
- `src/components` contains the homepage sections and shared UI components.
- `src/lib` contains utilities and Appwrite-related helpers.
- `public` contains static marketing images and app assets.

## Notes

- Use `pnpm` for installs and scripts in this repository.
- The site favicon is driven by `src/app/icon.svg`, which matches the logo used in the site header.
