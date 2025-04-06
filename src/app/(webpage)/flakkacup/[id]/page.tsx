import { SimpleLayout } from "@/components/SimpleLayout";
import { getCompetition } from "@/server/queries";
import React from "react";
import WeeklyTable from "../weekly-table";
import { getWeekly, weeklies } from "../helpers";
import { notFound } from "next/navigation";
import FlakkacupLinks from "../flakkacup-links";

export function generateStaticParams() {
  return weeklies
    .filter((w) => w.prerender === true)
    .map((weekly) => ({ id: weekly.id }));
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const { competition, error } = await getCompetition(id);

  if (error) {
    notFound();
  }

  const weeklyInfo = getWeekly(id);
  if (!weeklyInfo) {
    notFound();
  }
  const significantRounds = weeklyInfo?.significantRounds || 100;

  return (
    <SimpleLayout title={competition.Name} intro={competition.Comment}>
      <WeeklyTable
        competition={competition}
        significantRounds={significantRounds}
      />
      <div className="flex flex-col gap-4 pt-3 md:flex-row md:justify-between">
        <FlakkacupLinks currentPageWeekly={weeklyInfo} weeklies={weeklies} />
        <a
          href={weeklyInfo?.metrixLink}
          className="underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Link til konkurransen på Metrix
        </a>
      </div>
    </SimpleLayout>
  );
}
