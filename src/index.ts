import {Command, flags} from '@oclif/command'

import Solution from './solution'
import Day1 from './solutions/day1'
import Day2 from './solutions/day2'
import Day3 from './solutions/day3'
import Day4 from './solutions/day4'
import Day14 from './solutions/day14'

class AdventOfCode extends Command {
  static description = 'Solve Advent of Code 2020 problems'

  static flags = {
    // Add --version flag to show CLI version.
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    part1: flags.boolean({description: 'Solve part 1 only', exclusive: ['part2', 'both']}),
    part2: flags.boolean({description: 'Solve part 2 only', exclusive: ['part1', 'both']}),
    both: flags.boolean({description: 'Solve both parts', exclusive: ['part1', 'part2'], default: true}),
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
    day14: (file: string) => new Day14(file),
  }

  async run() {
    const {args, flags} = this.parse(AdventOfCode)

    if (!(args.problem in AdventOfCode.solvers))
      throw new Error(`Invalid problem ${args.problem}`)
    try {
      const inputPath = args.input ?? `inputs/${args.problem}.txt`
      const solver = AdventOfCode.solvers[args.problem](inputPath)
      this.log(`Solving problem ${args.problem}`)
      if (flags.part1 || flags.both)
        this.log(`Part 1 answer: ${solver.solve(1)}`)
      if (flags.part2 || flags.both)
        this.log(`Part 2 answer: ${solver.solve(2)}`)
    } catch (error) {
      this.error(error.stack)
    }
  }
}

export = AdventOfCode
