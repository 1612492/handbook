import type { Example, Step, StepContainers } from "./model";

function c(
  stack: string[] = [],
  webApis: string[] = [],
  microtask: string[] = [],
  task: string[] = [],
): StepContainers {
  const mk = (ids: string[]) => ids.map((id) => ({ id, label: id }));
  return {
    stack: mk(stack),
    webApis: mk(webApis),
    microtask: mk(microtask),
    task: mk(task),
  };
}

// ---------------------------------------------------------------------------
// Example 1: setTimeout vs Promise  -> output 1, 4, 3, 2
// ---------------------------------------------------------------------------
const ex1Code = `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');`;

const ex1Steps: Step[] = [
  {
    id: "e1-1",
    activeLine: 1,
    narration:
      "console.log('1') runs synchronously; '1' is appended to the output.",
    containers: c(),
    outputAppend: "1",
    focus: "stack",
  },
  {
    id: "e1-2",
    activeLine: 2,
    narration:
      "setTimeout registers a 0ms timer in the Web APIs. Its callback is NOT queued yet.",
    containers: c([], ["cb2"]),
    focus: "webApis",
  },
  {
    id: "e1-3",
    activeLine: 3,
    narration:
      "Promise.resolve().then(...) enqueues cb3 as a microtask immediately.",
    containers: c([], ["cb2"], ["cb3"]),
    focus: "microtask",
  },
  {
    id: "e1-4",
    activeLine: 4,
    narration:
      "console.log('4') runs synchronously; '4' is appended to the output.",
    containers: c([], ["cb2"], ["cb3"]),
    outputAppend: "4",
    focus: "stack",
  },
  {
    id: "e1-5",
    activeLine: 3,
    narration:
      "Call stack empty: the event loop drains the microtask queue FULLY before touching tasks. cb3 runs -> output 3.",
    containers: c(["cb3"], ["cb2"], []),
    outputAppend: "3",
    focus: "microtask",
  },
  {
    id: "e1-6",
    activeLine: 2,
    narration:
      "Timer fires: cb2 moves to the task queue, then runs (one task per loop turn) -> output 2.",
    containers: c(["cb2"], [], [], []),
    outputAppend: "2",
    focus: "task",
  },
];

// ---------------------------------------------------------------------------
// Example 2: nested microtasks  -> output C, A, B
// ---------------------------------------------------------------------------
const ex2Code = `Promise.resolve().then(() => {
  console.log('A');
  Promise.resolve().then(() => console.log('B'));
});
console.log('C');`;

const ex2Steps: Step[] = [
  {
    id: "e2-1",
    activeLine: 1,
    narration:
      "Promise.resolve().then(...) enqueues the outer callback as a microtask.",
    containers: c([], [], ["cbA"]),
    focus: "microtask",
  },
  {
    id: "e2-2",
    activeLine: 6,
    narration:
      "console.log('C') runs synchronously; 'C' is appended to the output.",
    containers: c([], [], ["cbA"]),
    outputAppend: "C",
    focus: "stack",
  },
  {
    id: "e2-3",
    activeLine: 2,
    narration:
      "Microtask queue drains: cbA runs, logs 'A'. While running it enqueues cbB as a NEW microtask.",
    containers: c(["cbA"], [], ["cbB"]),
    outputAppend: "A",
    focus: "microtask",
  },
  {
    id: "e2-4",
    activeLine: 3,
    narration:
      "The microtask queue is still non-empty (cbB), so it drains again before any task runs. cbB runs -> output B.",
    containers: c(["cbB"], [], []),
    outputAppend: "B",
    focus: "microtask",
  },
];

// ---------------------------------------------------------------------------
// Example 3: async/await  -> output 1, 3, 2
// ---------------------------------------------------------------------------
const ex3Code = `async function foo() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
}
foo();
console.log('3');`;

const ex3Steps: Step[] = [
  {
    id: "e3-1",
    activeLine: 7,
    narration: "foo() is called; its body starts running synchronously.",
    containers: c(["foo"], [], [], []),
    focus: "stack",
  },
  {
    id: "e3-2",
    activeLine: 2,
    narration:
      "console.log('1') runs inside foo; '1' is appended to the output.",
    containers: c(["foo"], [], [], []),
    outputAppend: "1",
    focus: "stack",
  },
  {
    id: "e3-3",
    activeLine: 3,
    narration:
      "await Promise.resolve() suspends foo and schedules its continuation as a microtask.",
    containers: c([], [], ["foo-cont"], []),
    focus: "microtask",
  },
  {
    id: "e3-4",
    activeLine: 8,
    narration:
      "console.log('3') runs synchronously; '3' is appended to the output.",
    containers: c([], [], ["foo-cont"], []),
    outputAppend: "3",
    focus: "stack",
  },
  {
    id: "e3-5",
    activeLine: 4,
    narration:
      "Call stack empty: microtask queue drains; foo's continuation runs -> output 2.",
    containers: c(["foo-cont"], [], [], []),
    outputAppend: "2",
    focus: "microtask",
  },
];

export const examples: Example[] = [
  {
    id: "settimeout-vs-promise",
    title: "setTimeout vs Promise",
    code: ex1Code,
    steps: ex1Steps,
    expectedOutput: ["1", "4", "3", "2"],
  },
  {
    id: "nested-microtasks",
    title: "Nested microtasks",
    code: ex2Code,
    steps: ex2Steps,
    expectedOutput: ["C", "A", "B"],
  },
  {
    id: "async-await",
    title: "async / await",
    code: ex3Code,
    steps: ex3Steps,
    expectedOutput: ["1", "3", "2"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((e) => e.id === id);
}
