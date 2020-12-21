import fs from 'fs'
import {performance} from 'perf_hooks'

export default abstract class Solution {
  protected readonly input: string;

  constructor(inputPath: string) {
    const file = fs.readFileSync(inputPath)
    this.input = file.toString().trim()
  }

  protected abstract solvePart1(): number | string;

  protected abstract solvePart2(): number | string;

  solve(part: 1 | 2, profile = false): string {
    const start = performance.now()
    const result = part === 1 ? this.solvePart1() : this.solvePart2()
    if (profile) {
      const time = (performance.now() - start) / 1000
      // eslint-disable-next-line no-console
      console.log(`Part ${part} took ${time.toFixed(3)}s`)
    }
    return result.toString()
  }

  solveBoth(profile = false): [string, string] {
    return [this.solve(1, profile), this.solve(2, profile)]
  }
}
