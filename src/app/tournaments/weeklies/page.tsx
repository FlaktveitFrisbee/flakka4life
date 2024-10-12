import { SimpleLayout } from '@/components/SimpleLayout'
import { createTableData, PlayerEntry } from '@/lib/utils'
import { getCompetition } from '@/server/queries'
import React from 'react'
import WeeklyTable from './weekly-table'
import { ColumnDef } from '@tanstack/react-table'

export default async function WeekliesPage() {
  const competition = await getCompetition('2874902')
  const rounds = competition.subCompetitions.map((round) => round.id)
  const tableData = createTableData(competition, 'Rekreasjon')

  return (
    <SimpleLayout title={competition.name} intro={competition.comment}>
      <WeeklyTable data={tableData} rounds={rounds} />
    </SimpleLayout>
  )
}
