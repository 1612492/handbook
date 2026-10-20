import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = ["tdz", "hoisted", "initialized", "executed"] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const varCode = `console.log(x);
var x = 1;`;

const varSteps: Step[] = [
  {
    id: "h1-1",
    activeLine: 2,
    narration:
      "Only the declaration of `x` is hoisted to the top of the scope. The assignment stays where it is.",
    containers: c({ hoisted: ["var x"] }),
    outputAppend: "x hoisted",
    focus: "hoisted",
  },
  {
    id: "h1-2",
    activeLine: 1,
    narration:
      "console.log(x) runs. The binding exists, but it has no value yet, so it reads as undefined.",
    containers: c({ hoisted: ["var x"], executed: ["console.log(x)"] }),
    outputAppend: "undefined",
    focus: "executed",
  },
  {
    id: "h1-3",
    activeLine: 2,
    narration:
      "The assignment `x = 1` finally runs and initialises the already-hoisted binding.",
    containers: c({ initialized: ["x = 1"] }),
    outputAppend: "1",
    focus: "initialized",
  },
];

const tdzCode = `console.log(y);
let y = 2;`;

const tdzSteps: Step[] = [
  {
    id: "h2-1",
    activeLine: 2,
    narration:
      "`let y` is hoisted too, but it is not initialised. It sits in the temporal dead zone until the declaration is evaluated.",
    containers: c({ tdz: ["let y (TDZ)"] }),
    outputAppend: "y in TDZ",
    focus: "tdz",
  },
  {
    id: "h2-2",
    activeLine: 1,
    narration:
      "console.log(y) reads a binding that is still in the temporal dead zone, so it throws a ReferenceError.",
    containers: c({ tdz: ["let y (TDZ)"], executed: ["console.log(y)"] }),
    outputAppend: "ReferenceError",
    focus: "executed",
  },
  {
    id: "h2-3",
    activeLine: 2,
    narration: "The declaration is evaluated, the TDZ ends, and `y` becomes 2.",
    containers: c({ initialized: ["y = 2"] }),
    outputAppend: "2",
    focus: "initialized",
  },
];

export const examples: Example[] = [
  {
    id: "var-hoisting",
    title: "var hoisting",
    code: varCode,
    steps: varSteps,
    expectedOutput: ["x hoisted", "undefined", "1"],
  },
  {
    id: "let-tdz",
    title: "let and the TDZ",
    code: tdzCode,
    steps: tdzSteps,
    expectedOutput: ["y in TDZ", "ReferenceError", "2"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
