// import * as path from "https://deno.land/std@0.167.0/path/mod.ts";
import { mkdir } from 'node:fs/promises'
import { JSDOM } from 'jsdom'
const YEAR = 2023
const day = String(Bun.argv[2] ?? new Date().getDate());
const dayPadded = day.padStart(2, "0")

console.log(`Importing day ${day}.`);
const [{ instructions, examples }, input] = await Promise.all([
  getInstructions(),
  getInput(),
]);

try {
  await mkdir(`days/${dayPadded}/`, { recursive: true });
} catch (e) {
  console.log(e);
}

const encoder = new TextEncoder();
await Bun.write(
  `days/${dayPadded}/data.txt`,
  encoder.encode(input)
);
await Bun.write(
  `days/${dayPadded}/README.md`,
  encoder.encode(instructions)
);
try {
  if (!await Bun.file(`days/${dayPadded}/index.ts`).exists()) {
    await Bun.write(
      `days/${dayPadded}/index.ts`,
      `import { getInput } from '@utils/input';
const input = getInput()
`
    );
  }
} catch { }

await Promise.all(examples.map((example, idx) => Bun.write(`days/${dayPadded}/ex${idx + 1}.txt`, example)))

console.log(`Files written`);

async function getInput() {
  const page = await fetch(`https://adventofcode.com/${YEAR}/day/${day}/input`, {
    headers: {
      COOKIE: "session=" + process.env.AOC_SESSION,
    },
  });

  return page.text();
}

async function getInstructions() {
  const page = await fetch(`https://adventofcode.com/${YEAR}/day/${day}`, {
    headers: {
      COOKIE: "session=" + process.env.AOC_SESSION,
    },
  });

  const data = await page.text();
  const dom = new JSDOM(data);
  const doc = dom.window.document
  const nodes = [];
  const exampleCases = new Set<string>()
  for (const node of doc?.querySelectorAll("article > *") || []) {
    switch ((node as Element).tagName) {
      case "H2":
        nodes.push(`# ${node.textContent}`);
        break;
      case "PRE":
        nodes.push(`\`\`\`\n${node.textContent}\n\`\`\``);
        exampleCases.add(node.textContent)
        break;
      case "UL":
        nodes.push(
          [...(node as Element).children]
            .map((x) => `- ${x.textContent}`)
            .join("\n")
        );
        break;
      case "P":
        {
          const cp = node.cloneNode(true) as Element;
          cp.querySelectorAll("*").forEach((item) => {
            const el = item as Element;
            return el.replaceWith(
              el.tagName === "CODE"
                ? `\`${el.textContent}\``
                : el.tagName === "EM"
                  ? `*${item.textContent}*`
                  : el
            );
          });
          nodes.push(cp.textContent);
        }
        break;
      default:
        console.log((node as Element).tagName, "Not supported");
    }
  }
  return { instructions: nodes.join("\n\n"), examples: [...exampleCases] };
}
