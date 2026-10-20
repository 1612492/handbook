import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = [
  "global",
  "functionScope",
  "blockScope",
  "loopScope",
] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const varCode = `function f() {
  if (true) {
    var a = 1;
  }
  console.log(a);
}

f();`;

const varSteps: Step[] = [
  {
    id: "s1-1",
    activeLine: 1,
    narration: "f() is called and its function scope is created.",
    containers: c({ functionScope: ["f"] }),
    focus: "functionScope",
  },
  {
    id: "s1-2",
    activeLine: 3,
    narration:
      "`var a` is declared inside the if block, but var is function scoped, so `a` belongs to the function scope, not the block.",
    containers: c({ functionScope: ["f", "a = 1"] }),
    outputAppend: "a = 1",
    focus: "functionScope",
  },
  {
    id: "s1-3",
    activeLine: 5,
    narration:
      "console.log(a) still finds `a`, because the block boundary does not exist for var.",
    containers: c({ functionScope: ["f", "a = 1"] }),
    outputAppend: "1",
    focus: "functionScope",
  },
];

const letCode = `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i));
}`;

const letSteps: Step[] = [
  {
    id: "s2-1",
    activeLine: 1,
    narration:
      "The loop starts. `let` gives the loop its own scope, with a fresh binding per iteration.",
    containers: c({ loopScope: ["i = 0"] }),
    focus: "loopScope",
  },
  {
    id: "s2-2",
    activeLine: 1,
    narration:
      "Second iteration: a new copy of `i` is created for this round only.",
    containers: c({ loopScope: ["i = 0", "i = 1"] }),
    focus: "loopScope",
  },
  {
    id: "s2-3",
    activeLine: 1,
    narration:
      "Third iteration: another fresh binding. All three stay alive because the closures capture them.",
    containers: c({ loopScope: ["i = 0", "i = 1", "i = 2"] }),
    focus: "loopScope",
  },
  {
    id: "s2-4",
    activeLine: 2,
    narration:
      "The first timeout fires and prints the `i` captured by its own iteration.",
    containers: c({ loopScope: ["i = 0", "i = 1", "i = 2"] }),
    outputAppend: "0",
    focus: "loopScope",
  },
  {
    id: "s2-5",
    activeLine: 2,
    narration: "The second timeout prints its own captured value.",
    containers: c({ loopScope: ["i = 0", "i = 1", "i = 2"] }),
    outputAppend: "1",
    focus: "loopScope",
  },
  {
    id: "s2-6",
    activeLine: 2,
    narration:
      "The third timeout prints 2. With `var` there would be a single shared binding and every callback would print 3.",
    containers: c({ loopScope: ["i = 0", "i = 1", "i = 2"] }),
    outputAppend: "2",
    focus: "loopScope",
  },
];

export const examples: Example[] = [
  {
    id: "var-is-function-scoped",
    title: "var is function scoped",
    code: varCode,
    steps: varSteps,
    expectedOutput: ["a = 1", "1"],
  },
  {
    id: "let-per-iteration",
    title: "let per iteration",
    code: letCode,
    steps: letSteps,
    expectedOutput: ["0", "1", "2"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
