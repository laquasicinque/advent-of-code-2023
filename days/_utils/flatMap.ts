import { apply } from "./apply";
import { flat } from "./flat";
import { map } from "./map";

export const _flatMap = <T, U>(
  iter: Iterable<T>,
  fn: (item: T, index: number, iter: Iterable<T>) => U | Iterable<U>
): Iterable<U> => {
  return apply(iter, map(fn), flat(1)) as Iterable<U>;
};

export const flatMap =
  <T, U>(fn: (item: T, index: number, iter: Iterable<T>) => U | Iterable<U>) =>
    (iter: Iterable<T>) =>
      _flatMap(iter, fn);

flatMap._ = _flatMap
