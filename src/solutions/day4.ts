import _ from 'lodash'

import Solution from '../solution'
import * as Utils from '../utils'
import {int} from '../utils'

type Passport = Map<string, string>

function inRange(val: number, l: number, r: number): boolean {
  return _.inRange(val, l, r + 1)
}

export default class Day4 extends Solution {
  private readonly passports: Passport[]

  static fieldValidators: Record<string, (val: string) => boolean> = {
    byr: year => inRange(int(year), 1920, 2002),
    iyr: year => inRange(int(year), 2010, 2020),
    eyr: year => inRange(int(year), 2020, 2030),
    hgt: height => {
      if (height.endsWith('cm')) return inRange(int(Utils.removeSuffix(height, 'cm')), 150, 193)
      if (height.endsWith('in')) return inRange(int(Utils.removeSuffix(height, 'in')), 59, 76)
      return false
    },
    hcl: color => /^#[0-9a-f]{6}$/.test(color),
    ecl: color => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(color),
    pid: id => /^\d{9}$/.test(id),
  }

  constructor(inputPath: string) {
    super(inputPath)
    this.passports =
      this.input.split('\n\n')
      .map(s => new Map(s.split(/\s+/).map(s => s.split(':') as [string, string])))
  }

  private getValidPassports(): Passport[] {
    return this.passports.filter(passport => _.keys(Day4.fieldValidators).every(field => passport.has(field)))
  }

  protected solvePart1(): number {
    return this.getValidPassports().length
  }

  protected solvePart2(): number {
    return this.getValidPassports().filter(
      passport => _.entries(Day4.fieldValidators).every(([key, validator]) => validator(passport.get(key)!)),
    ).length
  }
}
