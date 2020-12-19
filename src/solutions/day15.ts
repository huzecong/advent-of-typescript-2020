import _ from 'lodash'

import Solution from '../solution'
import {int} from '../utils'

export default class Day15 extends Solution {
  private readonly numbers: number[]

  constructor(inputPath: string) {
    super(inputPath)
    this.numbers = this.input.split(',').map(int)
  }

  private findNumber(index: number): number {
    const map = new Map(_.initial(this.numbers).map((x, i) => [x, i + 1]))
    let last = _.last(this.numbers)!
    for (const idx of _.range(this.numbers.length, index)) {
      const next = idx - (map.get(last) ?? idx)
      map.set(last, idx)
      last = next
    }
    return last
  }

  protected solvePart1(): number {
    return this.findNumber(2020)
  }

  protected solvePart2(): number {
    return this.findNumber(30000000)
  }
}
