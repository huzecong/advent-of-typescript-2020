import _ from 'lodash'

import Solution from '../solution'
import {int, Iterable} from '../utils'
import Day1 from './day1'

export default class Day9 extends Solution {
  private readonly nums: number[]

  static LOOKBACK = 25

  constructor(inputPath: string) {
    super(inputPath)
    this.nums = this.input.split('\n').map(int)
  }

  protected solvePart1(): number {
    const idx = Iterable.range_(Day9.LOOKBACK, this.nums.length)
      .first({predicate: i => Day1.findPair(this.nums.slice(i - Day9.LOOKBACK, i), this.nums[i]) === null})!
    return this.nums[idx]
  }

  protected solvePart2(): number {
    const target = this.solvePart1()
    const [l, r] = Day1.findPair(this.nums.fold(_.add, 0), x => x - target)!
    const arr = this.nums.slice(l, r)
    return _.min(arr)! + _.max(arr)!
  }
}
