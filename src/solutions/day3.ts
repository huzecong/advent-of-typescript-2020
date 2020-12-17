import Solution from '../solution'
import * as Utils from '../utils'

export default class Day3 extends Solution {
  private readonly map: string[]

  private readonly rows: number

  private readonly cols: number

  constructor(inputPath: string) {
    super(inputPath)
    this.map = this.input.split('\n')
    this.rows = this.map.length
    this.cols = this.map[0].length
  }

  private checkSlope(dx: number, dy: number): number {
    let [x, y] = [0, 0]
    let cnt = 0
    dy %= this.cols
    while (x + dx < this.rows) {
      [x, y] = [x + dx, y + dy]
      if (y >= this.cols) y -= this.cols
      if (this.map[x][y] === '#') ++cnt
    }
    return cnt
  }

  protected solvePart1(): number {
    return this.checkSlope(1, 3)
  }

  protected solvePart2(): number {
    const deltas = [
      [1, 1], [1, 3], [1, 5], [1, 7], [2, 1],
    ]
    return Utils.product(deltas.map(([dx, dy]) => this.checkSlope(dx, dy)))
  }
}
