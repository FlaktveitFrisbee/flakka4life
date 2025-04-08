import { type Metadata } from "next";
import { SimpleLayout } from "@/components/SimpleLayout";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Banen",
  description: "Informasjon om banen",
};

export default function Projects() {
  const caddieBookPdfUrl =
    "https://cdn.sanity.io/files/iy9nrfxf/production/d447095d380b94887f6cac9f00b06b0d8bc899e2.pdf";
  return (
    <SimpleLayout title="Banen" intro="Under utbygging">
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
      </div>
    </SimpleLayout>
  );
}
