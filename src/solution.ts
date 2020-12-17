import fs from 'fs'

export default abstract class Solution {
  protected readonly input: string;

  constructor(inputPath: string) {
    const file = fs.readFileSync(inputPath)
    this.input = file.toString().trim()
  }

  protected abstract solvePart1(): number;

  protected abstract solvePart2(): number;

  solve(part: 1 | 2): number {
    if (part === 1) return this.solvePart1()
    return this.solvePart2()
  }

  solveBoth(): [number, number] {
    return [this.solvePart1(), this.solvePart2()]
  }
}
