import {product} from './array'

export function int(num: string | bigint): number {
  // @ts-ignore
  return parseInt(num, 10)
}

/**
 * Return the number in range `[0, mod)` that's congruent to `x` modulo `mod`.
 */
export function rectify(x: number, mod: number): number {
  x %= mod
  if (x < 0) x += mod
  return x
}

/**
 * Solve the congruent equation `ax + by == gcd(a, b)` using the extended Euclidean algorithm.
 */
export function exgcd(a: number, b: number): [number, number] {
  if (b === 0) return [1, 0]
  const [x, y] = exgcd(b, a % b)
  return [y, x - Math.floor(a / b) * y]
}

/**
 * Solve the congruent equation set: `X ≡ a_i (mod m_i)` using CRT.
 * Note that the modulos `m_i` must be pairwise co-prime.
 * @param equations  A list of [mod (m_i), remainder (a_i)] tuples.
 */
export function chineseRemainderTheorem(equations: [number, number][]): number {
  const mod = equations.map(xs => xs[0])
  const remainder = equations.map(xs => xs[1])
  const M = product(mod)
  const rmod = mod.map(m => Math.floor(M / m))
  const T = mod.zip(rmod).map(([m, r]) => rectify(exgcd(r, m)[0], m))
  return   remainder.zip(rmod, T)
    .map(([a, r, t]) => int(BigInt(a * r) * BigInt(t) % BigInt(M)))
    .reduce((acc, x) => (acc + x) % M)
}
