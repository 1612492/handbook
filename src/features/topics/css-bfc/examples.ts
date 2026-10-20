import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = ["flow", "float", "bfc", "cleared"] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const floatCode = `.parent {
  /* no overflow, no display: flow-root */
}

.float-left {
  float: left;
  width: 120px;
  height: 60px;
}

.content {
  margin-top: 10px;
}`;

const floatSteps: Step[] = [
  {
    id: "bf1-1",
    activeLine: 8,
    narration:
      "The content block is laid out in the normal flow, taking the full width of the parent.",
    containers: c({ flow: ["content in normal flow"] }),
    focus: "flow",
  },
  {
    id: "bf1-2",
    activeLine: 4,
    narration:
      "A floated element is taken out of the normal flow, so the content flows around it instead.",
    containers: c({
      flow: ["content in normal flow"],
      float: ["float: left"],
    }),
    outputAppend: "float",
    focus: "float",
  },
  {
    id: "bf1-3",
    activeLine: 1,
    narration:
      "Because the float is out of flow, the parent has no in-flow content and its height collapses.",
    containers: c({
      flow: ["content in normal flow", "parent height collapses"],
      float: ["float: left"],
    }),
    outputAppend: "height 0",
    focus: "flow",
  },
  {
    id: "bf1-4",
    activeLine: 2,
    narration:
      "Adding overflow: hidden establishes a block formatting context, so the parent contains the float again.",
    containers: c({
      flow: ["content in normal flow"],
      float: ["float: left"],
      bfc: ["overflow: hidden"],
    }),
    outputAppend: "contained",
    focus: "bfc",
  },
  {
    id: "bf1-5",
    activeLine: 8,
    narration:
      "Alternatively, clear: both on the content pushes it below the float without changing the parent.",
    containers: c({
      flow: ["content in normal flow"],
      float: ["float: left"],
      bfc: ["overflow: hidden"],
      cleared: ["clear: both"],
    }),
    focus: "cleared",
  },
];

const collapsingCode = `.parent {
  overflow: hidden;
}

.child {
  margin-top: 20px;
}

.sibling {
  margin-top: 30px;
}`;

const collapsingSteps: Step[] = [
  {
    id: "bf2-1",
    activeLine: 5,
    narration:
      "Without a block formatting context the child's top margin collapses with the parent's, so the gap is only 20px.",
    containers: c({
      flow: ["child margin-top: 20px", "sibling margin-top: 30px"],
    }),
    outputAppend: "20px gap",
    focus: "flow",
  },
  {
    id: "bf2-2",
    activeLine: 2,
    narration:
      "overflow: hidden creates a block formatting context, which stops the margins from collapsing through the parent.",
    containers: c({
      flow: ["child margin-top: 20px", "sibling margin-top: 30px"],
      bfc: ["overflow: hidden"],
    }),
    outputAppend: "50px gap",
    focus: "bfc",
  },
];

export const examples: Example[] = [
  {
    id: "float-escapes-parent",
    title: "Float escapes its parent",
    code: floatCode,
    steps: floatSteps,
    expectedOutput: ["float", "height 0", "contained"],
  },
  {
    id: "margin-collapsing",
    title: "Margin collapsing",
    code: collapsingCode,
    steps: collapsingSteps,
    expectedOutput: ["20px gap", "50px gap"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
