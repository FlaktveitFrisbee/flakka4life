import { SimpleLayout } from '@/components/SimpleLayout'
import { getCompetition } from '@/server/queries'
import React from 'react'
import WeeklyTable from '../weekly-table'
import { getWeekly, weeklies } from '../helpers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return weeklies.map((weekly) => ({ id: weekly.id }))
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const { competition, error } = await getCompetition(id)

  if (error) {
    notFound()
  }

  const weeklyInfo = getWeekly(id)
  const significantRounds = weeklyInfo?.significantRounds || 100

  return (
    <SimpleLayout title={competition.Name} intro={competition.Comment}>
      <WeeklyTable
        competition={competition}
        significantRounds={significantRounds}
      />
      <div className="flex flex-col gap-4 pt-3 md:flex-row md:justify-between">
        <nav className="flex flex-col gap-2">
          {weeklies.map((weekly) => {
            const isCurrent = weekly.id === id
            return (
              <Link
                href={`/tournaments/weeklies/${weekly.id}`}
                key={weekly.id}
                className={cn(
                  'underline hover:no-underline',
                  isCurrent && 'font-semibold',
                )}
              >
                {weekly.name}
              </Link>
            )
          })}
        </nav>
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
  )
}
