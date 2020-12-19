import _ from 'lodash'

import Solution from '../solution'
import {int} from '../utils'
import * as utils from '../utils'

export default class Day13 extends Solution {
  private readonly timestamp: number

  private readonly buses: [number, number][]

  constructor(inputPath: string) {
    super(inputPath)
    const lines = this.input.split('\n')
    this.timestamp = int(lines[0])
    this.buses = lines[1].split(',').mapFilter((x, i) => x === 'x' ? null : [i, int(x)])
  }

  protected solvePart1(): number {
    const [departTime, id] =  _.min(this.buses.map(([_i, x]) => [Math.ceil(this.timestamp / x) * x, x]))!
    return (departTime - this.timestamp) * id
  }

  protected solvePart2(): number {
    const eqs = this.buses.map<[number, number]>(([t, x]) => [x, utils.rectify(-t, x)])
    return utils.chineseRemainderTheorem(eqs)
  }
}
