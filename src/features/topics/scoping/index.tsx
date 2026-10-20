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
  functionScope: {
    label: "Function scope (var)",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
  blockScope: {
    label: "Block scope (let / const)",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
  loopScope: {
    label: "Loop scope",
    className: "border-violet-500/40 bg-violet-500/5 dark:bg-violet-500/10",
    dotClassName: "bg-violet-500",
  },
};

export const scopingTopic = defineStepTopic<ContainerId>(
  {
    id: "scoping",
    category: "javascript",
    title: "Scoping",
    description:
      "See where a binding lives: global, function, block, or per-iteration scope.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "Scoping Visualizer",
    subtitle:
      "Track where each variable is declared and which scope the engine reads it from.",
    outputLabel: "Observed value",
    quizPrompt: "Predict: which scope holds the next binding?",
    footer: {
      title: "How does JavaScript scope work?",
      body: (
        <>
          <p>
            JavaScript uses lexical scoping: the scope of a variable is decided
            by where it is written, not by where the code runs. Every function,
            block, and loop creates a scope that can shadow outer ones.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>var:</strong> function scoped. It ignores blocks and
              loops, and it is redeclarable.
            </li>
            <li>
              <strong>let / const:</strong> block scoped. A loop with `let`
              creates a fresh binding for every iteration.
            </li>
            <li>
              <strong>Shadowing:</strong> an inner declaration of the same name
              hides the outer one for the rest of that scope.
            </li>
          </ul>
        </>
      ),
    },
  },
);
