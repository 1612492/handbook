import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  tdz: {
    label: "Temporal dead zone",
    className: "border-rose-500/40 bg-rose-500/5 dark:bg-rose-500/10",
    dotClassName: "bg-rose-500",
  },
  hoisted: {
    label: "Hoisted declaration",
    className: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    dotClassName: "bg-amber-500",
  },
  initialized: {
    label: "Initialised binding",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
  executed: {
    label: "Executed statement",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
};

export const hoistingTopic = defineStepTopic<ContainerId>(
  {
    id: "hoisting",
    category: "javascript",
    title: "Hoisting",
    description:
      "Follow declarations as they move to the top of a scope and hit the temporal dead zone.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "Hoisting Visualizer",
    subtitle:
      "Watch declarations hoist, bindings initialise, and the temporal dead zone appear.",
    outputLabel: "Observed value",
    quizPrompt: "Predict: where does the next binding move?",
    footer: {
      title: "What is hoisting?",
      body: (
        <>
          <p>
            Hoisting describes what the engine does with declarations before
            your code runs. Declarations are processed when the scope is
            entered, so bindings exist earlier than the line that declares them.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>var:</strong> the declaration is hoisted and initialised
              to undefined, so reading it early gives undefined.
            </li>
            <li>
              <strong>function declarations:</strong> the whole function is
              hoisted, so it can be called before its definition.
            </li>
            <li>
              <strong>let / const:</strong> hoisted but left uninitialised,
              which creates the temporal dead zone. Touching them early throws a
              ReferenceError.
            </li>
          </ul>
        </>
      ),
    },
  },
);
