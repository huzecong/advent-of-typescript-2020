import {expect} from 'chai'

import AdventOfCode = require('../src')

function checkDay(day: number, part1: number, part2: number) {
  const tag = `day${day}`
  const inputPath = `inputs/${tag}.txt`
  describe(tag, () => {
    const solver = AdventOfCode.solvers[tag](inputPath)
    it('should return the correct answer for part 1', () =>
      expect(solver.solve(1)).to.equal(part1))
    it('should return the correct answer for part 2', () =>
      expect(solver.solve(2)).to.equal(part2))
  })
}

describe('solutions', () => {
  checkDay(1, 970816, 96047280)
  checkDay(2, 383, 272)
  checkDay(3, 200, 3737923200)
  checkDay(4, 228, 175)
  checkDay(5, 890, 651)
  checkDay(6, 6775, 3356)
  checkDay(7, 224, 1488)
  checkDay(8, 1563, 767)
  checkDay(9, 217430975, 28509180)
  checkDay(10, 2263, 396857386627072)
  checkDay(14, 13727901897109, 5579916171823)
})
