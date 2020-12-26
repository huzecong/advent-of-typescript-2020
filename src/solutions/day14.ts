import Solution from '../solution'
import * as utils from '../utils'
import {int, Iterable} from '../utils'

class Mask {
  static MAX_LENGTH = 31

  private readonly mask: string

  private readonly xBase: number[]

  private readonly xValues: number[][]

  constructor(mask: string) {
    const maskChars = mask.split('').reverse()
    this.mask = maskChars.join('')
    this.xBase = maskChars.mapFilter((value, index) => value === 'X' ? 2 ** index : null)
    this.xValues = utils.cartesianProduct(...utils.array([0, 1], this.xBase.length))
  }

  apply(x: number, zero: number | null = 0, one: number | null = 1): number {
    let ret = 0
    let base = 1
    for (let i = 0; i < this.mask.length; ++i) {
      let value = x & 1
      if (this.mask[i] === '0' && zero !== null) value = zero
      if (this.mask[i] === '1' && one !== null) value = one
      ret += value * base
      base *= 2
      x /= 2
    }
    return ret
  }

  applyFloating(x: number): number[] {
    let y = this.apply(x, null)
    for (const base of this.xBase)
      if (y / base & 1) y -= base
    const ret = []
    for (const values of this.xValues) {
      let cur = y
      for (const [base, val] of utils.zip(this.xBase, values))
        if (val === 1) cur += base
      ret.push(cur)
    }
    return ret
  }
}

type Memory = Map<number, number>
type SetMemCallback = (memory: Memory, address: number, value: number, mask: Mask) => void

export default class Day14 extends Solution {
  private readonly lines: string[]

  constructor(inputPath: string) {
    super(inputPath)
    this.lines = this.input.split('\n')
  }

  protected solvePart1(): number {
    return this.processCommands((memory, address, value, mask) => {
      memory.set(address, mask.apply(value))
    })
  }

  protected solvePart2(): number {
    return this.processCommands((memory, address, value, mask) => {
      for (const addr of mask.applyFloating(address))
        memory.set(addr, value)
    })
  }

  private processCommands(setMemoryCallback: SetMemCallback): number {
    let mask: Mask | null = null
    const memRegex = /mem\[(\d+)] = (\d+)/
    const memory: Map<number, number> = new Map()
    for (const line of this.lines) {
      if (line.startsWith('mask = ')) {
        mask = new Mask(utils.removePrefix(line, 'mask = '))
      } else {
        const match = memRegex.exec(line)
        const address = int(match![1])
        const value = int(match![2])
        setMemoryCallback(memory, address, value, mask!)
      }
    }
    return Iterable.from(memory.values()).sum()
  }
}
