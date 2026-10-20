import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  global: {
    label: "Global scope",
    className: "border-slate-500/40 bg-slate-500/5 dark:bg-slate-500/10",
    dotClassName: "bg-slate-500",
  },
  outer: {
    label: "Outer function scope",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
  inner: {
    label: "Inner function scope",
    className: "border-cyan-500/40 bg-cyan-500/5 dark:bg-cyan-500/10",
    dotClassName: "bg-cyan-500",
  },
  closure: {
    label: "Closure environment",
    className: "border-violet-500/40 bg-violet-500/5 dark:bg-violet-500/10",
    dotClassName: "bg-violet-500",
  },
};

export const closuresTopic = defineStepTopic<ContainerId>(
  {
    id: "closures",
    category: "javascript",
    title: "Closures",
    description:
      "See how an inner function captures variables from its enclosing scopes.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "Closures Visualizer",
    subtitle:
      "Step through examples and watch variables get captured by an inner function.",
    outputLabel: "Resolved value",
    quizPrompt: "Predict: which scope holds the next value?",
    footer: {
      title: "What is a closure?",
      body: (
        <>
          <p>
            A closure is the combination of a function and the lexical
            environment in which that function was created. The inner function
            keeps a reference to the variables it uses, so they survive even
            after the outer function has returned.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Lexical scoping:</strong> a binding is resolved by where
              the code is written, not by where it is called from.
            </li>
            <li>
              <strong>Capture:</strong> only the variables the inner function
              actually references are captured.
            </li>
            <li>
              <strong>Private state:</strong> each call to a factory creates a
              fresh environment, which is the basis of the module pattern.
            </li>
          </ul>
        </>
      ),
    },
  },
);
