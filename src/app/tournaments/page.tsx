import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Button } from '@/components/Button'

function TournamentSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({
  title,
  description,
  event,
  cta,
  href,
}: {
  title: string
  description: string
  event: string
  cta: string
  href: string
}) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'Turneringer',
  description: 'Under utbygging',
}

export default function Speaking() {
  return (
    <SimpleLayout title="Turneringer" intro="Denne siden er under utbygging.">
      <div className="space-y-20">
        <Button href="/tournaments/weeklies">Flakkacup leaderboard</Button>
        <TournamentSection title="Siste og oppkommende turneringer">
          <Appearance
            href="https://discgolfmetrix.com/3082767"
            title="Flaktveit Open #2 2024"
            description="Kommer"
            event="Flaktveit Open"
            cta="Påmelding"
          />
          <Appearance
            href="https://www.pdga.com/tour/event/83397#MP40"
            title="Flaktveit Open #1 2024"
            description="Turnering ferdig"
            event="Flaktveit Open"
            cta="PDGA Scorecard"
          />
        </TournamentSection>
        <TournamentSection title="Weeklies">
          <Appearance
            href="https://udisc.com"
            title="Flakkacup Winter Edition 2024"
            description="Ukentlig turnering. Vi har begynt å forsøke å bruke UDisc til weeklies"
            event="Weeklies"
            cta="Link til UDisc League"
          />
          <Appearance
            href="https://discgolfmetrix.com/2874902"
            title="Flakkacup Summer Edition 2024"
            description="Ukentlig turnering. Hver torsdag kl. 18 i perioden april til oktober."
            event="Weeklies"
            cta="Link til Metrix"
          />
        </TournamentSection>
      </div>
    </SimpleLayout>
  )
}
