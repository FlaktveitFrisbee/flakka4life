import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { Container } from "@/components/Container";
import { FaFacebook, FaInstagram, FaDiscord } from "react-icons/fa";
import image1 from "@/images/photos/01.jpg";
import image2 from "@/images/photos/02.jpg";
import image3 from "@/images/photos/03.jpg";
import image4 from "@/images/photos/04.jpg";
import image5 from "@/images/photos/05.jpg";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SocialLink from "@/components/SocialLink";
function Photos() {
  const rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ];

  return (
    <ScrollArea className="pt-8">
      <div className="flex justify-center gap-5 px-4 py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5]
          .reverse()
          .map((image, imageIndex) => (
            <div
              key={image.src}
              className={clsx(
                "relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800",
                rotations[imageIndex % rotations.length],
              )}
            >
              <Image
                src={image}
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default async function Home() {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Flaktveit Frisbeegolf
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Velkommen til den offisielle nettsiden til Flaktveit Frisbeegolf.
            Her kan du melde deg inn i klubben, finne informasjon om banen eller
            sjekke kalenderen vår. Alle funksjoner er ikke tilgjengelig enda,
            men vi jobber med å ferdigstille dette.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://www.facebook.com/groups/1691012384470516"
              aria-label="Følg oss på Facebook"
              icon={FaFacebook}
            />
            <SocialLink
              href="https://www.instagram.com/flaktveitfrisbee/"
              aria-label="Følg oss på Instagram"
              icon={FaInstagram}
            />
            <SocialLink
              href="https://discord.gg/fRQHEmvB2m"
              aria-label="Bli med på Discord"
              icon={FaDiscord}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <div className="m-4 mx-auto flex w-full flex-row items-center justify-center gap-4">
        <p>
          <Link
            href="/membership"
            className="inline-flex items-center rounded-md bg-teal-100 px-4 py-2 text-base font-medium text-teal-800 transition hover:bg-teal-200 dark:bg-teal-800 dark:text-teal-100 dark:hover:bg-teal-700"
          >
            Bli Medlem
          </Link>
        </p>
      </div>
      <Container className="pt-16 md:pt-20">
        <h2 className="pb-8 text-3xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Årshjul
        </h2>
        <div className="flex items-center justify-center">
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FBerlin&showPrint=0&title=Flaktveit%20Frisbeegolf&src=Zmxha3R2ZWl0ZnJpc2JlZWdvbGZAZ21haWwuY29t&color=%23F6BF26&mode=AGENDA&showCalendars=0"
            width="100%"
            height="600"
            className="rounded-xl"
          ></iframe>
        </div>
      </Container>
    </>
  );
}
