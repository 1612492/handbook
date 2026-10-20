import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  sync: {
    label: "Synchronous execution",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
  suspended: {
    label: "Suspended function",
    className: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    dotClassName: "bg-amber-500",
  },
  microtask: {
    label: "Microtask queue",
    className: "border-violet-500/40 bg-violet-500/5 dark:bg-violet-500/10",
    dotClassName: "bg-violet-500",
  },
  resumed: {
    label: "Resumed execution",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
};

export const asyncAwaitTopic = defineStepTopic<ContainerId>(
  {
    id: "async-await",
    category: "javascript",
    title: "Async / Await",
    description:
      "See how await suspends a function and resumes it from the microtask queue.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "Async / Await Visualizer",
    subtitle:
      "Watch an async function suspend at an await and resume one microtask later.",
    outputLabel: "Output",
    quizPrompt: "Predict: which stage does the function reach next?",
    footer: {
      title: "How does async / await work?",
      body: (
        <>
          <p>
            <code>async</code> functions always return a promise.
            <code>await</code> pauses the function until the awaited value
            settles, then resumes it in a microtask.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Desugaring:</strong> <code>await x</code> is roughly
              <code>return x.then(resume)</code>.
            </li>
            <li>
              <strong>Always deferred:</strong> code after an await never runs
              in the same tick, even when the value is already available.
            </li>
            <li>
              <strong>try / catch:</strong> a rejected awaited promise throws
              inside the async function, so it can be caught like any other
              error.
            </li>
          </ul>
        </>
      ),
    },
  },
);
