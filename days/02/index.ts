import { filter } from '@utils/filter';
import { getInput, getInputLinesArray } from '@utils/input';
import { map } from '@utils/map';
import { pipe } from '@utils/pipe';
import { product } from '@utils/product';
import { sum } from '@utils/sum';
const input = getInputLinesArray()

const colorMatch = /(?<count>\d+) (?<color>\w+)/g

const extractData = (str: string) => {
  const { groups: { id, sets } } = str.match(/^Game (?<id>\d+): (?<sets>.+)$/i)
  return { id: Number(id), sets: sets.split(';') }
}

const p1 = pipe(
  map(extractData),
  filter(({ sets }) => {
    for (const group of sets) {
      const counts = { red: 0, green: 0, blue: 0 }
      for (const { groups: { color, count } } of group.matchAll(colorMatch)) {
        counts[color] += Number(count)
      }
      if (counts.red > 12 || counts.green > 13 || counts.blue > 14) {
        return false
      }
    }
    return true
  }),
  map(({ id }) => id),
  sum
)
const p2 = pipe(
  map(extractData),
  map(({ sets }) => {
    const counts = { red: 0, green: 0, blue: 0 }
    for (const group of sets) {
      for (const { groups: { color, count } } of group.matchAll(colorMatch)) {
        counts[color] = Math.max(Number(count), counts[color])
      }
    }
    return product(Object.values(counts))
  }),
  sum
)


console.log(p1(input))
console.log(p2(input))
