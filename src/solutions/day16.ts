import assert from 'assert'
import _ from 'lodash'

import Solution from '../solution'
import {int} from '../utils'
import * as utils from '../utils'

type Ticket = number[]

export default class Day16 extends Solution {
  private readonly rules: Record<string, Set<number>>

  private readonly validNumbers: Set<number>

  private readonly myTicket: Ticket

  private readonly tickets: Ticket[]

  constructor(inputPath: string) {
    super(inputPath)
    const [rules, myTicket, tickets] = this.input.split('\n\n')
    this.rules = _.fromPairs(
      rules.split('\n')
        .map(s => /(.+?): (\d+)-(\d+) or (\d+)-(\d+)/.exec(s)!)
        .map(g => {
          const [l1, r1, l2, r2] = g.slice(2).map(int)
          return [g[1], new Set(_.concat(_.range(l1, r1 + 1), _.range(l2, r2 + 1)))]
        }))
    this.validNumbers = new Set(_.flatten(_.values(this.rules).map(set => [...set])))
    this.myTicket = myTicket.split('\n')[1].split(',').map(int)
    this.tickets = tickets.split('\n').slice(1).map(s => s.split(',').map(int))
  }

  protected solvePart1(): number {
    return _.sum(this.tickets.map(ticket => _.sum(ticket.map(x => this.validNumbers.has(x) ? 0 : x))))
  }

  protected solvePart2(): number {
    const n = _.size(this.rules)
    const canMatch = _.mapValues(this.rules, _x => utils.array(true, n))
    const tickets = this.tickets.filter(ticket => ticket.every(x => this.validNumbers.has(x)))
    for (const ticket of tickets)
      for (const [key, set] of _.entries(this.rules))
        for (const [i, x] of ticket.entries())
          if (!set.has(x)) canMatch[key][i] = false
    const graph: utils.graph.BipartiteGraph = utils.graph.createGraph(false)
    for (const key of _.keys(this.rules))
      graph.addNode(key, 'left')
    for (const idx of _.range(n))
      graph.addNode(idx, 'right')
    for (const [key, matchRow] of _.entries(canMatch))
      for (const [idx, isMatch] of matchRow.entries())
        if (isMatch) graph.addLink(key, idx).addLink(idx, key)
    const match = utils.graph.maximalMatching(graph)
    assert(match.size === n * 2)
    return utils.product(this.myTicket.mapFilter((x, idx) => {
      const field: string = match.get(idx)! as string
      if (field.startsWith('departure')) return x
      return null
    }))
  }
}
