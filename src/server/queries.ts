import { Convert } from '@/lib/types/metrixresult'

export async function getCompetition(competitionId: string) {
  const params = new URLSearchParams({
    content: 'result',
    id: competitionId,
  })

  const response = await fetch(
    `${process.env.DISC_GOLF_METRIX_API_URL}?${params}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch competition')
  }

  const data = await response.text()

  return Convert.toDiscgolfMetrixResult(data).competition
}
