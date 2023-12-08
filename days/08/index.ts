import { apply } from '@utils/apply';
import { count } from '@utils/count';
import { cycle } from '@utils/cycle';
import { getInputLinesArray } from '@utils/input';
import { last } from '@utils/last';
import { map } from '@utils/map';
import { scan } from '@utils/scan';
import { takeWhile } from '@utils/takeWhile';
const input = getInputLinesArray()

const gcd = (a, b) => a === 0 ? b : gcd(b % a, a)

const getData = (input) => {
  const [[...cmd], , ...rest] = input

  return {
    cmd, map: Object.fromEntries(rest.map(x => x.match(/\w+/g)).map(([key, ...vals]) => [key, vals]))
  }
}

const p1 = (input) => {
  const { cmd, map } = getData(input)

  return 1 + apply(
    cycle(cmd),
    scan(['AAA'], (state, item) => {
      const next = map[state.shift()][item === 'L' ? 0 : 1]
      state.push(next)
      return next
    }),
    takeWhile(x => x !== 'ZZZ'),
    count
  )
}
const p2 = (input) => {
  const { cmd, map: data } = getData(input)
  const initialValues = Object.keys(data).filter((x) => x.at(-1) === 'A').map((x) => x)
  return apply(
    initialValues,
    map(value => 1 + apply(
      cycle(cmd),
      scan([value], (state, item) => {
        const next = data[state.shift()][item === 'L' ? 0 : 1]
        state.push(next)
        return next
      }),
      takeWhile((x: string) => x.at(-1) !== 'Z'),
      count
    )),
    scan([], (state, item) => {
      const val = state.shift()
      if (!val) {
        state.push(item)
        return item
      }
      const next = item * val / gcd(item, val)
      state.push(next)
      return next
    }),
    last
  )
}

console.log(p1(input))
console.log(p2(input))
