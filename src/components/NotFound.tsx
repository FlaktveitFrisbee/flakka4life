import Link from "next/link";
import { Container } from "./Container";
import { Button } from "./ui/button";

export default function NotFound() {
  return (
    <Container className="flex h-full items-center pt-16 sm:pt-32">
      <div className="flex flex-col items-center">
        <p className="text-base font-semibold">404</p>
        <h1 className="text-foreground mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Siden finnes ikke
        </h1>
        <p className="text-muted-foreground mt-4 text-base">
          Beklager, vi kunne ikke finne siden du leter etter.
        </p>
        <Button asChild>
          <Link href="/">Gå tilbake til startsiden</Link>
        </Button>
      </div>
    </Container>
  );
}
