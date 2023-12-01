/**
 * Neveruse this in prod
 */
export function getEntryFile() {
  try {
    throw new Error();
  } catch (e) {
    const file = (e as Error).stack?.split("\n").at(-1) as string;
    return file.replace(/\s*at module code \(/, "").replace(/:\d+:\d+\)$/, "")
  }
}
