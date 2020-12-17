import assert from 'assert'

import Solution from '../solution'
import {int} from '../utils'

export default class Day1 extends Solution {
  private readonly numbers: number[]

  constructor(inputPath: string) {
    super(inputPath)
    this.numbers = this.input.split('\n').map(int)
  }

  protected solvePart1(): number {
    for (const [a, b] of this.numbers.combinations(2))
      if (a + b === 2020) return a * b
    assert(false)
  }

  protected solvePart2(): number {
    for (const [a, b, c] of this.numbers.combinations(3))
      if (a + b + c === 2020) return a * b * c
    assert(false)
  }
}
