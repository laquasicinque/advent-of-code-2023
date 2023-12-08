export const scan = <T, U, K>(initialState: U, fn: (state: U, item: T) => K) => (iter: Iterable<T>) => _scan(iter, initialState, fn)
scan._ = _scan
function* _scan<T, U, K>(iter: Iterable<T>, initialState: U, fn: (state: U, item: T) => K): IterableIterator<K> {
  for (const item of iter) {
    yield fn(initialState, item)
  }
}
