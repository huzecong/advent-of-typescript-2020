import _ from 'lodash'

import Solution from '../solution'
import {int} from '../utils'
import * as utils from '../utils'

// JS array comparison is just pointer address comparison, and using arrays as Map keys simply doesn't work.
// So we explicitly serialize and deserialize them as strings.
type Point = string

function toPoint(xs: number[]): Point {
  return xs.join(',')
}

function fromPoint(p: Point): number[] {
  return p.split(',').map(int)
}

export default class Day17 extends Solution {
  private readonly cubes: [number, number][]

  constructor(inputPath: string) {
    super(inputPath)
    const board = this.input.split('\n')
    this.cubes = []
    for (const [i, row] of board.entries())
      for (let j = 0; j < row.length; ++j)
        if (row[j] === '#') this.cubes.push([i, j])
  }

  private solveND(dimensions: number): number {
    const directions =
      utils.cartesianProduct(...utils.array([-1, 0, 1], dimensions))
        .filter(ds => ds.some(d => d !== 0))
    let points: Set<Point> = new Set(
      this.cubes.map(([x, y]) => toPoint([...utils.array(0, dimensions - 2), x, y])))
    for (const _it of _.range(6)) {
      const candidates = new utils.DefaultDict<Point, number>(() => 0)
      for (const point of points) {
        const xs = fromPoint(point)
        const neighbors = directions.map(ds => ds.zip(xs).map(([d, x]) => d + x))
        neighbors.forEach(cube => {
          const point = toPoint(cube)
          candidates.set(point, candidates.get(point) + 1)
        })
      }
      const nextPoints: Set<Point> = new Set()
      for (const [point, cnt] of candidates.entries()) {
        if (cnt !== 2 && cnt !== 3) continue
        const isActive = points.has(point)
        if (isActive || (!isActive && cnt === 3)) nextPoints.add(point)
      }
      points = nextPoints
    }
    return points.size
  }

  protected solvePart1(): number {
    return this.solveND(3)
  }

  protected solvePart2(): number {
    return this.solveND(4)
  }
}
