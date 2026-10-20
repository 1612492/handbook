import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = ["inline", "id", "class", "type"] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const idBeatsClassCode = `#header { color: red; }
.header { color: blue; }
div { color: green; }`;

const idBeatsClassSteps: Step[] = [
  {
    id: "sp1-1",
    activeLine: 3,
    narration: "A type selector has the lowest specificity: 0,0,0,1.",
    containers: c({ type: ["div → 0,0,0,1"] }),
    outputAppend: "0,0,0,1",
    focus: "type",
  },
  {
    id: "sp1-2",
    activeLine: 2,
    narration: "A class selector adds one to the third column: 0,0,1,0.",
    containers: c({
      type: ["div → 0,0,0,1"],
      class: [".header → 0,0,1,0"],
    }),
    outputAppend: "0,0,1,0",
    focus: "class",
  },
  {
    id: "sp1-3",
    activeLine: 1,
    narration:
      "An id selector fills the second column: 1,0,0,0. The columns are compared left to right, so this wins.",
    containers: c({
      type: ["div → 0,0,0,1"],
      class: [".header → 0,0,1,0"],
      id: ["#header → 1,0,0,0"],
    }),
    outputAppend: "1,0,0,0",
    focus: "id",
  },
];

const inlineWinsCode = `<p id="intro" class="lead">Text</p>

<style>
  #intro { color: red; }
  p { color: blue; }
</style>

<script>
  intro.style.color = 'green';
</script>`;

const inlineWinsSteps: Step[] = [
  {
    id: "sp2-1",
    activeLine: 4,
    narration: "The type selector scores 0,0,0,1.",
    containers: c({ type: ["p → 0,0,0,1"] }),
    focus: "type",
  },
  {
    id: "sp2-2",
    activeLine: 3,
    narration: "The id selector scores 1,0,0,0 and beats the type selector.",
    containers: c({
      type: ["p → 0,0,0,1"],
      id: ["#intro → 1,0,0,0"],
    }),
    focus: "id",
  },
  {
    id: "sp2-3",
    activeLine: 9,
    narration:
      "An inline style fills the first column, so it beats every selector in the stylesheet.",
    containers: c({
      type: ["p → 0,0,0,1"],
      id: ["#intro → 1,0,0,0"],
      inline: ["style='color: green' → 1,0,0,0"],
    }),
    outputAppend: "inline wins",
    focus: "inline",
  },
];

export const examples: Example[] = [
  {
    id: "id-beats-class",
    title: "ID beats class",
    code: idBeatsClassCode,
    steps: idBeatsClassSteps,
    expectedOutput: ["0,0,0,1", "0,0,1,0", "1,0,0,0"],
  },
  {
    id: "inline-wins",
    title: "Inline style wins",
    code: inlineWinsCode,
    steps: inlineWinsSteps,
    expectedOutput: ["inline wins"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
