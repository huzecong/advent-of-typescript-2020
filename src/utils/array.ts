import _ from 'lodash'

/**
 * Return the Cartesian product of the lists. Equivalent to Python `itertools.product`.
 * @returns A list of products, each a list of elements that's taken from each of the input lists.
 */
export function cartesianProduct<T>(...xss: T[][]): T[][]
export function cartesianProduct(...xss: any[][]): any[][]
export function cartesianProduct<T>(...xss: T[][]): T[][] {
  if (xss.length === 0) return []
  return xss.reduce((acc: T[][], xs) => acc.flatMap(prod => xs.map(x => [...prod, x])), [[]])
}

/**
 * Equivalent to Python `zip`. When input lists have different lengths, the returned list has the same length as the
 * shortest one.
 */
export function zipShortest<A, B>(xs: A[], ys: B[]): [A, B][]
export function zipShortest<T>(...xss: T[][]): T[][]
export function zipShortest<T>(...xss: T[][]): T[][] {
  if (xss.length === 0) throw new Error('Must provide at least one input list')
  const length = _.min(xss.map(_.size))!
  return _.range(length).map(idx => xss.map(xs => xs[idx]))
}

/**
 * Similar to `zipShortest`, but asserts that all input lists have the same length.
 */
export function zip<A, B>(xs: A[], ys: B[]): [A, B][]
export function zip<T>(...xss: T[][]): T[][]
export function zip<T>(...xss: T[][]): T[][] {
  if (xss.length === 0) throw new Error('Must provide at least one input list')
  const rest = xss.slice(1)
  if (!rest.every(xs => xs.length === xss[0].length)) throw new Error('Arrays to zip are of different lengths')
  return xss[0].map(((value, index) => [value, ...rest.map(xs => xs[index])]))
}

/**
 * Apply map to array and then filter out all null values.
 */
export function mapFilter<T, R>(fn: (value: T, index: number) => R | null, xs: T[]): R[] {
  return xs.map(fn).filter(x => x !== null) as R[]
}

/**
 * Create an array with `length` copies of the same value.
 */
export function array<T>(value: T, length: number): T[] {
  if (length < 0) throw new Error('Length must be non-negative')
  return Array.from({length: length}).fill(value) as T[]
}

/**
 * Return all combinations with `k` elements of the array. Equivalent to Python `itertools.combinations`.
 */
export function combinations<T>(xs: T[], k: 2): [T, T][]
export function combinations<T>(xs: T[], k: 3): [T, T, T][]
export function combinations<T>(xs: T[], k: number): T[][]
export function combinations<T>(xs: T[], k: number): T[][] {
  if (k <= 0) throw new Error('k must be a positive number')
  if (xs.length < k) throw new Error(`Cannot choose ${k} elements from array with length ${xs.length}`)
  const ret: T[][] = []
  const cur = xs.slice(0, k)
  const recurse = function (pick: number, idx: number): void {
    if (pick === k) {
      ret.push(cur.slice())  // make a copy
      return
    }
    for (let i = idx; i < xs.length; ++i) {
      cur[pick] = xs[i]
      recurse(pick + 1, i + 1)
    }
  }
  recurse(0, 0)
  return ret
}

export function product(xs: number[]): number {
  return xs.reduce((acc, x) => acc * x, 1)
}
