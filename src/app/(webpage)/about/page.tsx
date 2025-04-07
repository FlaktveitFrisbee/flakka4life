import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { FacebookIcon, InstagramIcon } from '@/components/SocialIcons'
import portraitImage from '@/images/photos/trip.jpg'
import VippsButton from '@/components/VippsButton'
import { DiscordLogoIcon } from '@radix-ui/react-icons'
import qrCodeImage from '@/images/QR_GreenFee.png'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Flaktveit Frisbeegolf',
  description: 'Under utbygging',
}

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
          <p>Flaktveit Frisbeegolf ble en del av FIK i 2016 med en 9-hullsbane i Flaktveitparken og rundt Breimyra fotballbane. Året etter ble banen utvidet til en 18-hullsbane, hvor de 9 siste hullene er rundt Breimyra Ungdomsskole og Flaktveit stadion. Banen er gratis å spille på og i daglig bruk av medlemmer og tilreisende.</p>
              <p>Frisbeegolf er et lavterskeltilbud som passer store og små, og vi i klubben har barn og unge som satsningsområde. Ønsker du å bli medlem er det gjort på et par tastetrykk inne på denne nettsiden.</p>
              <p>
                <Link 
                  href="/membership" 
                  className="inline-flex items-center rounded-md bg-teal-100 px-4 py-2 text-base font-medium text-teal-800 transition hover:bg-teal-200 dark:bg-teal-800 dark:text-teal-100 dark:hover:bg-teal-700"
                >
                  Bli Medlem
                </Link>
              </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://www.facebook.com/groups/1691012384470516 "
              icon={FacebookIcon}
            >
              Følg oss på Facebook
            </SocialLink>
            <SocialLink
              href="https://www.instagram.com/flaktveitfrisbee/"
              icon={InstagramIcon}
              className="mt-4"
            >
              Følg oss på Instagram
            </SocialLink>
            <SocialLink
              href="https://discord.gg/fRQHEmvB2m"
              icon={DiscordLogoIcon}
              className="mt-4"
            >
              Bli med på Discord
              </SocialLink>
            <SocialLink
              href="mailto:frisbee@flatkveitik.no"
              icon={MailIcon}
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
                <div className="mt-3 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <p>Vi inviterer deg til å være med på å styrke vårt frisbeemiljø.</p>
                  <p>Banen er åpen for alle, og din frivillige donasjon vil hjelpe oss med å opprettholde og forbedre fasilitetene for hele lokalsamfunnet.</p>
                  <p>Sammen skaper vi en trygg og inkluderende arena for aktivitet, glede og fellesskap.</p>
                  <p className="font-medium text-teal-700 dark:text-teal-300">Tusen takk for at du er med på laget!</p>
                </div>
                <div className="mt-4 flex justify-center">
                  <VippsButton />
                </div>
                <div className="mt-6 text-center">
                  <p className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Eller scan QR-koden:</p>
                  <div className="inline-block bg-white p-2 rounded-lg">
                    <Image
                      src={qrCodeImage}
                      alt="Vipps QR-kode for donasjon"
                      width={150}
                      height={150}
                      className="rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </Container>
  )
}
