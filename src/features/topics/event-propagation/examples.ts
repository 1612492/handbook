import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = ["capture", "target", "bubble", "document"] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const bubblingCode = `<ul id="list">
  <li id="item">Click</li>
</ul>

<script>
  item.addEventListener('click', onItem);
  list.addEventListener('click', onList);
  document.addEventListener('click', onDocument);
</script>`;

const bubblingSteps: Step[] = [
  {
    id: "e1-1",
    activeLine: 1,
    narration:
      "The click event starts at the window and travels down the tree: that is the capture phase.",
    containers: c({ capture: ["window → document → list → item"] }),
    focus: "capture",
  },
  {
    id: "e1-2",
    activeLine: 6,
    narration:
      "The event reaches its target, the `li`, and the listener on the target runs first.",
    containers: c({ target: ["item (target listener)"] }),
    focus: "target",
  },
  {
    id: "e1-3",
    activeLine: 7,
    narration:
      "The event now bubbles from the target up to its parent, where the list listener runs.",
    containers: c({ target: ["item"], bubble: ["list (bubble listener)"] }),
    focus: "bubble",
  },
  {
    id: "e1-4",
    activeLine: 8,
    narration:
      "Bubbling continues to the document, the last stop in this tree.",
    containers: c({ document: ["document (bubble listener)"] }),
    outputAppend: "document",
    focus: "document",
  },
];

const delegationCode = `<ul id="list">
  <li data-id="1">One</li>
  <li data-id="2">Two</li>
</ul>

<script>
  list.addEventListener('click', (event) => {
    console.log(event.target.dataset.id);
  });
</script>`;

const delegationSteps: Step[] = [
  {
    id: "e2-1",
    activeLine: 2,
    narration:
      "The second list item is clicked, so the event targets that `li`.",
    containers: c({ target: ["li[data-id=2]"] }),
    focus: "target",
  },
  {
    id: "e2-2",
    activeLine: 7,
    narration:
      "There is only one listener, on the list, so the event bubbles up to it.",
    containers: c({
      target: ["li[data-id=2]"],
      bubble: ["list (delegated handler)"],
    }),
    focus: "bubble",
  },
  {
    id: "e2-3",
    activeLine: 8,
    narration:
      "The handler reads `event.target`, which is still the `li`, so it can tell which item was clicked.",
    containers: c({
      bubble: ["list (delegated handler)", "event.target = li[data-id=2]"],
    }),
    outputAppend: "2",
    focus: "bubble",
  },
  {
    id: "e2-4",
    activeLine: 8,
    narration:
      "The event keeps bubbling to the document, but no other handler cares.",
    containers: c({ document: ["document"] }),
    focus: "document",
  },
];

export const examples: Example[] = [
  {
    id: "event-bubbling",
    title: "Event bubbling",
    code: bubblingCode,
    steps: bubblingSteps,
    expectedOutput: ["document"],
  },
  {
    id: "event-delegation",
    title: "Event delegation",
    code: delegationCode,
    steps: delegationSteps,
    expectedOutput: ["2"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
