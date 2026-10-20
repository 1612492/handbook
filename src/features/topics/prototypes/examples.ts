import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = [
  "instance",
  "prototype",
  "objectPrototype",
  "endOfChain",
] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const lookupCode = `function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return this.name + ' makes a sound';
};

const dog = new Animal('Rex');
dog.speak();`;

const lookupSteps: Step[] = [
  {
    id: "p1-1",
    activeLine: 8,
    narration:
      "`new Animal('Rex')` creates a fresh object and copies the own property `name` onto it.",
    containers: c({ instance: ["dog.name = 'Rex'"] }),
    outputAppend: "Rex",
    focus: "instance",
  },
  {
    id: "p1-2",
    activeLine: 9,
    narration:
      "Looking up `dog.speak` fails on the instance, so the engine walks up to the prototype.",
    containers: c({
      instance: ["dog.name = 'Rex'"],
      prototype: ["Animal.prototype.speak"],
    }),
    focus: "prototype",
  },
  {
    id: "p1-3",
    activeLine: 9,
    narration:
      "The method is found on the prototype, but it still runs with `this` bound to the instance.",
    containers: c({
      instance: ["dog.name = 'Rex'", "this = dog"],
      prototype: ["Animal.prototype.speak"],
    }),
    outputAppend: "Rex makes a sound",
    focus: "instance",
  },
];

const delegateCode = `const base = { greet() { return 'hi'; } };
const obj = Object.create(base);
obj.greet();`;

const delegateSteps: Step[] = [
  {
    id: "p2-1",
    activeLine: 1,
    narration:
      "`base` is a plain object, so its prototype is Object.prototype.",
    containers: c({ objectPrototype: ["Object.prototype"] }),
    focus: "objectPrototype",
  },
  {
    id: "p2-2",
    activeLine: 2,
    narration:
      "Object.create(base) creates `obj` with no own properties, but with `base` as its prototype.",
    containers: c({
      instance: ["obj (no own properties)"],
      objectPrototype: ["Object.prototype"],
    }),
    focus: "instance",
  },
  {
    id: "p2-3",
    activeLine: 3,
    narration:
      "`obj.greet` is not an own property, so the lookup continues along the chain and finds it on `base`.",
    containers: c({
      instance: ["obj (no own properties)"],
      prototype: ["base.greet"],
      objectPrototype: ["Object.prototype"],
    }),
    focus: "prototype",
  },
  {
    id: "p2-4",
    activeLine: 3,
    narration:
      "The inherited method runs and returns its value. This is delegation, not copying.",
    containers: c({
      instance: ["obj (no own properties)"],
      prototype: ["base.greet"],
      objectPrototype: ["Object.prototype"],
    }),
    outputAppend: "hi",
    focus: "prototype",
  },
];

export const examples: Example[] = [
  {
    id: "prototype-lookup",
    title: "Prototype lookup",
    code: lookupCode,
    steps: lookupSteps,
    expectedOutput: ["Rex", "Rex makes a sound"],
  },
  {
    id: "object-create-delegation",
    title: "Object.create delegation",
    code: delegateCode,
    steps: delegateSteps,
    expectedOutput: ["hi"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
