import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { VisualEditing } from "next-sanity";

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDraftMode = (await draftMode()).isEnabled;
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="bg-background w-full ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex min-h-[100dvh] w-full flex-col">
        <Header />
        <main className="flex-auto">{children}</main>
        <Footer />
        {isDraftMode && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </div>
    </>
  );
}
