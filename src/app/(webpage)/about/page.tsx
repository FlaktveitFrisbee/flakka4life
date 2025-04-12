import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import portraitImage from "@/images/photos/trip.jpg";
import antidopingImage from "@/images/Antidoping.png";
import VippsButton, { VippsDonateIcon } from "@/components/VippsButton";
import { FaFacebook, FaInstagram, FaDiscord, FaEnvelope } from "react-icons/fa";
import qrCodeImage from "@/images/QR_GreenFee.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SocialLink from "@/components/SocialLink";

export const metadata: Metadata = {
  title: "Flaktveit Frisbeegolf",
  description: "Under utbygging",
};

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Flaktveit Frisbeegolf
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              Flaktveit Frisbeegolf ble en del av FIK i 2016 med en 9-hullsbane
              i Flaktveitparken og rundt Breimyra fotballbane. Året etter ble
              banen utvidet til en 18-hullsbane, hvor de 9 siste hullene er
              rundt Breimyra Ungdomsskole og Flaktveit stadion. Banen er gratis
              å spille på og i daglig bruk av medlemmer og tilreisende.
            </p>
            <p>
              Frisbeegolf er et lavterskeltilbud som passer store og små, og vi
              i klubben har barn og unge som satsningsområde. Ønsker du å bli
              medlem er det gjort på et par tastetrykk inne på denne nettsiden.
            </p>
            <Button asChild>
              <Link href="/membership">Bli medlem</Link>
            </Button>

            {/* Simple Antidoping section */}
            <div className="mt-10 border-t border-zinc-100 pt-10 dark:border-zinc-700/40">
              <div className="flex flex-col">
                <div className="mb-4 w-40">
                  <Image
                    src={antidopingImage}
                    alt="Rent Idrettslag logo"
                    width={175}
                    height={175}
                  />
                </div>
                <div>
                  <h2 className="mb-3 text-xl font-bold text-zinc-800 dark:text-zinc-100">
                    Vi er sertifisert som Rent Idrettslag i Mars 2025
                  </h2>
                  <p className="mb-4">
                    Som rent idrettslag har vi et særskilt ansvar for å spre
                    gode holdninger og kunnskap om antidoping gjennom klare mål
                    og handlinger. Sammen tar vi ansvar for idrettsklubbens
                    holdningsskapende arbeid gjennom følgende handlingsplan:
                  </p>
                  <ol className="ml-5 list-decimal space-y-1">
                    <li>HENGE OPP RENT IL-PLAKAT I LOKALENE</li>
                    <li>PUBLISER INFORMASJON PÅ NETTSIDE/SOSIALE MEDIER</li>
                    <li>GJENNOMFØRE REN UTØVER</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://www.facebook.com/groups/1691012384470516"
              icon={FaFacebook}
            >
              Følg oss på Facebook
            </SocialLink>
            <SocialLink
              href="https://www.instagram.com/flaktveitfrisbee/"
              icon={FaInstagram}
              className="mt-4"
            >
              Følg oss på Instagram
            </SocialLink>
            <SocialLink
              href="https://discord.gg/fRQHEmvB2m"
              icon={FaDiscord}
              className="mt-4"
            >
              Bli med på Discord
            </SocialLink>
            <SocialLink
              href="mailto:frisbee@flatkveitik.no"
              icon={FaEnvelope}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              frisbee@flatkveitik.no
            </SocialLink>
          </ul>

          {/* Donation Poster */}
          <div className="mt-10 border-t border-zinc-100 pt-10 dark:border-zinc-700/40">
            <div className="rounded-xl bg-teal-50 p-6 text-center dark:bg-teal-900/30">
              <h2 className="text-xl font-bold text-teal-700 dark:text-teal-300">
                Støtt vårt lokale frisbeefelleskap!
              </h2>
              <div className="space-y-3 pt-3 text-sm text-zinc-600 dark:text-zinc-400">
                <p>
                  Vi inviterer deg til å være med på å styrke vårt frisbeemiljø.
                </p>
                <p>
                  Banen er åpen for alle, og din frivillige donasjon vil hjelpe
                  oss med å opprettholde og forbedre fasilitetene for hele
                  lokalsamfunnet.
                </p>
                <p>
                  Sammen skaper vi en trygg og inkluderende arena for aktivitet,
                  glede og fellesskap.
                </p>
                <p className="font-medium text-teal-700 dark:text-teal-300">
                  Tusen takk for at du er med på laget!
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 pt-4">
                <VippsButton className="block md:hidden" />
                <div className="hidden md:block">
                  <Dialog>
                    <DialogTrigger className="h-10">
                      <VippsDonateIcon />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Støtt frisbeeklubben</DialogTitle>
                        <DialogDescription>
                          Scan QR-koden, eller søk opp #586158 på Vipps.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="relative h-80">
                        <Image
                          src={qrCodeImage}
                          alt="Vipps QR-kode for donasjon"
                          fill
                          className="rounded-md object-contain"
                          sizes="20rem"
                        />
                      </div>
                      <DialogFooter className="sm:justify-center">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Lukk
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Vippskode: #586158
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
