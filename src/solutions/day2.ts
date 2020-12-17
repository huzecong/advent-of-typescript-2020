import Solution from '../solution'
import * as Utils from '../utils'
import {int} from '../utils'

type Entry = {
  lower: number;
  upper: number;
  letter: string;
  password: string;
}

export default class Day2 extends Solution {
  private readonly entries: Entry[]

  constructor(inputPath: string) {
    super(inputPath)
    this.entries =
      this.input.split('\n')
      .map(x => /(\d+)-(\d+) (\w): (.+)/.exec(x)!)
      .map(match => ({
        lower: int(match[1]),
        upper: int(match[2]),
        letter: match[3],
        password: match[4],
      }))
  }

  protected solvePart1(): number {
    return this.entries.filter(entry => {
      const cnt = Utils.countChar(entry.password, entry.letter)
      return entry.lower <= cnt && cnt <= entry.upper
    }).length
  }

  protected solvePart2(): number {
    return this.entries.filter(entry => {
      return (entry.password[entry.lower - 1] === entry.letter) !==
        (entry.password[entry.upper - 1] === entry.letter)
    }).length
  }
}
