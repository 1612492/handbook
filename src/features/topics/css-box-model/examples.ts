import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = ["content", "padding", "border", "margin"] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const contentBoxCode = `.box {
  width: 200px;
  height: 100px;
  padding: 10px;
  border: 5px solid black;
  margin: 20px;
}`;

const contentBoxSteps: Step[] = [
  {
    id: "bm1-1",
    activeLine: 2,
    narration:
      "The width and height describe the content box only, because the default box-sizing is content-box.",
    containers: c({ content: ["width: 200px", "height: 100px"] }),
    outputAppend: "content 200 x 100",
    focus: "content",
  },
  {
    id: "bm1-2",
    activeLine: 4,
    narration:
      "Padding is added outside the content box: 10px on every side, so 20px extra width.",
    containers: c({
      content: ["width: 200px", "height: 100px"],
      padding: ["padding: 10px"],
    }),
    outputAppend: "+20px",
    focus: "padding",
  },
  {
    id: "bm1-3",
    activeLine: 5,
    narration: "The border adds another 5px on each side, 10px more width.",
    containers: c({
      content: ["width: 200px", "height: 100px"],
      padding: ["padding: 10px"],
      border: ["border: 5px"],
    }),
    outputAppend: "+10px",
    focus: "border",
  },
  {
    id: "bm1-4",
    activeLine: 6,
    narration:
      "Margin sits outside the border and adds 20px per side, 40px to the total width.",
    containers: c({
      content: ["width: 200px", "height: 100px"],
      padding: ["padding: 10px"],
      border: ["border: 5px"],
      margin: ["margin: 20px"],
    }),
    outputAppend: "+40px",
    focus: "margin",
  },
  {
    id: "bm1-5",
    activeLine: 2,
    narration:
      "The border box is 200 + 20 + 10 = 230px wide. The margin box is 230 + 40 = 270px.",
    containers: c({
      content: ["width: 200px", "border box = 230px"],
      padding: ["padding: 10px"],
      border: ["border: 5px"],
      margin: ["margin: 20px"],
    }),
    outputAppend: "230px",
    focus: "content",
  },
];

const borderBoxCode = `.box {
  box-sizing: border-box;
  width: 200px;
  padding: 10px;
  border: 5px solid black;
}`;

const borderBoxSteps: Step[] = [
  {
    id: "bm2-1",
    activeLine: 2,
    narration:
      "With box-sizing: border-box the declared width includes padding and border.",
    containers: c({ content: ["box-sizing: border-box"] }),
    outputAppend: "border-box",
    focus: "content",
  },
  {
    id: "bm2-2",
    activeLine: 3,
    narration:
      "width: 200px is now the total border box, not just the content area.",
    containers: c({
      content: ["box-sizing: border-box", "width: 200px (total)"],
    }),
    outputAppend: "200px",
    focus: "content",
  },
  {
    id: "bm2-3",
    activeLine: 4,
    narration: "Padding is still 10px on each side, taken out of the total.",
    containers: c({
      content: ["box-sizing: border-box", "width: 200px (total)"],
      padding: ["padding: 10px"],
    }),
    focus: "padding",
  },
  {
    id: "bm2-4",
    activeLine: 5,
    narration: "The 5px border is also inside the total.",
    containers: c({
      content: ["box-sizing: border-box", "width: 200px (total)"],
      padding: ["padding: 10px"],
      border: ["border: 5px"],
    }),
    focus: "border",
  },
  {
    id: "bm2-5",
    activeLine: 3,
    narration:
      "The content area shrinks to 200 - 20 - 10 = 170px, so the element still occupies 200px in total.",
    containers: c({
      content: ["box-sizing: border-box", "content width = 170px"],
      padding: ["padding: 10px"],
      border: ["border: 5px"],
    }),
    outputAppend: "170px",
    focus: "content",
  },
];

export const examples: Example[] = [
  {
    id: "content-box",
    title: "content-box",
    code: contentBoxCode,
    steps: contentBoxSteps,
    expectedOutput: ["content 200 x 100", "+20px", "+10px", "+40px", "230px"],
  },
  {
    id: "border-box",
    title: "border-box",
    code: borderBoxCode,
    steps: borderBoxSteps,
    expectedOutput: ["border-box", "200px", "170px"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
