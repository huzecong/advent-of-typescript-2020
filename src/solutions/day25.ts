import 'ix/add/iterable-operators/findIndex'
import 'ix/add/iterable-operators/reduce'
import 'ix/add/iterable-operators/scan'
import 'ix/add/iterable/from'
import 'ix/add/iterable/range'

import {IterableX as Iterable} from 'ix/iterable'

import Solution from '../solution'
import * as utils from '../utils'
import {int} from '../utils'

export default class Day25 extends Solution {
  private readonly cardKey: number

  private readonly doorKey: number

  constructor(inputPath: string) {
    super(inputPath);
    [this.cardKey, this.doorKey] = this.input.split('\n').map(int)
  }

  static MOD = 20201227

  private findLoop(key: number): number {
    return Iterable.from(utils.count())
      .scan({seed: 1, callback: (acc, x) => acc * 7 % Day25.MOD})
      .findIndex({predicate: x => x === key})
  }

  private doLoop(subject: number, loop: number): number {
    return Iterable.range(0, loop)
      .reduce({seed: 1, callback: acc => acc * subject % Day25.MOD})
  }

  protected solvePart1(): number {
    const cardLoop = this.findLoop(this.cardKey)
    return this.doLoop(this.doorKey, cardLoop)
  }

  protected solvePart2(): number {
    return 0
  }
}
