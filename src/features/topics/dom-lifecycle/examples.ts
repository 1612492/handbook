import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = [
  "parsing",
  "domContentLoaded",
  "loadEvent",
  "readyState",
] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const loadCode = `<html>
  <head>
    <script src="app.js"></script>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <img src="hero.png" />
    <script>
      document.addEventListener('DOMContentLoaded', () => console.log('DOM ready'));
      window.addEventListener('load', () => console.log('window load'));
    </script>
  </body>
</html>`;

const loadSteps: Step[] = [
  {
    id: "d1-1",
    activeLine: 1,
    narration:
      "The parser starts reading the document from the top. Blocking scripts pause it while they execute.",
    containers: c({ parsing: ["<html>", "<head>", "<script src=app.js>"] }),
    focus: "parsing",
  },
  {
    id: "d1-2",
    activeLine: 11,
    narration:
      "The parser reaches the end of the body. The DOM is complete, but subresources such as the image are still loading.",
    containers: c({
      parsing: ["<body>", "<img src=hero.png>"],
      readyState: ["interactive"],
    }),
    focus: "readyState",
  },
  {
    id: "d1-3",
    activeLine: 12,
    narration:
      "DOMContentLoaded fires as soon as the document is parsed and deferred scripts have run. The DOM is ready to be queried.",
    containers: c({ domContentLoaded: ["DOMContentLoaded"] }),
    outputAppend: "DOM ready",
    focus: "domContentLoaded",
  },
  {
    id: "d1-4",
    activeLine: 13,
    narration:
      "The browser waits for the remaining resources, such as hero.png, before firing load.",
    containers: c({
      readyState: ["interactive"],
      parsing: ["waiting for hero.png"],
    }),
    focus: "parsing",
  },
  {
    id: "d1-5",
    activeLine: 13,
    narration:
      "Everything has loaded, so the load event fires and readyState becomes complete.",
    containers: c({ loadEvent: ["load"], readyState: ["complete"] }),
    outputAppend: "window load",
    focus: "loadEvent",
  },
];

const readyStateCode = `document.readyState;
// 'loading' while the document is still parsing
// 'interactive' once the DOM is parsed
// 'complete' after all resources load`;

const readyStateSteps: Step[] = [
  {
    id: "d2-1",
    activeLine: 1,
    narration:
      "While the document is still being parsed, readyState is 'loading'.",
    containers: c({ parsing: ["parsing"], readyState: ["loading"] }),
    focus: "readyState",
  },
  {
    id: "d2-2",
    activeLine: 2,
    narration:
      "Once parsing is finished the state becomes 'interactive' and DOMContentLoaded fires.",
    containers: c({
      domContentLoaded: ["DOMContentLoaded"],
      readyState: ["interactive"],
    }),
    focus: "domContentLoaded",
  },
  {
    id: "d2-3",
    activeLine: 3,
    narration:
      "After every subresource has loaded, the state becomes 'complete' and the load event fires.",
    containers: c({ loadEvent: ["load"], readyState: ["complete"] }),
    focus: "loadEvent",
  },
];

export const examples: Example[] = [
  {
    id: "dom-content-loaded-vs-load",
    title: "DOMContentLoaded vs load",
    code: loadCode,
    steps: loadSteps,
    expectedOutput: ["DOM ready", "window load"],
  },
  {
    id: "ready-state",
    title: "document.readyState",
    code: readyStateCode,
    steps: readyStateSteps,
    expectedOutput: [],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
