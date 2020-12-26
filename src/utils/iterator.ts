/**
 * An infinite iterator counting from `start`. Equivalent to Python's `itertools.count`.
 * @param start  The number to start counting from. Defaults to 0.
 */
export function * count(start?: number): Generator<number> {
  start = start ?? 0
  for (let i = start; ; ++i)
    yield i
}

export function range(end: number, step?: number): Generator<number>;
export function range(start: number, end: number, step?: number): Generator<number>;
export function * range(start: number, end?: number, step?: number): Generator<number> {
  if (end === undefined) [start, end] = [0, start]
  step = step ?? 1
  if (step === 0) throw new Error('step cannot be 0')
  if (step > 0) {
    for (let i = start; i < end; i += step)
      yield i
  } else {
    for (let i = start; i > end; i += step)
      yield i
  }
}
