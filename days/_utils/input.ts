import { apply } from "./apply";
import { getEntryFile } from "./getEntryFile";
import { lines } from "./lines";
import { map } from "./map";
import { resolve as pathResolve, dirname as pathDirname } from 'node:path'
import { readFileSync } from 'node:fs'

export function getInput(fileName = 'data') {
  const entry = getEntryFile();
  const dirname = pathDirname(entry);
  return readFileSync(pathResolve(dirname, `./${fileName}.txt`), 'utf8')
}

export function getInputLines(fileName = 'data') {
  return lines(getInput(fileName))
}
export function getInputLinesArray(fileName = 'data') {
  return [...getInputLines(fileName)]
}

export function getInputGrid(fileName = 'data') {
  return apply(getInputLines(fileName), map(([...x]) => x))
}
