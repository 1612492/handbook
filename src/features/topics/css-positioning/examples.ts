import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = ["static", "relative", "absolute", "fixed"] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const relativeCode = `.parent {
  position: relative;
  height: 120px;
}

.child-static {
  position: static;
  top: 20px;
}

.child-relative {
  position: relative;
  top: 20px;
  left: 20px;
}`;

const relativeSteps: Step[] = [
  {
    id: "po1-1",
    activeLine: 7,
    narration:
      "position: static is the default. top and left are ignored, so the element stays in the normal flow.",
    containers: c({ static: ["top: 20px (ignored)", "left: 20px (ignored)"] }),
    outputAppend: "static",
    focus: "static",
  },
  {
    id: "po1-2",
    activeLine: 12,
    narration:
      "position: relative offsets the element from its own position. The space it occupies in the flow is kept.",
    containers: c({
      static: ["top: 20px (ignored)"],
      relative: ["top: 20px", "left: 20px"],
    }),
    outputAppend: "relative",
    focus: "relative",
  },
];

const absoluteCode = `.parent {
  position: relative;
}

.child-absolute {
  position: absolute;
  top: 0;
  left: 0;
}

.child-fixed {
  position: fixed;
  top: 0;
  right: 0;
}`;

const absoluteSteps: Step[] = [
  {
    id: "po2-1",
    activeLine: 6,
    narration:
      "position: absolute removes the element from the flow and positions it against the nearest positioned ancestor.",
    containers: c({ absolute: ["top: 0", "left: 0"] }),
    outputAppend: "absolute",
    focus: "absolute",
  },
  {
    id: "po2-2",
    activeLine: 12,
    narration:
      "position: fixed positions against the viewport, so the element stays put while the page scrolls.",
    containers: c({
      absolute: ["top: 0", "left: 0"],
      fixed: ["top: 0", "right: 0"],
    }),
    outputAppend: "fixed",
    focus: "fixed",
  },
];

export const examples: Example[] = [
  {
    id: "static-vs-relative",
    title: "static vs relative",
    code: relativeCode,
    steps: relativeSteps,
    expectedOutput: ["static", "relative"],
  },
  {
    id: "absolute-vs-fixed",
    title: "absolute vs fixed",
    code: absoluteCode,
    steps: absoluteSteps,
    expectedOutput: ["absolute", "fixed"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
