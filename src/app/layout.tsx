import "@/styles/globals.css";
import { type Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PostHogProvider } from "@/components/PostHogProvider";

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
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body className="min-h-screen bg-zinc-50 dark:bg-black">
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
