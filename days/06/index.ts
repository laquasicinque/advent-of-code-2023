import { getInputLinesArray } from '@utils/input';
import { map } from '@utils/map';
import { pipe } from '@utils/pipe';
import { product } from '@utils/product';
import { zip } from '@utils/zip';
const input = getInputLinesArray()
const { ceil } = Math

const numberOfFasterTimes = ([t, r]: Iterable<number>) => ceil((-t + (t ** 2 - 4 * r) ** .5) / 2) - ceil((-t - (t ** 2 - 4 * r) ** .5) / 2)
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
