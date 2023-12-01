import { getInputLines } from '../_utils/input';
import { map } from '../_utils/map';
import { pipe } from '../_utils/pipe';
import { sum } from '../_utils/sum';

const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const numJoined = numbers.join('|')

const p1 = pipe(
  map<string, number>(x => Number(x.match(/(?<=^\D*)(\d)/g)![0] + x.match(/(\d)(?=\D*$)/g)![0])),
  sum
)

const p2BeforeReggie = new RegExp(String.raw`(?<=^.*)(?<!\d|${numJoined})(\d|${numJoined})`, 'g')
const p2AfterReggie = new RegExp(String.raw`(\d|${numJoined})(?:.(?<!\d|${numJoined}))*$`, '')

const toNumStr = (x: string) => String((numbers.indexOf(x) + 1) || x)

const p2 = pipe(
  map<string, string>(x =>
    toNumStr(x.match(p2BeforeReggie)[0]) + toNumStr(x.match(p2AfterReggie).at(-1))
  ),
  sum
)

console.log(p1(getInputLines()))
console.log(p2(getInputLines()))
