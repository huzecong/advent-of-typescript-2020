/**
 * An infinite iterator counting from `start`. Equivalent to Python's `itertools.count`.
 * @param start  The number to start counting from. Defaults to 0.
 */
export function * count(start?: number): Generator<number> {
  start = start ?? 0
  for (let i = start; ; ++i)
    yield i
}
