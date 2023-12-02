import { getInput, getInputLinesArray } from '@utils/input';
import { sum } from '@utils/sum';
const input = getInputLinesArray()

const colorMatch = /(?<count>\d+) (?<color>\w+)/g

const p1 = (lines: string[]) => {
  const possibleIds = []
  x: for (const line of lines) {
    const id = Number(line.match(/^Game (\d+):/)[1])
    const [, str] = line.split(':')
    for (const group of str.split(';')) {
      const counts = { red: 0, green: 0, blue: 0 }
      for (const { groups: { color, count } } of group.matchAll(colorMatch)) {
        counts[color] += Number(count)
      }
      if (counts.red > 12 || counts.green > 13 || counts.blue > 14) {
        continue x
      }
    }
    possibleIds.push(id)
  }
  return sum(possibleIds)
}

const p2 = (lines: string[]) => {
  const products = lines.map(line => {
    const id = Number(line.match(/^Game (\d+):/)[1])
    const [, str] = line.split(':')
    const counts = { red: 0, green: 0, blue: 0 }

    for (const group of str.split(';')) {
      for (const { groups: { color, count } } of group.matchAll(colorMatch)) {
        counts[color] = Math.max(Number(count), counts[color])
      }
    }
    return Object.values(counts).reduce((a, v) => a * v)
  })
  return sum(products)
}

console.log(p2(input))
