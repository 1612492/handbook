import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = ["pending", "fulfilled", "rejected", "microtask"] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const chainingCode = `Promise.resolve(1)
  .then((value) => value + 1)
  .then((value) => console.log(value));`;

const chainingSteps: Step[] = [
  {
    id: "pr1-1",
    activeLine: 1,
    narration:
      "Promise.resolve(1) creates a promise. It starts pending and is resolved with 1 right away.",
    containers: c({ pending: ["p1"] }),
    focus: "pending",
  },
  {
    id: "pr1-2",
    activeLine: 1,
    narration: "The promise settles as fulfilled with the value 1.",
    containers: c({ fulfilled: ["p1 = 1"] }),
    outputAppend: "1",
    focus: "fulfilled",
  },
  {
    id: "pr1-3",
    activeLine: 2,
    narration:
      "`.then` does not run the callback immediately. It schedules it as a microtask.",
    containers: c({ fulfilled: ["p1 = 1"], microtask: ["then#1"] }),
    focus: "microtask",
  },
  {
    id: "pr1-4",
    activeLine: 2,
    narration:
      "The microtask runs, returns 2, and that value fulfils the promise returned by `.then`.",
    containers: c({ fulfilled: ["p2 = 2"], microtask: ["then#1 (done)"] }),
    focus: "fulfilled",
  },
  {
    id: "pr1-5",
    activeLine: 3,
    narration:
      "The second `.then` schedules another microtask with the new value.",
    containers: c({ fulfilled: ["p2 = 2"], microtask: ["then#2"] }),
    focus: "microtask",
  },
  {
    id: "pr1-6",
    activeLine: 3,
    narration: "The second microtask runs and logs the value 2.",
    containers: c({ fulfilled: ["p2 = 2"], microtask: ["then#2 (done)"] }),
    outputAppend: "2",
    focus: "microtask",
  },
];

const rejectionCode = `Promise.reject(new Error('boom'))
  .catch((error) => console.log(error.message));`;

const rejectionSteps: Step[] = [
  {
    id: "pr2-1",
    activeLine: 1,
    narration:
      "Promise.reject creates a promise that settles immediately as rejected with the error.",
    containers: c({ rejected: ["p1 = Error('boom')"] }),
    focus: "rejected",
  },
  {
    id: "pr2-2",
    activeLine: 2,
    narration: "`.catch` schedules a rejection handler as a microtask.",
    containers: c({ rejected: ["p1 = Error('boom')"], microtask: ["catch"] }),
    focus: "microtask",
  },
  {
    id: "pr2-3",
    activeLine: 2,
    narration:
      "The handler runs and reads the rejection reason, so the error never becomes an unhandled rejection.",
    containers: c({ microtask: ["catch (done)"] }),
    outputAppend: "boom",
    focus: "microtask",
  },
];

export const examples: Example[] = [
  {
    id: "promise-chaining",
    title: "Promise chaining",
    code: chainingCode,
    steps: chainingSteps,
    expectedOutput: ["1", "2"],
  },
  {
    id: "error-propagation",
    title: "Error propagation",
    code: rejectionCode,
    steps: rejectionSteps,
    expectedOutput: ["boom"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
