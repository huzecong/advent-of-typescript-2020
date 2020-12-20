import _ from 'lodash'

import Solution from '../solution'
import {int, smartArray} from '../utils'
import * as utils from '../utils'

type BinaryOperatorSpec = {
  operator: string;
  priority: number;  // ops with higher priority are executed first
  compute: (a: number, b: number) => number;
}

// A very crude parser that only supports binary operators (so yeah, no negative numbers).
class Evaluator {
  private readonly operatorSpecs: Map<string, BinaryOperatorSpec>

  constructor(operatorSpecs: BinaryOperatorSpec[]) {
    this.operatorSpecs = new Map()
    for (const spec of operatorSpecs) {
      if (spec.operator.length !== 1) throw new Error('Only single-character operators are supported')
      this.operatorSpecs.set(spec.operator, spec)
    }
  }

  private tokenize(expr: string): (number | string)[] {
    const tokens = []
    for (let i = 0; i < expr.length; ++i) {
      const ch = expr[i]
      if (ch === '(' || ch === ')' || this.operatorSpecs.has(ch)) {
        tokens.push(ch)
      } else if (utils.isNumeric(ch)) {
        let j = i + 1
        while (j < expr.length && utils.isNumeric(expr[j])) ++j
        tokens.push(int(expr.substr(i, j - i)))
        i = j - 1
      } else if (!utils.isWhitespace(ch)) {
        throw new Error(`Unexpected character '${ch}' at position ${i}`)
      }
    }
    return tokens
  }

  error(expr: string): never {
    throw new Error('Invalid expression ' + expr)
  }

  evaluate(expr: string): number {
    const tokens = this.tokenize(expr)
    const stack = smartArray<number | string>()

    const reduce = () => {
      if (stack.length < 3) this.error(expr)
      const [a, op, b] = stack.slice(-3)
      if (!(typeof a === 'number' && typeof b === 'number')) this.error(expr)
      if (!(typeof op === 'string' && this.operatorSpecs.has(op))) this.error(expr)
      const result = this.operatorSpecs.get(op)!.compute(a, b)
      stack.splice(-3)
      stack.push(result)
    }

    for (const token of tokens) {
      if (typeof token === 'number' || token === '(') {
        stack.push(token)
      } else if (token === ')') {
        while (stack.length >= 2 && stack[-2] !== '(')
          reduce()
        if (stack.length < 2) this.error(expr)
        stack.splice(-2, 1)
      } else {  // operator
        const spec = this.operatorSpecs.get(token)!
        while (stack.length >= 3) {
          const op = stack[-2]
          if (typeof op !== 'string') break
          const priority = this.operatorSpecs.get(op)?.priority
          if (!(priority !== undefined && priority >= spec.priority)) break
          reduce()
        }
        stack.push(token)
      }
    }
    while (stack.length > 1)
      reduce()
    if (stack.length === 0 || typeof stack[0] !== 'number') this.error(expr)
    return stack[0]
  }
}

export default class Day18 extends Solution {
  private readonly exprs: string[]

  constructor(inputPath: string) {
    super(inputPath)
    this.exprs = this.input.split('\n')
  }

  private solveWithPriorities(add: number, multiply: number) {
    const evaluator = new Evaluator([
      {operator: '+', priority: add, compute: _.add},
      {operator: '*', priority: multiply, compute: _.multiply},
    ])
    return _.sum(this.exprs.map(expr => evaluator.evaluate(expr)))
  }

  protected solvePart1(): number {
    return this.solveWithPriorities(1, 1)
  }

  protected solvePart2(): number {
    return this.solveWithPriorities(2, 1)
  }
}
