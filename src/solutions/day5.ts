import _ from 'lodash'

import Solution from '../solution'

export default class Day5 extends Solution {
  private readonly passes: string[]

  private readonly seatNumbers: number[]

  constructor(inputPath: string) {
    super(inputPath)
    this.passes = this.input.split('\n')
    this.seatNumbers = this.passes.map(pass => this.getSeatNumber(pass))
  }

  private getPosition(description: string, min: number, max: number, chars: string): number {
    let [l, r] = [min, max]
    for (const c of description) {
      const mid = Math.floor((l + r) / 2)
      if (c === chars[0]) r = mid
      else if (c === chars[1]) l = mid + 1
      else throw new Error(`Bad character '${c}'`)
    }
    return l
  }

  private getSeat(pass: string): [number, number] {
    const row = this.getPosition(pass.substr(0, 7), 0, 127, 'FB')
    const col = this.getPosition(pass.substr(7), 0, 7, 'LR')
    return [row, col]
  }

  private getSeatNumber(pass: string): number {
    const [row, col] = this.getSeat(pass)
    return row * 8 + col
  }

  protected solvePart1(): number {
    return _.max(this.seatNumbers)!
  }

  protected solvePart2(): number {
    const seats = new Set(this.seatNumbers)
    for (let x = _.min(this.seatNumbers)! + 1; ; ++x) {
      if (!seats.has(x) && seats.has(x - 1) && seats.has(x + 1))
        return x
    }
  }
}
