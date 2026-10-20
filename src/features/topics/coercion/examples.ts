import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = [
  "input",
  "primitive",
  "string",
  "number",
  "result",
] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const looseCode = `0 == '0';
0 == 'false';
'' == 0;`;

const looseSteps: Step[] = [
  {
    id: "co1-1",
    activeLine: 1,
    narration:
      "Both operands are read. The number and the string have different types, so `==` cannot compare them yet.",
    containers: c({ input: ["0 (number)", "'0' (string)"] }),
    focus: "input",
  },
  {
    id: "co1-2",
    activeLine: 1,
    narration:
      "Abstract equality converts both operands to primitives first. The number is already a primitive; the string stays a string.",
    containers: c({
      input: ["0 (number)", "'0' (string)"],
      primitive: ["0 (number)", "'0' (string)"],
    }),
    focus: "primitive",
  },
  {
    id: "co1-3",
    activeLine: 1,
    narration:
      "One operand is a number, so the string is converted with ToNumber. '0' becomes the number 0.",
    containers: c({
      primitive: ["0 (number)"],
      string: ["'0' → 0"],
      number: ["0 (number)"],
    }),
    focus: "string",
  },
  {
    id: "co1-4",
    activeLine: 1,
    narration: "Both operands are now the number 0, so the comparison is true.",
    containers: c({ result: ["0 == '0' → true"] }),
    outputAppend: "true",
    focus: "result",
  },
];

const strictCode = `0 === '0';
0 === 0;`;

const strictSteps: Step[] = [
  {
    id: "co2-1",
    activeLine: 1,
    narration:
      "Strict equality compares types first, with no conversion at all.",
    containers: c({ input: ["0 (number)", "'0' (string)"] }),
    focus: "input",
  },
  {
    id: "co2-2",
    activeLine: 1,
    narration:
      "A number and a string are different types, so the comparison is false immediately.",
    containers: c({ result: ["0 === '0' → false"] }),
    outputAppend: "false",
    focus: "result",
  },
  {
    id: "co2-3",
    activeLine: 2,
    narration:
      "Two numbers of the same type are compared by value, so this one is true.",
    containers: c({ result: ["0 === 0 → true"] }),
    outputAppend: "true",
    focus: "result",
  },
];

export const examples: Example[] = [
  {
    id: "loose-equality",
    title: "Loose equality",
    code: looseCode,
    steps: looseSteps,
    expectedOutput: ["true"],
  },
  {
    id: "strict-equality",
    title: "Strict equality",
    code: strictCode,
    steps: strictSteps,
    expectedOutput: ["false", "true"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
