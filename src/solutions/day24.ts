import _ from 'lodash'
import memoize from 'lodash-decorators/memoize'

import Solution from '../solution'
import {int} from '../utils'
import * as utils from '../utils'

type Direction = 'e' | 'se' | 'sw' | 'w' | 'nw' | 'ne'
type Point = [number, number]

function encode(point: Point): string {
  return point.join(',')
}

function decode(s: string): Point {
  const [x, y] = s.split(',')
  return [int(x), int(y)]
}

export default class Day24 extends Solution {
  private readonly lines: string[]

  constructor(inputPath: string) {
    super(inputPath)
    this.lines = this.input.split('\n')
  }

  static DELTA: Record<Direction, Point> = {
    e: [1, 0],
    se: [1, 1],
    sw: [0, 1],
    w: [-1, 0],
    nw: [-1, -1],
    ne: [0, -1],
  }

  @memoize()
  private getInitialBlackTiles(): Point[] {
    const isBlack = new utils.DefaultDict<string, boolean>(() => false)
    for (const line of this.lines) {
      let [x, y] = [0, 0]
      for (let i = 0; i < line.length; ++i) {
        const dir = ('sn'.includes(line[i]) ? line.substr(i++, 2) : line[i]) as Direction
        const [dx, dy] = Day24.DELTA[dir];
        [x, y] = [x + dx, y + dy]
      }
      isBlack.update(encode([x, y]), val => !val)
    }
    return [...isBlack.entries()].mapFilter(([point, val]) => val ? decode(point) : null)
  }

  protected solvePart1(): number {
    return this.getInitialBlackTiles().length
  }

  protected solvePart2(): number {
    let blackTiles = new Set<string>(this.getInitialBlackTiles().map(encode))
    for (const _it of _.range(100)) {
      const neighborCounts = new utils.DefaultDict<string, number>(() => 0)
      for (const point of blackTiles) {
        const [x, y] = decode(point)
        for (const [dx, dy] of _.values(Day24.DELTA))
          neighborCounts.update(encode([x + dx, y + dy]), x => x + 1)
      }
      const newBlackTiles = new Set<string>()
      for (const [point, cnt] of neighborCounts.entries()) {
        const isBlack = blackTiles.has(point)
        if (isBlack && !(cnt === 0 || cnt > 2)) newBlackTiles.add(point)
        else if (!isBlack && cnt === 2) newBlackTiles.add(point)
      }
      blackTiles = newBlackTiles
    }
    return blackTiles.size
  }
}
