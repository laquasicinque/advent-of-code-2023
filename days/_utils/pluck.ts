import { map } from "./map";

export const pluck = <K extends PropertyKey>(prop: K) =>
  <T extends Record<K, unknown>>(input: Iterable<T>) =>
    map._(input, val => val[prop])
