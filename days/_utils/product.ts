export const product = (numbers: Iterable<number | string>): number => {
  let total = 1
  for (const val of numbers) {
    total *= Number(val) || 0
  }
  return total
}
