import fs from 'fs'
import {performance} from 'perf_hooks'

export default abstract class Solution {
  protected readonly input: string;

  constructor(inputPath: string) {
    const file = fs.readFileSync(inputPath)
    this.input = file.toString().trim()
  }

  protected abstract solvePart1(): number;

  protected abstract solvePart2(): number;

  solve(part: 1 | 2, profile = false): number {
    const start = performance.now()
    const result = part === 1 ? this.solvePart1() : this.solvePart2()
    if (profile) {
      const time = (performance.now() - start) / 1000
      // eslint-disable-next-line no-console
      console.log(`Part ${part} took ${time.toFixed(3)}s`)
    }
    return result
  }

  solveBoth(profile = false): [number, number] {
    return [this.solve(1, profile), this.solve(2, profile)]
  }
}
