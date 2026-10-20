import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = ["rows", "columns", "placement", "areas"] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const tracksCode = `.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px 100px;
}

.item {
  grid-column: 2;
  grid-row: 1;
}`;

const tracksSteps: Step[] = [
  {
    id: "gr1-1",
    activeLine: 3,
    narration:
      "grid-template-columns defines two equal columns that share the free space.",
    containers: c({ columns: ["1fr 1fr"] }),
    outputAppend: "2 columns",
    focus: "columns",
  },
  {
    id: "gr1-2",
    activeLine: 4,
    narration: "grid-template-rows defines two explicit rows of 100px each.",
    containers: c({
      columns: ["1fr 1fr"],
      rows: ["100px 100px"],
    }),
    outputAppend: "2 rows",
    focus: "rows",
  },
  {
    id: "gr1-3",
    activeLine: 9,
    narration:
      "The item is placed explicitly: it starts in column 2 and row 1.",
    containers: c({
      columns: ["1fr 1fr"],
      rows: ["100px 100px"],
      placement: ["column 2, row 1"],
    }),
    outputAppend: "column 2, row 1",
    focus: "placement",
  },
];

const areasCode = `.grid {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
}`;

const areasSteps: Step[] = [
  {
    id: "gr2-1",
    activeLine: 3,
    narration:
      "grid-template-areas names the regions of the grid, and the strings define the shape.",
    containers: c({ areas: ["header header", "sidebar main"] }),
    outputAppend: "3 areas",
    focus: "areas",
  },
  {
    id: "gr2-2",
    activeLine: 3,
    narration:
      "Each area string creates a row, so the grid has two implicit rows of auto height.",
    containers: c({
      areas: ["header header", "sidebar main"],
      rows: ["auto", "auto"],
    }),
    focus: "rows",
  },
  {
    id: "gr2-3",
    activeLine: 3,
    narration:
      "The columns are also implicit here, sized by the content of the widest row.",
    containers: c({
      areas: ["header header", "sidebar main"],
      rows: ["auto", "auto"],
      columns: ["auto", "auto"],
    }),
    focus: "columns",
  },
];

export const examples: Example[] = [
  {
    id: "explicit-tracks",
    title: "Explicit tracks",
    code: tracksCode,
    steps: tracksSteps,
    expectedOutput: ["2 columns", "2 rows", "column 2, row 1"],
  },
  {
    id: "template-areas",
    title: "Template areas",
    code: areasCode,
    steps: areasSteps,
    expectedOutput: ["3 areas"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
