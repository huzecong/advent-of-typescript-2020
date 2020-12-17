import _ from 'lodash'

import Solution from '../solution'
import {int, removeSuffix} from '../utils'

// Tree with edge weights
class Tree<Node, Edge> {
  private readonly tree: Map<Node, Map<Node, Edge>>

  constructor(tree: Map<Node, Map<Node, Edge>>) {
    this.tree = tree
  }

  public eval<T>(fn: (node: Node, children: {edge: Edge; value: T}[]) => T): Map<Node, T> {
    const result = new Map()
    const tree = this.tree

    function visit(node: Node): T {
      if (result.has(node)) return result.get(node)
      const children =
        [...tree.get(node)!.entries()]
        .map(([child, edge]) => ({edge: edge, value: visit(child)}))
      const value = fn(node, children)
      result.set(node, value)
      return value
    }

    [...tree.keys()].forEach(visit)
    return result
  }
}

export default class Day7 extends Solution {
  private readonly tree: Tree<string, number>

  constructor(inputPath: string) {
    super(inputPath)
    const tree = new Map()
    for (const line of this.input.split('\n')) {
      const [color, desc] = line.split(' bags contain ')
      if (desc === 'no other bags.') {
        tree.set(color, new Map())
      } else {
        const contents =
        removeSuffix(desc, '.').split(', ')
        .map(s => /^(\d+) ([a-z ]+) bags?$/.exec(s)!)
        .map(match => [match[2], int(match[1])] as [string, number])
        tree.set(color, new Map(contents))
      }
    }
    this.tree = new Tree(tree)
  }

  protected solvePart1(): number {
    return _.sum([...this.tree.eval((node, children) =>
      node === 'shiny gold' ? true : children.some(c => c.value)).values()]) - 1
  }

  protected solvePart2(): number {
    return this.tree.eval<number>((_node, children) =>
      1 + _.sum(children.map(c => c.edge * c.value))
    ).get('shiny gold')! - 1
  }
}
