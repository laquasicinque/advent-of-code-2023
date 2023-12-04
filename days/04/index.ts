import { filter } from '@utils/filter';
import { getInputLinesArray } from '@utils/input';
import { intersection } from '@utils/intersection';
import { map } from '@utils/map';
import { pipe } from '@utils/pipe';
import { sum } from '@utils/sum';
const input = getInputLinesArray()

const getCardData = (str: string) => {
  const { groups: { card, win, me } } = str.match(/Card\s+(?<card>\d+): (?<win>.+?)\|(?<me>.+)/i)
  const [winning, mine] = [win, me].map(x => new Set(x.trim().split(/\s+/g).map(Number)))
  return {
    card: Number(card),
    winning,
    mine, matches: intersection(winning, mine).size
  }
}

const p1 = pipe(
  map(getCardData),
  filter(({ matches }) => matches),
  map(({ matches }) => 2 ** (matches - 1)),
  sum
)

const p2 = () => {
  const cardInstances = Object.fromEntries(Array.from(input, (_, i) => [i + 1, 1]))
  for (const { card, matches } of input.map(getCardData).filter(({ matches }) => matches)) {
    for (let times = 0; times < cardInstances[card]; times++) {
      for (let i = 1; i <= matches; i++) {
        cardInstances[card + i] = cardInstances[card + i] ? cardInstances[card + i] + 1 : 2
      }
    }
  }
  return sum(Object.values(cardInstances))
}

console.log(p1(input))
console.log(p2())
