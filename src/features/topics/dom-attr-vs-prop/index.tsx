import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  attribute: {
    label: "Attribute",
    className: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    dotClassName: "bg-amber-500",
  },
  property: {
    label: "Property",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
  reflected: {
    label: "Reflection",
    className: "border-violet-500/40 bg-violet-500/5 dark:bg-violet-500/10",
    dotClassName: "bg-violet-500",
  },
  live: {
    label: "Live value",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
};

export const domAttrVsPropTopic = defineStepTopic<ContainerId>(
  {
    id: "dom-attr-vs-prop",
    category: "html",
    title: "Attributes vs Properties",
    description:
      "Compare HTML attributes with DOM properties and see which ones reflect.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "Attributes vs Properties Visualizer",
    subtitle:
      "See which values live in the markup, which live on the element, and which mirror each other.",
    outputLabel: "Read value",
    quizPrompt: "Predict: which surface holds the next value?",
    footer: {
      title: "Attribute or property?",
      body: (
        <>
          <p>
            Attributes live in the HTML markup. Properties live on the DOM
            element object. They often start with the same value, but only some
            attributes are reflected in both directions.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Reflected attributes:</strong> class, id, and similar
              values stay in sync between the attribute and the property.
            </li>
            <li>
              <strong>Non-reflected:</strong> the value of an input keeps the
              original attribute while the property tracks what the user typed.
            </li>
            <li>
              <strong>Property-only:</strong> things like <code>value</code> on
              a div exist only as properties, with no attribute of the same
              name.
            </li>
          </ul>
        </>
      ),
    },
  },
);
