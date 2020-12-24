import {Command, flags} from '@oclif/command'

import Solution from './solution'
import Day1 from './solutions/day1'
import Day2 from './solutions/day2'
import Day3 from './solutions/day3'
import Day4 from './solutions/day4'
import Day5 from './solutions/day5'
import Day6 from './solutions/day6'
import Day7 from './solutions/day7'
import Day8 from './solutions/day8'
import Day9 from './solutions/day9'
import Day10 from './solutions/day10'
import Day11 from './solutions/day11'
import Day12 from './solutions/day12'
import Day13 from './solutions/day13'
import Day14 from './solutions/day14'
import Day15 from './solutions/day15'
import Day16 from './solutions/day16'
import Day17 from './solutions/day17'
import Day18 from './solutions/day18'
import Day19 from './solutions/day19'
import Day20 from './solutions/day20'
import Day21 from './solutions/day21'
import Day22 from './solutions/day22'
import Day23 from './solutions/day23'
import Day24 from './solutions/day24'

class AdventOfCode extends Command {
  static description = 'Solve Advent of Code 2020 problems'

  static flags = {
    // Add --version flag to show CLI version.
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    part1: flags.boolean({description: 'Solve part 1 only', exclusive: ['part2', 'both']}),
    part2: flags.boolean({description: 'Solve part 2 only', exclusive: ['part1', 'both']}),
    both: flags.boolean({description: 'Solve both parts', exclusive: ['part1', 'part2'], default: true}),
    profile: flags.boolean({description: 'Profile run time'}),
  }

  static args = [
    {name: 'problem', required: true, description: 'Problem to solve (e.g. day14)'},
    {name: 'input', default: null, description: 'Path to input file'},
  ]

  static solvers: Record<string, (file: string) => Solution> = {
    day1: (file: string) => new Day1(file),
    day2: (file: string) => new Day2(file),
    day3: (file: string) => new Day3(file),
    day4: (file: string) => new Day4(file),
    day5: (file: string) => new Day5(file),
    day6: (file: string) => new Day6(file),
    day7: (file: string) => new Day7(file),
    day8: (file: string) => new Day8(file),
    day9: (file: string) => new Day9(file),
    day10: (file: string) => new Day10(file),
    day11: (file: string) => new Day11(file),
    day12: (file: string) => new Day12(file),
    day13: (file: string) => new Day13(file),
    day14: (file: string) => new Day14(file),
    day15: (file: string) => new Day15(file),
    day16: (file: string) => new Day16(file),
    day17: (file: string) => new Day17(file),
    day18: (file: string) => new Day18(file),
    day19: (file: string) => new Day19(file),
    day20: (file: string) => new Day20(file),
    day21: (file: string) => new Day21(file),
    day22: (file: string) => new Day22(file),
    day23: (file: string) => new Day23(file),
    day24: (file: string) => new Day24(file),
  }

  async run() {
    const {args, flags} = this.parse(AdventOfCode)

    if (!(args.problem in AdventOfCode.solvers))
      throw new Error(`Invalid problem ${args.problem}`)
    try {
      const inputPath = args.input ?? `inputs/${args.problem}.txt`
      const solver = AdventOfCode.solvers[args.problem](inputPath)
      this.log(`Solving problem ${args.problem}`)
      if (flags.part1 || flags.both) {
        const answer = solver.solve(1, flags.profile)
        this.log(`Part 1 answer: ${answer}`)
      }
      if (flags.part2 || flags.both) {
        const answer = solver.solve(2, flags.profile)
        this.log(`Part 2 answer: ${answer}`)
      }
    } catch (error) {
      this.error(error.stack)
    }
  }
}

export = AdventOfCode
