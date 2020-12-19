export function int(x: string): number {
  return parseInt(x, 10)
}

/**
 * Return the number in range `[0, mod)` that's congruent to `x` modulo `mod`.
 */
export function rectify(x: number, mod: number): number {
  x %= mod
  if (x < 0) x += mod
  return x
}
