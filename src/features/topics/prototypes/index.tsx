import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  instance: {
    label: "Instance (own properties)",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
  prototype: {
    label: "Prototype",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
  objectPrototype: {
    label: "Object.prototype",
    className: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    dotClassName: "bg-amber-500",
  },
  endOfChain: {
    label: "End of chain",
    className: "border-slate-500/40 bg-slate-500/5 dark:bg-slate-500/10",
    dotClassName: "bg-slate-500",
  },
};

export const prototypesTopic = defineStepTopic<ContainerId>(
  {
    id: "prototypes",
    category: "javascript",
    title: "Prototypal Inheritance",
    description:
      "Follow a property lookup as it walks the prototype chain from instance to end.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "Prototypes Visualizer",
    subtitle:
      "Watch property lookups travel from the instance up through the prototype chain.",
    outputLabel: "Resolved value",
    quizPrompt: "Predict: which link resolves the next property?",
    footer: {
      title: "How does prototypal inheritance work?",
      body: (
        <>
          <p>
            Every object has an internal <code>[[Prototype]]</code> link.
            Property access first looks at the object itself and then walks the
            chain until it finds the property or runs out of links. It is
            delegation, not copying.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>constructor:</strong> the function that created the object
              lives on the prototype, so <code>obj.constructor</code> resolves
              through the chain.
            </li>
            <li>
              <strong>Object.create(proto):</strong> builds an object whose
              prototype is <code>proto</code> without calling a constructor.
            </li>
            <li>
              <strong>End of chain:</strong> the last object in the chain has a
              null prototype, so lookups on it return undefined.
            </li>
          </ul>
        </>
      ),
    },
  },
);
