export class DefaultDict<K, V> extends Map<K, V> {
  private readonly factory: () => V

  constructor(factory: () => V, entries?: readonly (readonly [K, V])[]) {
    super(entries)
    this.factory = factory
  }

  get(key: K): V | undefined {
    if (this.has(key)) return super.get(key)
    const value = this.factory()
    this.set(key, value)
    return value
  }
}
