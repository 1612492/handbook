import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = ["global", "outer", "inner", "closure"] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const counterCode = `function makeCounter() {
  let count = 0;
  return function increment() {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
counter();
counter();`;

const counterSteps: Step[] = [
  {
    id: "c1-1",
    activeLine: 1,
    narration:
      "makeCounter() is called. Its own scope is created and `count` is declared there.",
    containers: c({ outer: ["count = 0"] }),
    outputAppend: "count = 0",
    focus: "outer",
  },
  {
    id: "c1-2",
    activeLine: 3,
    narration:
      "The inner function `increment` is created. It has no scope of its own for `count`, so it captures the enclosing binding.",
    containers: c({
      outer: ["count = 0"],
      inner: ["increment"],
      closure: ["count"],
    }),
    focus: "closure",
  },
  {
    id: "c1-3",
    activeLine: 6,
    narration:
      "counter() runs `increment`. The assignment `count += 1` resolves `count` through the captured closure environment, not the global scope.",
    containers: c({ inner: ["increment"], closure: ["count = 1"] }),
    outputAppend: "count = 1",
    focus: "closure",
  },
  {
    id: "c1-4",
    activeLine: 7,
    narration:
      "The second call reuses the same closure environment, so `count` keeps growing instead of resetting.",
    containers: c({ inner: ["increment"], closure: ["count = 2"] }),
    outputAppend: "count = 2",
    focus: "closure",
  },
];

const independentCode = `function makeCounter() {
  let count = 0;
  return () => ++count;
}

const a = makeCounter();
const b = makeCounter();

a();
a();
b();`;

const independentSteps: Step[] = [
  {
    id: "c2-1",
    activeLine: 1,
    narration:
      "makeCounter() creates an outer scope holding `count` and an inner arrow function.",
    containers: c({ outer: ["count = 0"], inner: ["() => ++count"] }),
    focus: "outer",
  },
  {
    id: "c2-2",
    activeLine: 6,
    narration: "a = makeCounter() captures one closure environment.",
    containers: c({
      outer: ["count = 0"],
      inner: ["() => ++count"],
      closure: ["env A"],
    }),
    focus: "closure",
  },
  {
    id: "c2-3",
    activeLine: 7,
    narration:
      "b = makeCounter() creates a second, independent closure environment.",
    containers: c({ inner: ["() => ++count"], closure: ["env A", "env B"] }),
    focus: "closure",
  },
  {
    id: "c2-4",
    activeLine: 10,
    narration:
      "Calling a() twice updates only environment A; environment B is untouched.",
    containers: c({ closure: ["env A: count = 2", "env B: count = 0"] }),
    outputAppend: "a = 2, b = 0",
    focus: "closure",
  },
];

export const examples: Example[] = [
  {
    id: "counter-closure",
    title: "Counter closure",
    code: counterCode,
    steps: counterSteps,
    expectedOutput: ["count = 0", "count = 1", "count = 2"],
  },
  {
    id: "independent-environments",
    title: "Independent environments",
    code: independentCode,
    steps: independentSteps,
    expectedOutput: ["a = 2, b = 0"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
