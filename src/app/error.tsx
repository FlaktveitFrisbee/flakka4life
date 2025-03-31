'use client'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

// Error boundaries must be Client Components

export default function Error({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  //   useEffect(() => {
  //     // Log the error to an error reporting service
  //     console.error(error)
  //   }, [error])

  return (
    <Container className="flex h-full items-center pt-16 sm:pt-32">
      <div className="flex flex-col items-center">
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Noe gikk galt
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Det oppstod en feil. Prøv igjen senere.
        </p>
        <Button href="/" variant="secondary" className="mt-4">
          Gå tilbake til startsiden
        </Button>
      </div>
    </Container>
  )
}
