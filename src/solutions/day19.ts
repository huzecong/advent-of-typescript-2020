import assert from 'assert'
import _ from 'lodash'

import Solution from '../solution'
import {int} from '../utils'
import * as utils from '../utils'

type Rule = {type: 'terminal'; value: string} | {type: 'non-terminal'; value: number[][]}

export default class Day19 extends Solution {
  private readonly rules: Map<number, Rule>

  private readonly strings: string[]

  private readonly valid42: Set<string>

  private readonly valid31: Set<string>

  private readonly partLength: number

  constructor(inputPath: string) {
    super(inputPath)
    const [rules, strings] = this.input.split('\n\n')
    this.rules = new Map(rules.split('\n').map(line => {
      const [id, ruleStr] = line.split(': ')
      const rule: Rule = ruleStr.startsWith('"') ?
        {type: 'terminal', value: ruleStr.substr(1, ruleStr.length - 2)} :
        {type: 'non-terminal', value: ruleStr.split(' | ').map(s => s.split(' ').map(int))}
      return [int(id), rule]
    }))
    this.strings = strings.split('\n')
    this.valid42 = new Set(this.getValidStrings(42))
    this.valid31 = new Set(this.getValidStrings(31))
    this.partLength = this.valid42.values().next().value.length
    assert(_.every(this.valid42.values(), s => s!.length === this.partLength))
    assert(_.every(this.valid31.values(), s => s!.length === this.partLength))
  }

  private getValidStrings(ruleId: number): string[] {
    const rule = this.rules.get(ruleId)!
    if (rule.type === 'terminal') return [rule.value]
    const strings = []
    for (const subRule of rule.value) {
      const curStrings = utils.cartesianProduct(...subRule.map(rule => this.getValidStrings(rule)))
        .map(strs => strs.join(''))
      strings.push(...curStrings)
    }
    return _.uniq(strings)
  }

  private chunkString(str: string): string[] {
    return _.range(0, str.length, this.partLength).map(idx => str.substr(idx, this.partLength))
  }

  protected solvePart1(): number {
    // The new rule matches any string of the form:
    //   [42] + [42] + [31]
    return _.sum(this.strings.map(str => {
      if (str.length !== this.partLength * 3) return false
      const parts = this.chunkString(str)
      return this.valid42.has(parts[0]) && this.valid42.has(parts[1]) && this.valid31.has(parts[2])
    }))
  }

  protected solvePart2(): number {
    // The new rule matches any string of the form:
    //   [42]*i + [42]*k + [31]*k
    // where i & k are positive integers.
    return _.sum(this.strings.map(str => {
      if (str.length % this.partLength !== 0) return false
      const parts = this.chunkString(str)
      return _.range(1, (parts.length - 1)).some(i => {
        if ((parts.length - i) % 2 !== 0) return false
        const k = (parts.length - i) / 2
        return parts.slice(0, i + k).every(s => this.valid42.has(s)) &&
          parts.slice(i + k).every(s => this.valid31.has(s))
      })
    }))
  }
}
