import {expect} from 'chai'

import AdventOfCode = require('../src')

function checkDay(day: number, part1: number, part2: number, timeout?: number) {
  const tag = `day${day}`
  const inputPath = `inputs/${tag}.txt`
  describe(tag, () => {
    const solver = AdventOfCode.solvers[tag](inputPath)
    const test1 = it('should return the correct answer for part 1', () =>
      expect(solver.solve(1)).to.equal(part1))
    const test2 = it('should return the correct answer for part 2', () =>
      expect(solver.solve(2)).to.equal(part2))
    if (timeout !== undefined) {
      test1.timeout(timeout)
      test2.timeout(timeout)
    }
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
  checkDay(11, 2289, 2059)
  checkDay(12, 845, 27016)
  checkDay(13, 4938, 230903629977901)
  checkDay(14, 13727901897109, 5579916171823)
  checkDay(15, 260, 950, 10000)
  checkDay(16, 26980, 3021381607403)
  checkDay(17, 346, 1632)
  checkDay(18, 50956598240016, 535809575344339)
  checkDay(19, 156, 363)
})
