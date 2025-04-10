import { type Metadata } from "next";

import "@/styles/tailwind.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Flaktveit Frisbeegolf",
    default: `Flaktveit Frisbeegolf`,
  },
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Velkommen til den offisielle nettsiden til Flaktveit Frisbeegolf.",
  alternates: {
    types: {
      "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body className="min-h-screen bg-zinc-50 dark:bg-black">{children}</body>
    </html>
  );
}
