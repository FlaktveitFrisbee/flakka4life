import { type Metadata } from "next";
import Image from "next/image";
import { SimpleLayout } from "@/components/SimpleLayout";
import { Button } from "@/components/ui/button";
import banekartImage from "@/images/Banekart.png";

export const metadata: Metadata = {
  title: "Banen",
  description: "Informasjon om banen",
};

export default function Projects() {
  const caddieBookPdfUrl =
    "https://cdn.sanity.io/files/iy9nrfxf/production/e198422330a834163b8347cd1b4e8d2af4e28148.pdf";

  return (
    <SimpleLayout
      title="Flaktveit DiscGolfPark"
      intro="I 2016 kom banen til liv med en 9-hullsbane i Flaktveitparken og rundt Breimyra fotballbane. Året etter ble banen utvidet til en 18-hullsbane, hvor de 9 siste hullene er rundt Breimyra Ungdomsskole og Flaktveit stadion. I 2025 startet vi arbeidet med nye hull ovenfor Flaktveit stadion. Mer informasjon om disse kommer."
    >
      <div className="flex flex-col gap-y-16">
        <div className="flex flex-row gap-x-16">
          <Button variant="default" asChild>
            <a
              href="https://udisc.com/courses/flaktveit-disk-golf-park-8viX"
              target="_blank"
              rel="noopener noreferrer"
            >
              Banen på UDisc
            </a>
          </Button>
          <Button asChild>
            <a
              href={caddieBookPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Last ned banekart
            </a>
          </Button>
        </div>

        {/* Course map image */}
        <div className="mt-8 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={banekartImage}
            alt="Banekart for Flaktveit Frisbeegolf"
            className="w-full object-cover"
            width={1200}
            height={800}
          />
        </div>

        {/* Additional information section */}
        <div className="prose prose-zinc dark:prose-invert mt-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Spilleregler
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">Under utbygging.</p>
        </div>
      </div>
    </SimpleLayout>
  );
}
