import _ from 'lodash'

import Solution from '../solution'

export default class Day6 extends Solution {
  private readonly groups: string[][][]

  constructor(inputPath: string) {
    super(inputPath)
    this.groups = this.input.split('\n\n')
      .map(s => s.split('\n').map(s => s.split('')))
  }

  protected solvePart1(): number {
    return _.sum(this.groups.map(group => _.union(...group).length))
  }

  protected solvePart2(): number {
    return _.sum(this.groups.map(group => _.intersection(...group).length))
  }
}
