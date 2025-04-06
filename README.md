# Flakka4Life

## Prerequisites

First, make sure you have pnpm installed. If you don't have it installed, you can install it using npm:

```bash
npm install -g pnpm
```

## Getting started

To get started with this template, first install the pnpm dependencies:

```bash
pnpm install
```

Next, create a `.env.local` file in the root of your project and copy over the values from [.env.example](.env.example). For any empty values in the example file, you can get them from:

- Your Vercel project settings
- Another developer on the team
- Your deployment platform's environment variables

⚠️ **Important**: Never commit your `.env.local` file or any other files containing secrets to git. The `.env.local` file is already in our `.gitignore` to prevent accidental commits.

Next, run the development server:

```bash
pnpm dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Changes to sanity schema

When you make changes to the Sanity schema or queries, you'll need to regenerate the TypeScript types. Run:

```bash
pnpm dlx sanity@latest schema extract
```

```bash
pnpm dlx sanity@latest typegen generate
```

This will update the types in `sanity.types.ts` to match your current schema. Make sure to commit these changes to git.

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
  <!-- - [Headless UI](https://headlessui.dev) - the official Headless UI documentation -->
  <!-- - [MDX](https://mdxjs.com) - the MDX documentation -->
