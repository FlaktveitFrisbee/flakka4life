import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SimpleLayout } from "@/components/SimpleLayout";
import banekartImage from "@/images/Banekart.png";

export const metadata: Metadata = {
  title: "Banen",
  description: "Informasjon om banen",
};

export default function Projects() {
  const caddieBookPdfUrl =
    "https://cdn.sanity.io/files/iy9nrfxf/production/d447095d380b94887f6cac9f00b06b0d8bc899e2.pdf";
  
  return (
    <SimpleLayout title="Flaktveit DiscGolfPark" intro="I 2016 kom banen til liv med en 9-hullsbane i Flaktveitparken og rundt Breimyra fotballbane. Året etter ble banen utvidet til en 18-hullsbane, hvor de 9 siste hullene er rundt Breimyra Ungdomsskole og Flaktveit stadion. I 2025 startet vi arbeidet med nye hull ovenfor Flaktveit stadion. Mer informasjon om disse kommer.">
      <div className="flex flex-col gap-y-8">
        {/* Buttons with consistent styling */}
        <div className="flex flex-wrap gap-4">
          <a
            href="https://udisc.com/courses/flaktveit-disk-golf-park-8viX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-teal-100 px-4 py-2 text-base font-medium text-teal-800 transition hover:bg-teal-200 dark:bg-teal-800 dark:text-teal-100 dark:hover:bg-teal-700"
          >
            Banen på UDisc
          </a>
          
          <a
            href={caddieBookPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-teal-100 px-4 py-2 text-base font-medium text-teal-800 transition hover:bg-teal-200 dark:bg-teal-800 dark:text-teal-100 dark:hover:bg-teal-700"
          >
            Last ned banekart
          </a>
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
        <div className="mt-8 prose prose-zinc dark:prose-invert">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Spilleregler
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Under utbygging.
          </p>
        </div>
      </div>
    </SimpleLayout>
  );
}
