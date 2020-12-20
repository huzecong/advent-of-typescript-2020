import {int} from './number'

/**
 * A subtype of map that calls the factory method when trying to get a key that doesn't exist. Equivalent to Python's
 * `collections.defaultdict`.
 */
export class DefaultDict<K, V> extends Map<K, V> {
  private readonly factory: () => V

  constructor(factory: () => V, entries?: readonly (readonly [K, V])[]) {
    super(entries)
    this.factory = factory
  }

  get(key: K): V {
    if (this.has(key)) return super.get(key)!
    const value = this.factory()
    this.set(key, value)
    return value
  }
}

/**
 * An array that supports negative indexing, like Python's. Also performs boundary checks and throws an error when
 * accessing invalid indices.
 */
export function smartArray<T>(arr?: T[]): T[] {
  return new Proxy(arr ?? [], {
    get: (obj: T[], key: number | string): T => {
      if (typeof key === 'string') {
        const numKey = int(key)
        // @ts-ignore
        if (Number.isNaN(numKey)) return obj[key]
        key = numKey
      }
      if (key < 0) key = obj.length + key
      if (key < 0 || key >= obj.length)
        throw new Error(`Array index out of bounds (tried to access index ${key} in array with length ${obj.length}`)
      return obj[key]!
    },
    set: (obj: T[], key: number | string, value: T) => {
      if (typeof key === 'string') {
        const numKey = int(key)
        if (Number.isNaN(numKey)) {
          // @ts-ignore
          obj[key] = value
          return true
        }
        key = numKey
      }
      if (key < 0) key = obj.length + key
      obj[key] = value
      return true
    },
  })
}
