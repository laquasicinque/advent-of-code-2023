import { apply } from "./apply";
import { getEntryFile } from "./getEntryFile";
import { lines } from "./lines";
import { map } from "./map";
import {resolve as pathResolve, dirname as pathDirname} from 'node:path'
import {readFileSync} from 'node:fs'

export function getInput() {
  const entry = getEntryFile();
  const dirname = pathDirname(entry);
  return readFileSync(pathResolve(dirname, "./data.txt"), 'utf8')
}

export function getInputLines() {
  return lines(getInput())
}
export function getInputLinesArray() {
  return [...getInputLines()]
}

export function getInputGrid() {
  return apply(getInputLines(), map(([...x]) => x))
}
