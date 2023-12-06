import { apply } from '@utils/apply';
import { count } from '@utils/count';
import { filter } from '@utils/filter';
import { getInputLinesArray } from '@utils/input';
import { map } from '@utils/map';
import { pipe } from '@utils/pipe';
import { product } from '@utils/product';
import { range } from '@utils/range';
import { zip } from '@utils/zip';
const input = getInputLinesArray()

const numberOfFasterTimes = ([t, record]: Iterable<number>) => 2 * apply(
  range(1, t / 2),
  filter((x) => x * (t - x) > record),
  count
) + ~-(t % 2)

const p1 = pipe(
  map<string, number[]>(x => x.match(/\d+/g).map(Number)),
  ([...x]) => zip(x as [number[], number[]]),
  map(numberOfFasterTimes),
  product
)

const p2 = pipe(
  map<string, number>(x => Number(x.match(/\d+/g).join(''))),
  numberOfFasterTimes
)

console.log(p1(input))
console.log(p2(input))
