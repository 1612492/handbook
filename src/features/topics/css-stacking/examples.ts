import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = ["context", "zIndex", "paint", "composited"] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const zIndexCode = `.card {
  position: relative;
  z-index: 1;
}

.overlay {
  position: absolute;
  z-index: 10;
}`;

const zIndexSteps: Step[] = [
  {
    id: "st1-1",
    activeLine: 1,
    narration:
      "Both elements are positioned and belong to the same stacking context, the root one.",
    containers: c({ context: ["root stacking context"] }),
    outputAppend: "1 context",
    focus: "context",
  },
  {
    id: "st1-2",
    activeLine: 3,
    narration:
      "z-index only applies to positioned elements. The card gets 1 and the overlay gets 10.",
    containers: c({
      context: ["root stacking context"],
      zIndex: ["card: z-index 1", "overlay: z-index 10"],
    }),
    outputAppend: "10 > 1",
    focus: "zIndex",
  },
  {
    id: "st1-3",
    activeLine: 7,
    narration:
      "The overlay paints above the card, because the higher z-index wins inside the same context.",
    containers: c({
      context: ["root stacking context"],
      zIndex: ["card: z-index 1", "overlay: z-index 10"],
      paint: ["overlay paints above card"],
    }),
    outputAppend: "overlay on top",
    focus: "paint",
  },
];

const transformCode = `.wrapper {
  transform: translateZ(0);
}

.child {
  position: relative;
  z-index: 9999;
}`;

const transformSteps: Step[] = [
  {
    id: "st2-1",
    activeLine: 2,
    narration:
      "A transform creates a new stacking context, so the wrapper becomes its own context.",
    containers: c({ context: ["wrapper: new stacking context"] }),
    outputAppend: "new context",
    focus: "context",
  },
  {
    id: "st2-2",
    activeLine: 7,
    narration:
      "The child's z-index is now trapped inside the wrapper's context, so it cannot rise above it.",
    containers: c({
      context: ["wrapper: new stacking context"],
      zIndex: ["child: z-index 9999 (trapped)"],
    }),
    outputAppend: "trapped",
    focus: "zIndex",
  },
  {
    id: "st2-3",
    activeLine: 2,
    narration:
      "The transformed wrapper is promoted to its own compositing layer, which is why it can overlap content that paints later.",
    containers: c({
      context: ["wrapper: new stacking context"],
      zIndex: ["child: z-index 9999 (trapped)"],
      composited: ["wrapper composited"],
    }),
    focus: "composited",
  },
];

export const examples: Example[] = [
  {
    id: "z-index-in-context",
    title: "z-index in a context",
    code: zIndexCode,
    steps: zIndexSteps,
    expectedOutput: ["1 context", "10 > 1", "overlay on top"],
  },
  {
    id: "transform-creates-context",
    title: "transform creates a context",
    code: transformCode,
    steps: transformSteps,
    expectedOutput: ["new context", "trapped"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
