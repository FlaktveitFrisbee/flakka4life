import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="flex h-full items-center pt-16 sm:pt-32">
      <div className="flex flex-col items-center">
        <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Siden finnes ikke
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Beklager, vi kunne ikke finne siden du leter etter.
        </p>
        <Button asChild>
          <Link href="/">Gå tilbake til startsiden</Link>
        </Button>
      </div>
    </Container>
  );
}
