import { getInputGrid } from '@utils/input';
import { product } from '@utils/product';
import { sum } from '@utils/sum';
// const grid = [...getInputGrid('ex1')]
const grid = [...getInputGrid()]

const isNumber = (x: unknown): x is number => !isNaN(Number(x))

function makeGrid(grid) {
  const xGrid = []

  for (const row of grid.map(x => x.join(''))) {
    const ra = [];
    let last = 0;
    for (const { 0: match, indices: [[start, stop]] } of row.matchAll(/\d+/dig)) {
      ra.push(...Array.from({ length: start - last }, (_, i) => row.at(i + last)));
      ra.push(...Array(stop - start).fill(new Number(match)));
      last = stop;
    }

    if (last < row.length) {
      ra.push(...Array.from({ length: row.length - last }, (_, i) => row.at(i + last)));
    }
    xGrid.push(ra);
  }
  return xGrid
}

const getSymbolsNear = (grid, startX, stopX, y) => {
  const height = grid.length
  const nearbySymbols = []
  for (let dy = Math.max(y - 1, 0); dy <= Math.min(y + 1, height - 1); dy++) {
    for (let dx = Math.max(startX - 1, 0); dx <= stopX; dx++) {
      if (dy === y) {
        if (dx >= startX && dx < stopX) continue
      }
      nearbySymbols.push(grid[dy][dx])
    }
  }
  return nearbySymbols
}

const p1 = (grid) => {
  const matches = []
  for (const [y, row] of grid.entries()) {
    const rowStr = row.join('')
    for (const { 0: match, indices: [[start, stop]] } of rowStr.matchAll(/\d+/dig)) {
      const mat = getSymbolsNear(grid, start, stop, y)
      if (mat.join('').match(/[^\.]/)) {
        matches.push(match)
      }
    }
  }
  return sum(matches)
}


const p2 = (grid) => {
  let sum = 0
  const xGrid = makeGrid(grid);
  for (const [y, row] of xGrid.entries()) {
    for (const [x, val] of row.entries()) {
      if (val === '*') {
        const nums = new Set<number | string>()
        for (let dy = Math.max(y - 1, 0); dy <= Math.min(y + 1, xGrid.length - 1); dy++) {
          for (let dx = Math.max(x - 1, 0); dx <= Math.min(x + 1, xGrid[0].length - 1); dx++) {
            if (dy !== y || dx !== x) {
              if (isNumber(xGrid[dy][dx])) {
                nums.add(xGrid[dy][dx])
              }
            }
          }
        }
        if (nums.size === 2) {
          sum += product(nums)
        }
      }
    }
  }


  return sum


}

console.log(p1(grid))
console.log(p2(grid))
