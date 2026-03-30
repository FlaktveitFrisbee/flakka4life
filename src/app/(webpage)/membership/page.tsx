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

const highlights = [
  "Innmelding går nå direkte i klubbens medlemssystem.",
  "Du slipper manuell behandling via Discord-skjema.",
  "Spond fungerer både i app og nettleser.",
];

export const metadata: Metadata = {
  title: "Bli medlem via Spond",
  description:
    "Bli medlem i Flaktveit Frisbeegolf via Spond. Send forespørsel i Spond og få medlemskapet godkjent av klubben.",
};

export default function MembershipPage() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start">
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

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
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

        <aside className="relative overflow-hidden rounded-[2rem] border border-teal-200/80 bg-linear-to-br from-teal-50 via-white to-zinc-50 p-6 shadow-lg shadow-zinc-950/5 dark:border-teal-900/60 dark:from-teal-950/40 dark:via-zinc-900 dark:to-zinc-950">
          <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-teal-400/70 to-transparent" />
          <p className="text-sm font-semibold tracking-[0.2em] text-teal-600 uppercase dark:text-teal-300">
            Slik fungerer det
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Kortere vei fra interesse til medlemskap
          </h2>
          <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Den gamle løsningen sendte medlemsdata til Discord for manuell
            oppfølging. Nå går forespørselen rett til Spond, der klubben
            allerede håndterer medlemmer og godkjenninger.
          </p>

          <ul className="mt-6 space-y-3">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/80 p-4 text-sm text-zinc-700 shadow-sm shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500 dark:text-teal-300" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-zinc-200/80 bg-zinc-950 p-5 text-zinc-100 dark:border-zinc-800">
            <p className="text-sm font-semibold text-teal-300">
              Trenger du hjelp?
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Ta kontakt hvis du står fast med invitasjonen eller lurer på
              medlemskapet.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href={`mailto:${contactEmail}`}
                className="text-sm font-medium text-white transition hover:text-teal-300"
              >
                {contactEmail}
              </Link>
              <Link
                href={discordUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-teal-300"
              >
                <MessageCircleMore className="h-4 w-4" />
                Bli med på Discord
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
