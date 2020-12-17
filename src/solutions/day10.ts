import _ from 'lodash'

import Solution from '../solution'
import {int} from '../utils'

export default class Day10 extends Solution {
  private readonly nums: number[]

  constructor(inputPath: string) {
    super(inputPath)
    this.nums = this.input.split('\n').map(int)
  }

  private getJolts(): number[] {
    const jolts = _.concat([0], _.sortBy(this.nums))
    jolts.push(_.last(jolts)! + 3)
    return jolts
  }

  protected solvePart1(): number {
    const jolts = this.getJolts()
    const counts = _.countBy(jolts.zipShortest(jolts.slice(1)).map(([x, y]) => y - x))
    return counts[1] * counts[3]
  }

  protected solvePart2(): number {
    const jolts = this.getJolts()
    const f = [1]
    for (let i = 1; i < jolts.length; ++i) {
      let cur = 0
      for (let j = i - 1; j >= 0 && jolts[i] - jolts[j] <= 3; --j)
        cur += f[j]
      f.push(cur)
    }
    return _.last(f)!
  }
}
