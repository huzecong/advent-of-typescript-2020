import _ from 'lodash'

import Solution from '../solution'
import {int} from '../utils'

class LinkedNode<T> {
  public value: T

  private _prev: LinkedNode<T> | null

  private _next: LinkedNode<T> | null

  constructor(value: T) {
    this.value = value
    this._prev = null
    this._next = null
  }

  get next() {
    return this._next
  }

  get prev() {
    return this._prev
  }

  link(node: LinkedNode<T>): this {
    this._next = node
    node._prev = this
    return this
  }

  traverse(maxCount?: number): LinkedNode<T>[] {
    const nodes = []
    let curNode = this._next
    while (curNode !== null && (maxCount === undefined || maxCount > 0)) {
      nodes.push(curNode)
      curNode = curNode._next
      if (maxCount !== undefined) --maxCount
    }
    return nodes
  }
}

export default class Day23 extends Solution {
  private readonly cups: number[]

  constructor(inputPath: string) {
    super(inputPath)
    this.cups = this.input.split('').map(int)
  }

  private simulate(cups: number[], iterations: number): number[] {
    const nodes = _.range(cups.length + 1).map(i => new LinkedNode(i))
    for (const [a, b] of cups.zipShortest(cups.slice(1)))
      nodes[a].link(nodes[b])
    nodes[_.last(cups)!].link(nodes[cups[0]])
    let curNode = nodes[cups[0]]
    while (iterations-- > 0) {
      const pickUpNodes = curNode.traverse(3)
      const pickUpValues = pickUpNodes.map(node => node.value)

      let nextVal = curNode.value - 1
      if (nextVal < 1) nextVal = cups.length
      while (pickUpValues.includes(nextVal)) {
        --nextVal
        if (nextVal < 1) nextVal = cups.length
      }
      const nextNode = nodes[nextVal]

      const pickUpLeft = pickUpNodes[0]
      const pickUpRight = _.last(pickUpNodes)!
      curNode.link(pickUpRight.next!)
      pickUpRight.link(nextNode.next!)
      nextNode.link(pickUpLeft)
      curNode = curNode.next!
    }
    return nodes[1].traverse(cups.length - 1).map(node => node.value)
  }

  protected solvePart1(): string {
    return this.simulate(this.cups, 100).map(x => x.toString()).join('')
  }

  protected solvePart2(): number {
    const cups = _.concat(this.cups, _.range(this.cups.length + 1, 10 ** 6 + 1))
    const result = this.simulate(cups, 10 ** 7)
    return result[0] * result[1]
  }
}
