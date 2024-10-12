import { clsx, type ClassValue } from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Competition } from './types/metrixresult'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export const createTableData = React.cache(
  (competition: Competition, className: string) => {
    const playerIdToName: Record<string, string> = {} // playerId -> name
    const significantRounds = 10
    const playerRows: Record<string, Record<string, number>> = {} // playerId -> { roundId -> points }

    const rounds = competition.subCompetitions
    const roundIds = rounds.map((round) => round.id)

    rounds.forEach((round) => {
      const results = round.results
      const relevantResults = results.filter(
        (result) => result.className === className && result.sum > 0,
      )

      relevantResults.forEach((result) => {
        const position: number = result.place
        const points = getScore(position)

        if (!playerRows[result.userID]) {
          playerRows[result.userID] = {}
        }

        playerRows[result.userID][round.id] = points

        playerIdToName[result.userID] = result.name
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
  },
)
