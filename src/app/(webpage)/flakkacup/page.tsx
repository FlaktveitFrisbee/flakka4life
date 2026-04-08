import { type Metadata } from "next";

import { SimpleLayout } from "@/components/SimpleLayout";
import WeeklyTable from "./weekly-table";
import { getCompetition } from "@/server/queries";
import { currentWeekly, weeklies } from "./helpers";
import { notFound } from "next/navigation";
import FlakkacupLinks from "./flakkacup-links";
// import Link from "next/link";
export const metadata: Metadata = {
  title: "Flakkacup",
  description: "Flakkacup er en ukentlig frisbeegolfturnering på Flaktveit.",
};

export const revalidate = 7200; // 2 hours revalidation. https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate

export default async function FlakkacupPage() {
  const { competition, error } = await getCompetition(currentWeekly.id);
  if (error) {
    notFound();
  }
  return (
    <SimpleLayout
      title="Flakkacup"
      intro="Flakkacup er en ukentlig frisbeegolfturnering på Flaktveit."
    >
      {/* <div className="prose prose-sm dark:prose-invert sm:prose lg:prose-lg max-w-full pb-4">
        <strong>Påmeldingsavgift for sesongen 2025</strong>
        <br />
        Deltakere som spiller 3 runder eller mer må betale 50kr i
        påmeldingsavgift.
        <br />
        Vipps til #695783 «FlakkaCup CTP|Acepot 2025».
      </div> */}
      <h2 className="pb-4 text-2xl font-semibold">
        Resultater fra {currentWeekly.name}
      </h2>
      <WeeklyTable
        competition={competition}
        significantRounds={currentWeekly.significantRounds}
      />

      <div className="flex flex-col gap-4 pt-3 md:flex-row md:justify-between">
        <FlakkacupLinks currentPageWeekly={currentWeekly} weeklies={weeklies} />
        <a
          href={currentWeekly?.metrixLink}
          className="underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Link til konkurransen på Metrix
        </a>
      </div>

      <h2 className="pt-8 pb-4 text-2xl font-semibold">
        Informasjon om Flakkacup 2026
      </h2>
      {/* The folling html is just copied from the sanity rendered post */}
      <div
        className={
          "prose prose-sm dark:prose-invert sm:prose lg:prose-lg max-w-full"
        }
      >
        <p>
          Endelig er sesongen i gang og årets første runde i Flakkacup en kort
          putt unna!
          <br />
          Her kommer litt detaljert informasjon om årets ukesgolf.
        </p>
        <p>
          <strong>Divisjoner</strong>
        </p>
        <ul>
          <li>
            MPO, over 900 rating. Man kan velge å spille i MPO selv om man er
            under 900 rating.
          </li>
          <li>FPO, damer.</li>
          <li>MP40, Pro Masters 40+. Alder 40 år og over.</li>
          <li>Rekreasjon, under 900 rating.</li>
          <li>Junior, under 18 år.</li>
        </ul>
        <p>
          <strong>OBS:</strong> Deltakere bruker sin Metrix rating til å
          definere hvilken divisjon man tilhører ved første gangs påmelding. Det
          betyr at hvis man starter sesongen under 900 i rating og på et
          tidspunkt går over grensen til 900, kan man velge å fullføre sesongen
          i rekreasjon eller å gå opp til MPO.
        </p>
        <p>Med sunn fornuft går dette fint 😊</p>
        {/* <p>
          <strong>Påmeldingsavgift for sesongen 2026</strong>
        </p>
        <ul>
          <li>
            Deltakere som spiller 3 runder eller mer må betale 50kr i
            påmeldingsavgift.
            <br />
            Vipps til #695783 «FlakkaCup CTP|Acepot 2025».
          </li>
          <li>All påmeldingsavgift går utelukkende til kjøp av premier.</li>
          <li>
            Deltakere må betale påmeldingsavgift for å kunne vinne premier.
          </li>
        </ul> */}
        <p>
          <strong>Premiering</strong>
        </p>
        <ul>
          <li>
            Topp 3 sammenlagt i hver klasse premieres (MPO, FPO, Rekreasjon og
            Junior).
          </li>
          <li>
            I tillegg vil vi trekke 3 tilfeldige vinnere av de som spiller
            minimum 15 runder, som vinner hver sin disk.
          </li>
          <li>Utdeling av alle premier skjer etter årets siste Flakkacup.</li>
        </ul>
        <p>
          <strong>Sammenlagtpoeng</strong>
        </p>
        <p>
          Vi kjører samme poengfordeling som ble gjort i fjor. Sammenlagt
          poengsum vil kun basere seg på de 10 beste rundene dine, så her
          gjelder det å spisse formen! Dersom flere oppnår maks poengsum vil vi
          se på hvem som har spilt best på de andre ikke-tellende rundene.
          Poengfordeling per runde:
        </p>
        <p>1.plass - 15 poeng</p>
        <p>2.plass - 12 poeng</p>
        <p>3.plass - 10 poeng</p>
        <p>4.plass - 8 poeng</p>
        <p>5.plass - 6 poeng</p>
        <p>6.plass - 5 poeng</p>
        <p>7.plass - 4 poeng</p>
        <p>8.plass - 3 poeng</p>
        <p>9.plass - 2 poeng</p>
        <p>10.plass - 1 poeng</p>
        <p>
          Dere kan følge med på sammenlagtstillingen på vår hjemmeside:{" "}
          <a href="https://flaktveitfrisbee.no/flakkacup">
            https://flaktveitfrisbee.no/{" "}
          </a>
        </p>
        {/* <p>
          <strong>Vi kjører CTP og Acepot hver runde.</strong>
        </p>
        <p>
          Vipps 25kr til #695783 «FlakkaCup CTP|Acepot 2025».Det vil ikke være
          mulig å melde seg på bare en av delene.Fordelingen vil være 10kr i
          Acepot og 15kr i CTP.
        </p>
        <p>
          <strong>Acepot</strong>
        </p>
        <p>
          Det utbetales 75% av potten hver gang. Dersom det er flere som acer på
          samme runde deles potten likt på disse.
        </p>
        <p>
          <strong>CTP</strong>
        </p>
        <p>
          Det vil være CTP på alle hull. Det vil si at på de lengste hullene som
          1, 4 og 7 vil CTP gjelde for kast nummer to.
        </p>
        <p>
          <strong>PDGA</strong>
        </p>
        <p>
          Som annonsert tidligere i år skal vi prøve å arrangere hver fjerde
          ukesgolf som PDGA turnering. Disse rundene vil kreve en ekstra
          påmeldingsavgift for å dekke utgifter knyttet til at runden er
          pdga-sanksjonert. Det vil komme mer detaljert info når påmelding til
          første PDGA runde legges ut. Dere finner oversikt over alle rundene og
          hvilke som er PDGA i kalenderen vår. Denne finner du{" "}
          <Link href="/">her</Link>.
        </p> */}
      </div>
    </SimpleLayout>
  );
}
