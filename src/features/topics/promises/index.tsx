import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  pending: {
    label: "Pending",
    className: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    dotClassName: "bg-amber-500",
  },
  fulfilled: {
    label: "Fulfilled",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
  rejected: {
    label: "Rejected",
    className: "border-rose-500/40 bg-rose-500/5 dark:bg-rose-500/10",
    dotClassName: "bg-rose-500",
  },
  microtask: {
    label: "Microtask queue",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
};

export const promisesTopic = defineStepTopic<ContainerId>(
  {
    id: "promises",
    category: "javascript",
    title: "Promises",
    description:
      "See promise states, chaining, and error propagation as the microtask queue drains.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "Promises Visualizer",
    subtitle:
      "Watch promises settle, chain, and schedule their continuations as microtasks.",
    outputLabel: "Settled value",
    quizPrompt: "Predict: where does the promise go next?",
    footer: {
      title: "What is a promise?",
      body: (
        <>
          <p>
            A promise is a value that is not ready yet. It starts pending and
            settles exactly once, either fulfilled with a value or rejected with
            a reason.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>then / catch / finally:</strong> each returns a new
              promise, which is what makes chains possible.
            </li>
            <li>
              <strong>Microtask timing:</strong> callbacks run in the microtask
              queue, so they always run before the next task.
            </li>
            <li>
              <strong>Error propagation:</strong> a rejection travels down the
              chain until a <code>catch</code> handles it.
            </li>
          </ul>
        </>
      ),
    },
  },
);
