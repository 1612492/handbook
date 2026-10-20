import { makeContainers, type Example, type Step } from "./model";

const CONTAINERS = ["attribute", "property", "reflected", "live"] as const;

function c(entries: Partial<Record<(typeof CONTAINERS)[number], string[]>>) {
  return makeContainers(CONTAINERS, entries);
}

const valueCode = `<input id="field" type="text" value="Hello" />

<script>
  const field = document.querySelector('#field');
  field.value = 'Hello World!';

  console.log(field.getAttribute('value')); // "Hello"
  console.log(field.value);                 // "Hello World!"
</script>`;

const valueSteps: Step[] = [
  {
    id: "d3-1",
    activeLine: 1,
    narration:
      'The parser stores value="Hello" as an attribute on the element.',
    containers: c({ attribute: ["value = 'Hello'"] }),
    focus: "attribute",
  },
  {
    id: "d3-2",
    activeLine: 5,
    narration:
      "The initial attribute value is reflected onto the idl property, so the property starts as 'Hello' too.",
    containers: c({
      attribute: ["value = 'Hello'"],
      property: ["value = 'Hello'"],
      reflected: ["value attribute ↔ value property"],
    }),
    focus: "reflected",
  },
  {
    id: "d3-3",
    activeLine: 6,
    narration:
      "Assigning to `field.value` changes the property. The attribute is not touched, because value is not a reflected attribute.",
    containers: c({
      attribute: ["value = 'Hello'"],
      property: ["value = 'Hello World!'"],
      reflected: ["value attribute ↔ value property"],
    }),
    focus: "property",
  },
  {
    id: "d3-4",
    activeLine: 8,
    narration:
      "getAttribute still returns the original attribute value, unchanged.",
    containers: c({ attribute: ["value = 'Hello'"] }),
    outputAppend: "Hello",
    focus: "attribute",
  },
  {
    id: "d3-5",
    activeLine: 9,
    narration:
      "Reading the property returns the live value, which is what the user currently sees in the field.",
    containers: c({ live: ["value = 'Hello World!'"] }),
    outputAppend: "Hello World!",
    focus: "live",
  },
];

const classCode = `<div id="box" class="card">Box</div>

<script>
  const box = document.querySelector('#box');
  box.classList.add('selected');

  console.log(box.className);          // "card selected"
  console.log(box.getAttribute('class')); // "card selected"
</script>`;

const classSteps: Step[] = [
  {
    id: "d4-1",
    activeLine: 1,
    narration: "The class attribute is parsed into the markup.",
    containers: c({ attribute: ["class = 'card'"] }),
    focus: "attribute",
  },
  {
    id: "d4-2",
    activeLine: 5,
    narration:
      "class is a reflected attribute, so the attribute and the className property stay in sync.",
    containers: c({
      attribute: ["class = 'card'"],
      property: ["className = 'card'"],
      reflected: ["class attribute ↔ className"],
    }),
    focus: "reflected",
  },
  {
    id: "d4-3",
    activeLine: 6,
    narration:
      "classList.add('selected') writes through to the attribute as well, because the attribute reflects the property.",
    containers: c({
      attribute: ["class = 'card selected'"],
      property: ["className = 'card selected'"],
      reflected: ["class attribute ↔ className"],
    }),
    focus: "attribute",
  },
  {
    id: "d4-4",
    activeLine: 8,
    narration:
      "Both readings agree, because the attribute reflects the property in this direction.",
    containers: c({
      live: ["className = 'card selected'"],
      reflected: ["class attribute ↔ className"],
    }),
    outputAppend: "card selected",
    focus: "live",
  },
];

export const examples: Example[] = [
  {
    id: "input-value",
    title: "Input value",
    code: valueCode,
    steps: valueSteps,
    expectedOutput: ["Hello", "Hello World!"],
  },
  {
    id: "class-attribute",
    title: "class attribute",
    code: classCode,
    steps: classSteps,
    expectedOutput: ["card selected"],
  },
];

export function getExample(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}
