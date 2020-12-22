import assert from 'assert'
import _ from 'lodash'
import memoize from 'lodash-decorators/memoize'
import * as nj from 'numjs'

import Solution from '../solution'
import {int} from '../utils'

type Tile = nj.NdArray<number>

type TileConfig = {
  id: number
  rotation: number
  flip: boolean
}

function hashConfig(config: TileConfig): string {
  return [config.id.toString(), config.rotation.toString(), config.flip.toString()].join(',')
}

type Edge = 'L' | 'R' | 'U' | 'D'

export default class Day20 extends Solution {
  private readonly tiles: Map<number, Tile>

  constructor(inputPath: string) {
    super(inputPath)
    this.tiles = new Map(this.input.split('\n\n').map(block => {
      const lines = block.split('\n')
      const id = int(/Tile (\d+):/.exec(lines[0])![1])
      const tile = Day20.linesToTile(lines.slice(1))
      return [id, tile]
    }))
  }

  private static linesToTile(lines: string[]): Tile {
    return nj.array<number>(lines.map(line => line.split('').map(c => Number(c === '#'))), 'uint8')
  }

  private transformTile(tile: Tile, rotation: number, flip: boolean): Tile {
    tile = nj.rot90(tile, rotation)
    if (flip) tile = nj.flip(tile, 0)
    return tile
  }

  @memoize(hashConfig)
  private getTile(config: TileConfig): Tile {
    return this.transformTile(this.tiles.get(config.id)!, config.rotation, config.flip)
  }

  @memoize((config: TileConfig, edge: Edge) => hashConfig(config) + ',' + edge)
  private getEdge(config: TileConfig, edge: Edge): number {
    const tile = this.getTile(config)
    let line: nj.NdArray<number>
    if (edge === 'L') line = tile.slice(null, [0, 1])
    else if (edge === 'R') line = tile.slice(null, -1)
    else if (edge === 'U') line = tile.slice([0, 1])
    else line = tile.slice(-1)
    assert(line.size === tile.shape[0])
    const repr = line.tolist().flat().reduce((acc, x) => acc * 2 + x)
    return repr
  }

  @memoize()
  private getBoardConfig(): nj.NdArray<TileConfig> {
    const sideLength = Math.floor(Math.sqrt(this.tiles.size))
    const chosen = new Set()
    const board = nj.empty<TileConfig>([sideLength, sideLength])
    const dfs = (x: number, y: number): boolean => {
      if (x === sideLength) return true
      if (y === sideLength) return dfs(x + 1, 0)
      for (const id of this.tiles.keys()) {
        if (chosen.has(id)) continue
        for (const rotation of _.range(4))
          for (const flip of [false, true]) {
            const config = {id: id, rotation: rotation, flip: flip}
            let ok = true
            if (x > 0) ok = ok && this.getEdge(config, 'U') === this.getEdge(board.get(x - 1, y), 'D')
            if (y > 0) ok = ok && this.getEdge(config, 'L') === this.getEdge(board.get(x, y - 1), 'R')
            if (!ok) continue
            board.set(x, y, config)
            chosen.add(id)
            if (dfs(x, y + 1)) return true
            chosen.delete(id)
          }
      }
      return false
    }
    assert(dfs(0, 0))
    return board
  }

  protected solvePart1(): number {
    const board = this.getBoardConfig()
    return board.get(0, 0).id * board.get(0, -1).id * board.get(-1, 0).id * board.get(-1, -1).id
  }

  static PATTERN = Day20.linesToTile([
    '..................#.',
    '#....##....##....###',
    '.#..#..#..#..#..#...',
  ])

  protected solvePart2(): number {
    const board: TileConfig[][] = this.getBoardConfig().tolist()
    let rawPicture = nj.stack(board.map(row =>
      nj.concatenate(...row.map(config => this.getTile(config).slice([1, -1], [1, -1])))), 0)
    rawPicture = rawPicture.reshape(rawPicture.shape[2], rawPicture.shape[2])

    const pattern = Day20.PATTERN
    const negatePattern = nj.ones(pattern.shape).subtract(pattern)
    for (const rotation of _.range(4))
      for (const flip of [false, true]) {
        const picture = this.transformTile(rawPicture, rotation, flip)
        const marks = picture.clone()
        let cnt = 0
        for (const x of _.range(picture.shape[0] - pattern.shape[0]))
          for (const y of _.range(picture.shape[1] - pattern.shape[1])) {
            const slices: [number, number][] = [[x, x + pattern.shape[0]], [y, y + pattern.shape[1]]]
            if (picture.slice(...slices).multiply(pattern).equal(pattern)) {
              ++cnt
              marks.slice(...slices).multiply(negatePattern, false)
            }
          }
        if (cnt > 0) return marks.sum()
      }
    assert(false)
  }
}
