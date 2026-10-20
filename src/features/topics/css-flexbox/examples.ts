import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = ["main", "cross", "grow", "shrink"] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const growCode = `.container {
  display: flex;
}

.item-a { flex: 1; }
.item-b { flex: 2; }`;

const growSteps: Step[] = [
  {
    id: "fx1-1",
    activeLine: 2,
    narration:
      "display: flex turns the container into a flex container and puts the items on the main axis.",
    containers: c({ main: ["item-a", "item-b"] }),
    outputAppend: "2 items",
    focus: "main",
  },
  {
    id: "fx1-2",
    activeLine: 6,
    narration:
      "flex: 1 and flex: 2 set flex-grow to 1 and 2, so the free space is split in that ratio.",
    containers: c({
      main: ["item-a", "item-b"],
      grow: ["item-a: grow 1", "item-b: grow 2"],
    }),
    outputAppend: "item-b gets 2x",
    focus: "grow",
  },
  {
    id: "fx1-3",
    activeLine: 2,
    narration:
      "The cross axis handles height. The default align-items: stretch makes the items fill the container height.",
    containers: c({
      main: ["item-a", "item-b"],
      grow: ["item-a: grow 1", "item-b: grow 2"],
      cross: ["align-items: stretch"],
    }),
    focus: "cross",
  },
];

const shrinkCode = `.container {
  display: flex;
  width: 300px;
}

.item-a { flex: 0 1 200px; }
.item-b { flex: 0 1 200px; }`;

const shrinkSteps: Step[] = [
  {
    id: "fx2-1",
    activeLine: 6,
    narration:
      "flex-basis sets the starting main size of each item: 200px each, 400px in a 300px container.",
    containers: c({ main: ["item-a: 200px", "item-b: 200px"] }),
    outputAppend: "400px",
    focus: "main",
  },
  {
    id: "fx2-2",
    activeLine: 6,
    narration:
      "The items overflow, so flex-shrink of 1 lets both of them shrink until they fit.",
    containers: c({
      main: ["item-a: 200px", "item-b: 200px"],
      shrink: ["item-a: shrink 1", "item-b: shrink 1"],
    }),
    outputAppend: "fits 300px",
    focus: "shrink",
  },
  {
    id: "fx2-3",
    activeLine: 2,
    narration:
      "On the cross axis the items stretch to the container height by default.",
    containers: c({
      main: ["item-a: 200px", "item-b: 200px"],
      shrink: ["item-a: shrink 1", "item-b: shrink 1"],
      cross: ["align-items: stretch"],
    }),
    focus: "cross",
  },
];

export const examples: Example[] = [
  {
    id: "flex-grow",
    title: "flex-grow",
    code: growCode,
    steps: growSteps,
    expectedOutput: ["2 items", "item-b gets 2x"],
  },
  {
    id: "flex-shrink",
    title: "flex-basis and shrink",
    code: shrinkCode,
    steps: shrinkSteps,
    expectedOutput: ["400px", "fits 300px"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
