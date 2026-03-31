import { type Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Download,
  MessageCircleMore,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";

const spondInviteUrl = "https://spond.com/invite/VVGNS";
const discordUrl = "https://discord.gg/fRQHEmvB2m";
const contactEmail = "frisbee@flatkveitik.no";

const steps = [
  {
    title: "1. Åpne Spond",
    description:
      "Trykk på lenken under. Har du ikke Spond fra før, kan du opprette bruker eller laste ned appen først.",
    icon: Download,
  },
  {
    title: "2. Send inn forespørsel",
    description:
      "Be om å bli med i gruppen for Flaktveit Frisbeegolf direkte i Spond. Du legger inn opplysningene der, ikke på nettsiden.",
    icon: CheckCircle2,
  },
  {
    title: "3. Bli godkjent",
    description:
      "En administrator godkjenner forespørselen i Spond. Når den er godkjent, er medlemskapet registrert i riktig system.",
    icon: ShieldCheck,
  },
];

export const metadata: Metadata = {
  title: "Bli medlem via Spond",
  description:
    "Bli medlem i Flaktveit Frisbeegolf via Spond. Send forespørsel i Spond og få medlemskapet godkjent av klubben.",
};

export default function MembershipPage() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="max-w-5xl">
        <section>
          <p className="text-sm font-semibold tracking-[0.2em] text-teal-500 uppercase dark:text-teal-400">
            Medlemskap
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Bli medlem via Spond
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Klubben har flyttet medlemsregistreringen over til Spond. Det betyr
            at du sender inn medlemsforespørselen direkte der, og at en
            administrator kan godkjenne deg i samme system uten mellomledd.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link
                href={spondInviteUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                Åpne Spond-invitasjon
                <ArrowUpRight />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-zinc-200 px-6 dark:border-zinc-700"
            >
              <Link href="/about">Les mer om klubben</Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            Lenken åpner Spond i ny fane. På mobil vil den normalt sende deg
            videre til app eller installasjon.
          </p>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {steps.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-3xl border border-zinc-200/80 bg-zinc-50/80 p-6 shadow-sm shadow-zinc-950/5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:bg-teal-400/10 dark:text-teal-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-zinc-200/80 bg-zinc-50/80 p-6 shadow-sm shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900/70">
          <p className="text-sm font-semibold text-teal-500 dark:text-teal-300">
            Trenger du hjelp?
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Ta kontakt hvis du står fast med invitasjonen eller lurer på
            medlemskapet.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <Link
              href={`mailto:${contactEmail}`}
              className="text-sm font-medium text-zinc-900 transition hover:text-teal-500 dark:text-zinc-100 dark:hover:text-teal-300"
            >
              {contactEmail}
            </Link>
            <Link
              href={discordUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 transition hover:text-teal-500 dark:text-zinc-100 dark:hover:text-teal-300"
            >
              <MessageCircleMore className="h-4 w-4" />
              Bli med på Discord
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}
