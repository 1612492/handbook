import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  input: {
    label: "Operands",
    className: "border-slate-500/40 bg-slate-500/5 dark:bg-slate-500/10",
    dotClassName: "bg-slate-500",
  },
  primitive: {
    label: "ToPrimitive",
    className: "border-cyan-500/40 bg-cyan-500/5 dark:bg-cyan-500/10",
    dotClassName: "bg-cyan-500",
  },
  string: {
    label: "ToString",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
  number: {
    label: "ToNumber",
    className: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    dotClassName: "bg-amber-500",
  },
  result: {
    label: "Result",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
};

export const coercionTopic = defineStepTopic<ContainerId>(
  {
    id: "coercion",
    category: "javascript",
    title: "Type Coercion",
    description:
      "See how `==` converts values before comparing them, and how `===` refuses to.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "Type Coercion Visualizer",
    subtitle:
      "Follow ToPrimitive, ToString and ToNumber through a loose equality check.",
    outputLabel: "Comparison result",
    quizPrompt: "Predict: which conversion stage comes next?",
    footer: {
      title: "What is the difference between `==` and `===`?",
      body: (
        <>
          <p>
            <code>===</code> compares without any conversion: same type and same
            value. <code>==</code> uses abstract equality, which converts
            operands until the types match.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>ToPrimitive:</strong> objects are converted with
              <code>valueOf()</code> then <code>toString()</code>.
            </li>
            <li>
              <strong>ToNumber:</strong> strings are parsed numerically; an
              empty string becomes 0.
            </li>
            <li>
              <strong>Special case:</strong> <code>null == undefined</code> is
              the one loose comparison that succeeds without converting
              anything.
            </li>
          </ul>
        </>
      ),
    },
  },
);
