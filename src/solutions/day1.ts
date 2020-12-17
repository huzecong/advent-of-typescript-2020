import assert from 'assert'

import Solution from '../solution'
import {int} from '../utils'

export default class Day1 extends Solution {
  private readonly numbers: number[]

  constructor(inputPath: string) {
    super(inputPath)
    this.numbers = this.input.split('\n').map(int)
  }

  /**
   * Find two numbers in `numbers` that sum up to `target`, return their indices.
   */
  static findPair(numbers: number[], target: number): [number, number] | null

  /**
   * Find two numbers `x` and `y` in `numbers` such that `fn(y) === x`, return their indices.
   */
  static findPair(numbers: number[], fn: (value: number, index: number) => number): [number, number] | null

  static findPair(numbers: number[], targetOrFn: any): [number, number] | null {
    const fn: (value: number, index: number) => number =
      typeof targetOrFn === 'function' ? targetOrFn : ((x: number) => targetOrFn - x)
    const map = new Map()
    for (const [idx, x] of numbers.entries()) {
      const lookupVal = fn(x, idx)
      if (map.has(lookupVal)) return [map.get(lookupVal), idx]
      map.set(x, idx)
    }
    return null
  }

  protected solvePart1(): number {
    const [x, y] = Day1.findPair(this.numbers, 2020)!
    return this.numbers[x] * this.numbers[y]
  }

  protected solvePart2(): number {
    for (const [idx, a] of this.numbers.entries()) {
      const [x, y] = Day1.findPair(this.numbers.slice(0, idx), 2020 - a) ?? [null, null]
      if (x !== null && y !== null) return a * this.numbers[x] * this.numbers[y]
    }
    assert(false)
  }
}
