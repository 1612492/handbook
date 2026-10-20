import type { Example, Step, StepContainers } from "./model";

function c(
  global: string[] = [],
  implicit: string[] = [],
  explicit: string[] = [],
  newInstance: string[] = [],
  lexical: string[] = [],
): StepContainers {
  const mk = (ids: string[]) => ids.map((id) => ({ id, label: id }));
  return {
    global: mk(global),
    implicit: mk(implicit),
    explicit: mk(explicit),
    newInstance: mk(newInstance),
    lexical: mk(lexical),
  };
}

const THIS = "this";

// ---------------------------------------------------------------------------
// Example 1: Default binding  -> global
// ---------------------------------------------------------------------------
const ex1Code = `function show() {
  console.log(this);
}
show();`;

const ex1Steps: Step[] = [
  {
    id: "d-1",
    activeLine: 4,
    narration:
      "show() is invoked as a standalone function (no base object), so default binding applies.",
    containers: c(),
    focus: "none",
  },
  {
    id: "d-2",
    activeLine: 2,
    narration:
      "Default binding: `this` is the global object in non-strict mode (and `undefined` in strict mode).",
    containers: c([THIS]),
    outputAppend: "global",
    focus: "global",
  },
];

// ---------------------------------------------------------------------------
// Example 2: Implicit binding  -> the base object
// ---------------------------------------------------------------------------
const ex2Code = `const obj = {
  name: "obj",
  show() { console.log(this.name); }
};
obj.show();`;

const ex2Steps: Step[] = [
  {
    id: "i-1",
    activeLine: 5,
    narration:
      "obj.show() is called with `obj` as the base object, so implicit binding applies.",
    containers: c(),
    focus: "none",
  },
  {
    id: "i-2",
    activeLine: 3,
    narration:
      "Implicit binding: `this` is the object to the left of the dot (`obj`).",
    containers: c([], [THIS]),
    outputAppend: "obj",
    focus: "implicit",
  },
];

// ---------------------------------------------------------------------------
// Example 3: Explicit binding (call/apply/bind)  -> the bound target
// ---------------------------------------------------------------------------
const ex3Code = `function show() { console.log(this.name); }
const target = { name: "bound" };
show.call(target);`;

const ex3Steps: Step[] = [
  {
    id: "e-1",
    activeLine: 3,
    narration:
      "show.call(target) explicitly sets `this` to `target`, so explicit binding applies.",
    containers: c(),
    focus: "none",
  },
  {
    id: "e-2",
    activeLine: 1,
    narration:
      "Explicit binding: `this` is the object passed to call/apply (or permanently bound via bind).",
    containers: c([], [], [THIS]),
    outputAppend: "bound",
    focus: "explicit",
  },
];

// ---------------------------------------------------------------------------
// Example 4: bind persists  -> explicit target on later call
// ---------------------------------------------------------------------------
const ex4Code = `function show() { console.log(this.name); }
const target = { name: "bound" };
const bound = show.bind(target);
bound();`;

const ex4Steps: Step[] = [
  {
    id: "b-1",
    activeLine: 3,
    narration:
      "show.bind(target) creates a new function with `this` permanently set to `target`.",
    containers: c(),
    focus: "none",
  },
  {
    id: "b-2",
    activeLine: 4,
    narration:
      "Calling bound() ignores its own call site; explicit binding (bind) still wins.",
    containers: c([], [], [THIS]),
    outputAppend: "bound",
    focus: "explicit",
  },
];

// ---------------------------------------------------------------------------
// Example 5: new binding  -> the new instance
// ---------------------------------------------------------------------------
const ex5Code = `function Person(name) {
  this.name = name;
  console.log(this.name);
}
const p = new Person("Ada");`;

const ex5Steps: Step[] = [
  {
    id: "n-1",
    activeLine: 5,
    narration:
      "`new Person(...)` creates a fresh object and calls Person with `this` bound to it.",
    containers: c(),
    focus: "none",
  },
  {
    id: "n-2",
    activeLine: 2,
    narration:
      "Inside the constructor, `this` is the new instance, so `this.name = name` sets the instance property.",
    containers: c([], [], [], [THIS]),
    focus: "newInstance",
  },
  {
    id: "n-3",
    activeLine: 3,
    narration: "New binding: `this` is the newly created instance.",
    containers: c([], [], [], [THIS]),
    outputAppend: "Ada",
    focus: "newInstance",
  },
];

// ---------------------------------------------------------------------------
// Example 6: Arrow / lexical binding  -> enclosing lexical this
// ---------------------------------------------------------------------------
const ex6Code = `const obj = {
  name: "obj",
  show: () => console.log(this && this.name)
};
obj.show();`;

const ex6Steps: Step[] = [
  {
    id: "a-1",
    activeLine: 5,
    narration: "obj.show() calls an arrow function; arrows have no own `this`.",
    containers: c(),
    focus: "none",
  },
  {
    id: "a-2",
    activeLine: 3,
    narration:
      "Lexical binding: the arrow inherits `this` from its enclosing (lexical) scope, not from the call site, so `obj` is ignored.",
    containers: c([], [], [], [], [THIS]),
    outputAppend: "undefined",
    focus: "lexical",
  },
];

// ---------------------------------------------------------------------------
// Example 7: Precedence — new overrides explicit (bind)
// ---------------------------------------------------------------------------
const ex7Code = `function Foo() {
  this.x = "instance";
  console.log(this.x);
}
const o = { x: "bound" };
const bound = Foo.bind(o);
new bound();`;

const ex7Steps: Step[] = [
  {
    id: "p-1",
    activeLine: 7,
    narration:
      "`new bound()` invokes a bound function with `new`; new binding has higher precedence than explicit (bind).",
    containers: c(),
    focus: "none",
  },
  {
    id: "p-2",
    activeLine: 2,
    narration:
      "New binding wins: `this` is the new instance, not the bound `o`.",
    containers: c([], [], [], [THIS]),
    focus: "newInstance",
  },
  {
    id: "p-3",
    activeLine: 3,
    narration:
      "Precedence rule (new > explicit > implicit > default) makes `this.x` resolve to the instance's property.",
    containers: c([], [], [], [THIS]),
    outputAppend: "instance",
    focus: "newInstance",
  },
];

// ---------------------------------------------------------------------------
// Example 8: Detached method loses implicit binding
// ---------------------------------------------------------------------------
const ex8Code = `const obj = {
  name: "obj",
  show() { console.log(this && this.name); }
};
const fn = obj.show;
fn();`;

const ex8Steps: Step[] = [
  {
    id: "t-1",
    activeLine: 5,
    narration:
      "Storing obj.show in `fn` detaches it from `obj`; calling fn() has no base object.",
    containers: c(),
    focus: "none",
  },
  {
    id: "t-2",
    activeLine: 3,
    narration:
      "Default binding applies (non-strict global / strict undefined): implicit binding is lost.",
    containers: c([THIS]),
    outputAppend: "undefined",
    focus: "global",
  },
];

export const examples: Example[] = [
  {
    id: "default-binding",
    title: "Default binding",
    code: ex1Code,
    steps: ex1Steps,
    expectedOutput: ["global"],
  },
  {
    id: "implicit-binding",
    title: "Implicit binding",
    code: ex2Code,
    steps: ex2Steps,
    expectedOutput: ["obj"],
  },
  {
    id: "explicit-binding",
    title: "Explicit binding (call/apply)",
    code: ex3Code,
    steps: ex3Steps,
    expectedOutput: ["bound"],
  },
  {
    id: "bind-persists",
    title: "bind persists",
    code: ex4Code,
    steps: ex4Steps,
    expectedOutput: ["bound"],
  },
  {
    id: "new-binding",
    title: "new binding",
    code: ex5Code,
    steps: ex5Steps,
    expectedOutput: ["Ada"],
  },
  {
    id: "arrow-lexical",
    title: "Arrow / lexical binding",
    code: ex6Code,
    steps: ex6Steps,
    expectedOutput: ["undefined"],
  },
  {
    id: "precedence-new-over-explicit",
    title: "Precedence: new over explicit",
    code: ex7Code,
    steps: ex7Steps,
    expectedOutput: ["instance"],
  },
  {
    id: "detached-method",
    title: "Detached method",
    code: ex8Code,
    steps: ex8Steps,
    expectedOutput: ["undefined"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((e) => e.id === id);
}
