import _ from 'lodash'

import Solution from '../solution'
import * as utils from '../utils'

type Point = '#' | 'L' | '.'
type Board = Point[][]
type GetNeighborFn = (board: Board, x: number, y: number) => number

export default class Day11 extends Solution {
  private readonly board: Board

  constructor(inputPath: string) {
    super(inputPath)
    this.board = this.input.split('\n').map(x => x.split('') as Point[])
  }

  private iterate(board: Board, emptyThreshold: number, fn: GetNeighborFn): number {
    let changed
    do {
      const newBoard: Board = _.cloneDeep(board)
      changed = false
      for (const x of _.range(board.length))
        for (const y of _.range(board[0].length)) {
          if (board[x][y] === '.') continue
          const cnt = fn(board, x, y)
          if (board[x][y] === '#' && cnt >= emptyThreshold) newBoard[x][y] = 'L'
          else if (board[x][y] === 'L' && cnt === 0) newBoard[x][y] = '#'
          if (newBoard[x][y] !== board[x][y]) changed = true
        }
      board = newBoard
    } while (changed)
    return _.sumBy(board, row => row.count('#'))
  }

  static DIRECTIONS = utils.cartesianProduct([-1, 0, 1], [-1, 0, 1]).filter(x => !_.isEqual(x, [0, 0]))

  private isValid(x: number, y: number): boolean {
    return x >= 0 && x < this.board.length && y >= 0 && y < this.board[0].length
  }

  protected solvePart1(): number {
    return this.iterate(this.board, 4, (board, x, y) => {
      let cnt = 0
      for (const [dx, dy] of Day11.DIRECTIONS) {
        const [nx, ny] = [x + dx, y + dy]
        if (this.isValid(nx, ny) && board[nx][ny] === '#') ++cnt
      }
      return cnt
    })
  }

  protected solvePart2(): number {
    return this.iterate(this.board, 5, (board, x, y) => {
      let cnt = 0
      for (const [dx, dy] of Day11.DIRECTIONS) {
        let [nx, ny] = [x, y]
        do {
          nx += dx
          ny += dy
        } while (this.isValid(nx, ny) && board[nx][ny] === '.')
        if (this.isValid(nx, ny) && board[nx][ny] === '#') ++cnt
      }
      return cnt
    })
  }
}
