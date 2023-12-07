import { getInput, getInputLinesArray } from '@utils/input';
import { sum } from '@utils/sum';
const input = getInputLinesArray('ex1')
const cardStrength = "23456789TJQKA"
const cardStrengthJoker = "J23456789TJQKA"

enum Hand {
  HIGH_CARD,
  ONE_PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  FIVE_OF_A_KIND
}

const getHandStrength = (hand) => {
  const uniqueCards = new Set(hand).size
  if (uniqueCards === 1) {
    return Hand.FIVE_OF_A_KIND
  }
  if (uniqueCards === 2) {
    const map = Object.entries(mapCards(hand))
    if (map.filter(([, v]) => v === 2).length) {
      return Hand.FULL_HOUSE
    }
    return Hand.FOUR_OF_A_KIND
  }
  if (uniqueCards === 3) {
    const map = Object.entries(mapCards(hand))
    if (map.filter(([, v]) => v === 2).length) {
      //twopair
      return Hand.TWO_PAIR
    }
    return Hand.THREE_OF_A_KIND
  }
  if (uniqueCards === 5) {
    return Hand.HIGH_CARD
  }
  return Hand.ONE_PAIR
}

const mapCards = (hand) => {
  const map = {}
  for (const x of hand) {
    map[x] = (map[x] ?? 0) + 1
  }
  return map
}

const p1 = (input) => {
  const hands = input.map(x => x.split(' ')).map(([hand, bid]) => [hand.split(''), Number(bid), getHandStrength(hand.split('')), Hand[getHandStrength(hand.split(''))]])
  const sorted = hands.sort(([hb, , a], [ha, , b]) => {
    const diff = a - b
    if (diff === 0) {
      for (const [i, da] of ha.entries()) {
        const db = hb[i]
        const ia = cardStrength.indexOf(da)
        const ib = cardStrength.indexOf(db)
        if (ia === ib) continue
        return ib - ia
      }
    }
    return diff
  })
  console.log(sorted)
  return sum(sorted.map(([, val], i) => val * (i + 1)))
}
const getBestHandStrength = ([...hand]) => {
  const uniqueCards = new Set(hand)
  if (!uniqueCards.has("J")) {
    return getHandStrength(hand)
  }
  const nonJokers = hand.filter(x => x !== "J");
  const uniqueNonJokers = new Set(nonJokers)
  if (uniqueNonJokers.size <= 1) return Hand.FIVE_OF_A_KIND
  if (uniqueNonJokers.size === 2) {
    if (nonJokers.length <= 3) return Hand.FOUR_OF_A_KIND
    const map = Object.entries(mapCards(nonJokers))
    if (map.filter(([, v]) => v === 2).length) {
      return Hand.FULL_HOUSE
    }
    return Hand.FOUR_OF_A_KIND
  }
  if (uniqueNonJokers.size === 3) {
    return Hand.THREE_OF_A_KIND
  }
  return Hand.ONE_PAIR
}

const p2 = (input) => {
  const hands = input.map(x => x.split(' ')).map(([hand, bid]) => {
    const best = getBestHandStrength(hand.split(''));
    return [hand.split(''), Number(bid), best, Hand[best]]
  })
  const sorted = hands.sort(([hb, , a], [ha, , b]) => {
    const diff = a - b
    if (diff === 0) {
      for (const [i, da] of ha.entries()) {
        const db = hb[i]
        const ia = cardStrengthJoker.indexOf(da)
        const ib = cardStrengthJoker.indexOf(db)
        if (ia === ib) continue
        return ib - ia
      }
    }
    return diff
  })
  return sum(sorted.map(([, val], i) => val * (i + 1)))
}

console.log(p1(input))
console.log(p2(input))
