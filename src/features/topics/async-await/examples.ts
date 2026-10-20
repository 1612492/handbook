import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = ["sync", "suspended", "microtask", "resumed"] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const awaitCode = `async function load() {
  console.log('start');
  const value = await Promise.resolve(42);
  console.log('end', value);
}

load();
console.log('after call');`;

const awaitSteps: Step[] = [
  {
    id: "a1-1",
    activeLine: 9,
    narration:
      "load() is called. An async function runs synchronously until its first await.",
    containers: c({ sync: ["load"] }),
    focus: "sync",
  },
  {
    id: "a1-2",
    activeLine: 2,
    narration: "The first statement inside load runs immediately.",
    containers: c({ sync: ["load"] }),
    outputAppend: "start",
    focus: "sync",
  },
  {
    id: "a1-3",
    activeLine: 3,
    narration:
      "`await` suspends load: the function returns a pending promise and its continuation is queued as a microtask.",
    containers: c({
      suspended: ["load (suspended)"],
      microtask: ["load continuation"],
    }),
    focus: "suspended",
  },
  {
    id: "a1-4",
    activeLine: 10,
    narration:
      "Control returns to the caller, so the next line runs before load continues.",
    containers: c({
      suspended: ["load (suspended)"],
      microtask: ["load continuation"],
    }),
    outputAppend: "after call",
    focus: "sync",
  },
  {
    id: "a1-5",
    activeLine: 3,
    narration:
      "The microtask queue drains and the continuation resumes load with the resolved value.",
    containers: c({
      resumed: ["load continuation"],
      microtask: ["load continuation (done)"],
    }),
    focus: "resumed",
  },
  {
    id: "a1-6",
    activeLine: 4,
    narration: "The awaited value is 42 and the function runs to completion.",
    containers: c({ resumed: ["load continuation"] }),
    outputAppend: "end 42",
    focus: "resumed",
  },
];

const sequentialCode = `async function one() {
  return 1;
}

async function two() {
  const value = await one();
  console.log(value);
}

two();
console.log('after call');`;

const sequentialSteps: Step[] = [
  {
    id: "a2-1",
    activeLine: 12,
    narration: "two() is called and runs synchronously until the await.",
    containers: c({ sync: ["two"] }),
    focus: "sync",
  },
  {
    id: "a2-2",
    activeLine: 8,
    narration:
      "`await one()` suspends two, even though one() already returned a value. The resolution still goes through the microtask queue.",
    containers: c({
      suspended: ["two (suspended)"],
      microtask: ["two continuation"],
    }),
    focus: "suspended",
  },
  {
    id: "a2-3",
    activeLine: 13,
    narration: "The caller continues while two is still suspended.",
    containers: c({
      suspended: ["two (suspended)"],
      microtask: ["two continuation"],
    }),
    outputAppend: "after call",
    focus: "sync",
  },
  {
    id: "a2-4",
    activeLine: 8,
    narration: "The continuation resumes and the awaited value is 1.",
    containers: c({ resumed: ["two continuation"] }),
    outputAppend: "1",
    focus: "resumed",
  },
];

export const examples: Example[] = [
  {
    id: "await-pauses",
    title: "await pauses the function",
    code: awaitCode,
    steps: awaitSteps,
    expectedOutput: ["start", "after call", "end 42"],
  },
  {
    id: "await-always-defers",
    title: "await always defers",
    code: sequentialCode,
    steps: sequentialSteps,
    expectedOutput: ["after call", "1"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
