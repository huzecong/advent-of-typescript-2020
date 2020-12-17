import assert from 'assert'
import _ from 'lodash'

import Solution from '../solution'
import {int} from '../utils'

type Op = 'nop' | 'acc' | 'jmp'
type Command = { op: Op; arg: number }
type ExecResult = { acc: number; terminated: boolean }

export default class Day8 extends Solution {
  private readonly cmds: Command[]

  constructor(inputPath: string) {
    super(inputPath)
    this.cmds = this.input.split('\n').map(line => {
      const [op, arg] = line.split(' ')
      return {op: op as Op, arg: int(arg)}
    })
  }

  private evaluate(cmds: Command[]): ExecResult {
    let acc = 0
    let ptr = 0
    const executed = new Set()
    const opExecs: Record<Op, (arg: number) => void> = {
      acc: arg => {
        acc += arg
        ++ptr
      },
      nop: _arg => ++ptr,
      jmp: arg => {
        ptr += arg
      },
    }
    while (ptr < cmds.length && !executed.has(ptr)) {
      executed.add(ptr)
      const cmd = cmds[ptr]
      opExecs[cmd.op](cmd.arg)
    }
    return {acc: acc, terminated: ptr >= cmds.length}
  }

  protected solvePart1(): number {
    return this.evaluate(this.cmds).acc
  }

  protected solvePart2(): number {
    for (let i = 0; i < this.cmds.length; ++i) {
      if (!(this.cmds[i].op === 'nop' || this.cmds[i].op === 'jmp')) continue
      const cmds = _.clone(this.cmds)
      cmds[i] = {op: cmds[i].op === 'nop' ? 'jmp' : 'nop', arg: cmds[i].arg}
      const result = this.evaluate(cmds)
      if (result.terminated) return result.acc
    }
    assert(false)
  }
}
