const _join = <T>([...iter]: Iterable<T>, delimiter: string = ''): string => iter.join(delimiter);
export const join = (delimiter: string = '') => <T>(iter: Iterable<T>): string => _join(iter, delimiter);
