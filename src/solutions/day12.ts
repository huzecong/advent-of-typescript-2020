import _ from 'lodash'

import Solution from '../solution'
import {int} from '../utils'
import * as utils from '../utils'

type Direction = 'N' | 'S' | 'W' | 'E'
type Action = Direction | 'L' | 'R' | 'F'
type Instr = {action: Action; value: number}

export default class Day12 extends Solution {
  private readonly instrs: Instr[]

  constructor(inputPath: string) {
    super(inputPath)
    this.instrs = this.input.split('\n').map(x => ({action: x[0]as Action, value: int(x.substr(1))}))
  }

  static DELTA: Record<Direction, [number, number]> = {
    E: [1, 0],
    W: [-1, 0],
    N: [0, 1],
    S: [0, -1],
  }

  static ORDER: Direction[] = ['N', 'E', 'S', 'W']

  protected solvePart1(): number {
    let [x, y] = [0, 0]
    let dir: Direction = 'E'
    for (const instr of this.instrs) {
      if (instr.action in Day12.DELTA || instr.action === 'F') {
        const curDir = instr.action === 'F' ? dir : instr.action
        const [dx, dy] = Day12.DELTA[curDir as Direction]
        x += dx * instr.value
        y += dy * instr.value
      } else {
        const idx = Day12.ORDER.indexOf(dir)
        const nextIdx = utils.rectify(idx + (instr.action === 'L' ? -1 : 1) * (instr.value / 90), 4)
        dir = Day12.ORDER[nextIdx]
      }
    }
    return Math.abs(x) + Math.abs(y)
  }

  protected solvePart2(): number {
    let [x, y] = [0, 0]
    let [wx, wy] = [10, 1]
    for (const instr of this.instrs) {
      if (instr.action in Day12.DELTA) {
        const [dx, dy] = Day12.DELTA[instr.action as Direction]
        wx += dx * instr.value
        wy += dy * instr.value
      } else if (instr.action === 'F') {
        x += wx * instr.value
        y += wy * instr.value
      } else {
        for (const _i of _.range(instr.value / 90))
          [wx, wy] = instr.action === 'L' ? [-wy, wx] : [wy, -wx]
      }
    }
    return Math.abs(x) + Math.abs(y)
  }
}
