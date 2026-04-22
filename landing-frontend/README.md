This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel (GitHub)

1. Sign in at [vercel.com](https://vercel.com) and click **Add New… → Project**.
2. **Import** the GitHub repository `vemidi-dev/landing-frontend` (install the Vercel GitHub app if prompted).
3. Leave defaults: **Framework Preset** Next.js, **Root Directory** `./`, **Build Command** `npm run build`, **Output** auto.
4. Under **Environment Variables**, add the same keys as in [`.env.example`](./.env.example) if you want non-default Sanity project/dataset (optional if you use the built-in defaults).
5. Click **Deploy**. Every push to `main` will trigger a new production deployment; pull requests get preview URLs.

Official guide: [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs).
