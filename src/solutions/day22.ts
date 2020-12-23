import _ from 'lodash'

import Solution from '../solution'
import {int} from '../utils'

type Cards = {
  A: number[]
  B: number[]
}
type Winner = keyof Cards
type CheckWinnerFn = (a: number, b: number, cards: Cards) => Winner

export default class Day22 extends Solution {
  private readonly cards: Cards

  constructor(inputPath: string) {
    super(inputPath)
    const parts = this.input.split('\n\n')
    this.cards = {
      A: parts[0].split('\n').slice(1).map(int),
      B: parts[1].split('\n').slice(1).map(int),
    }
  }

  private duel(cards: Cards, checkWinnerFn: CheckWinnerFn): [Winner, number[]] {
    const states: Set<string> = new Set()
    const A = _.clone(cards.A)
    const B = _.clone(cards.B)
    while (A.length > 0 && B.length > 0) {
      const state = A.join(',') + '|' + B.join(',')
      if (states.has(state)) return ['A', A]
      states.add(state)
      const [a, b] = [A.shift()!, B.shift()!]
      const winner = checkWinnerFn(a, b, {A: A, B: B})
      if (winner === 'A') A.push(a, b)
      else B.push(b, a)
    }
    if (A.length > 0) return ['A', A]
    return ['B', B]
  }

  private computeScore(cards: number[]): number {
    return _.sum(cards.reverse().map((x, i) => x * (i + 1)))
  }

  protected solvePart1(): number {
    const [_, cards] = this.duel(this.cards, (a, b) => a > b ? 'A' : 'B')
    return this.computeScore(cards)
  }

  protected solvePart2(): number {
    const checkWinnerFn: CheckWinnerFn = (a, b, cards) => {
      if (!(cards.A.length >= a && cards.B.length >= b)) return a > b ? 'A' : 'B'
      const [winner, _] = this.duel({A: cards.A.slice(0, a), B: cards.B.slice(0, b)}, checkWinnerFn)
      return winner
    }
    const [_, cards] = this.duel(this.cards, checkWinnerFn)
    return this.computeScore(cards)
  }
}
