import { filter } from "./filter"

export const intersection = <T, U extends T>(a: Iterable<U>, b: Iterable<T>): Set<T & U> => {
  const set = new Set(b)
  return new Set(filter._(a, x => set.has(x)))
}
