import { filter } from '@utils/filter';
import { getInput, getInputLinesArray } from '@utils/input';
import { map } from '@utils/map';
import { pipe } from '@utils/pipe';
import { pluck } from '@utils/pluck';
import { product } from '@utils/product';
import { sum } from '@utils/sum';
const input = getInputLinesArray()

const colorMatch = /(?<count>\d+) (?<color>\w+)/g

const extractData = (str: string) => {
  const { groups: { id, sets } } = str.match(/^Game (?<id>\d+): (?<sets>.+)$/i)
  return {
    id, sets: sets.split(';').map(set => {
      const counts = { red: 0, green: 0, blue: 0 }
      for (const { groups: { count, color } } of set.matchAll(colorMatch)) {
        counts[color] += Number(count)
      }
      return counts
    })
  }
}

const p1 = pipe(
  map(extractData),
  filter(({ sets }) => {
    for (const { red, green, blue } of sets) {
      if (red > 12 || green > 13 || blue > 14) {
        return false
      }
    }
    return true
  }),
  pluck('id'),
  sum
)
const p2 = pipe(
  map(extractData),
  map(({ sets }) => {
    const counts = { red: 0, green: 0, blue: 0 }
    for (const group of sets) {
      Object.entries(group).forEach(([key, value]) => counts[key] = Math.max(counts[key], value))
    }
    return product(Object.values(counts))
  }),
  sum
)


console.log(p1(input))
console.log(p2(input))
