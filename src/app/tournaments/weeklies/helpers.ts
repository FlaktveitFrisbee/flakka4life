import { Competition } from '@/lib/types/metrixresult'

export const weeklies = [
  {
    id: '2874902',
    name: 'Flakkacup 2024',
    significantRounds: 10,
    metrixLink: 'https://discgolfmetrix.com/2874902',
  },
  {
    id: '2455515',
    name: 'Flakkacup 2023',
    significantRounds: 100,
    metrixLink: 'https://discgolfmetrix.com/2455515',
  },
  {
    id: '2056256',
    name: 'Flakkacup 2022',
    significantRounds: 100,
    metrixLink: 'https://discgolfmetrix.com/2056256',
  },
]

export const getWeekly = (id: string) => {
  return weeklies.find((weekly) => weekly.id === id)
}

export const getScore = (position: number) => {
  if (position < 1 || position > 10) {
    return 0
  }

  return scoringMap[position]
}

const scoringMap: { [key: number]: number } = {
  1: 15,
  2: 12,
  3: 10,
  4: 8,
  5: 6,
  6: 5,
  7: 4,
  8: 3,
  9: 2,
  10: 1,
}

export type DisplayItem = {
  points: number
  significant: boolean
}

export type PlayerEntry = {
  playerId: string
  name: string
  round_scores: Array<{ roundId: string; points: number }>
  displayItems: Record<string, DisplayItem>
  total?: number
  rank?: number
}

export const createTableData = (
  competition: Competition,
  className: string,
  significantRounds: number = 10,
) => {
  const playerIdToName: Record<string, string> = {} // playerId -> name
  const playerRows: Record<string, Record<string, number>> = {} // playerId -> { roundId -> points }

  const rounds = competition.SubCompetitions
  const roundIds = rounds.map((round) => round.ID)

  rounds.forEach((round) => {
    const results = round.Results
    const relevantResults = results.filter(
      (result) => result.ClassName === className && result.Sum > 0,
    )

    relevantResults.forEach((result) => {
      const position: number = result.Place
      const points = getScore(position)

      if (!playerRows[result.UserID]) {
        playerRows[result.UserID] = {}
      }

      playerRows[result.UserID][round.ID] = points

      playerIdToName[result.UserID] = result.Name
    })
  })

  const result: PlayerEntry[] = []

  Object.entries(playerRows).forEach(([playerId, rounds]) => {
    const entry: PlayerEntry = {
      playerId: playerId,
      name: playerIdToName[playerId],
      round_scores: [],
      displayItems: {},
    }
    roundIds.forEach((roundId: string) => {
      const points = rounds[roundId] || 0
      entry.displayItems[roundId] = { points: points, significant: false }
      entry.round_scores.push({ roundId: roundId, points: points })
    })

    // sort rounds by points
    entry.round_scores.sort((a: any, b: any) => b.points - a.points)

    let total = 0
    // mark the significant rounds as "significant", and add the total
    for (
      let i = 0;
      i < Math.min(significantRounds, entry.round_scores.length);
      i++
    ) {
      const round = entry.round_scores[i]
      entry.displayItems[round.roundId].significant = true
      total += round.points
    }

    entry.total = total

    result.push(entry)
  })

  // Sort by total
  result.sort((a: any, b: any) => b.total - a.total)

  // calculate the player's rank
  let currentRank = 1
  let previousScore = null

  for (let i = 0; i < result.length; i++) {
    const player = result[i]
    const score = player.total
    if (score !== previousScore) {
      currentRank = i + 1
      player.rank = currentRank
    } else {
      player.rank = currentRank
    }
    previousScore = score
  }

  return result
}
