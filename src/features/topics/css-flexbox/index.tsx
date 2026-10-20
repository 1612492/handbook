import { FlexboxStage } from "@/components/visualizer/stages/FlexboxStage";
import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  main: {
    label: "Main axis",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
  cross: {
    label: "Cross axis",
    className: "border-cyan-500/40 bg-cyan-500/5 dark:bg-cyan-500/10",
    dotClassName: "bg-cyan-500",
  },
  grow: {
    label: "flex-grow",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
  shrink: {
    label: "flex-shrink",
    className: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    dotClassName: "bg-amber-500",
  },
};

export const cssFlexboxTopic = defineStepTopic<ContainerId>(
  {
    id: "css-flexbox",
    category: "css",
    title: "CSS Flexbox",
    description:
      "See how items are placed on the main axis and how grow and shrink share the space.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "CSS Flexbox Visualizer",
    subtitle: "Watch items line up on the main axis and share the free space.",
    outputLabel: "Layout",
    quizPrompt: "Predict: which flex rule comes next?",
    language: "css",
    stage: FlexboxStage,
    footer: {
      title: "How does Flexbox lay out items?",
      body: (
        <>
          <p>
            A flex container places its items along a main axis and a cross
            axis. The main axis depends on <code>flex-direction</code>; row is
            the default.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>flex-grow:</strong> how much of the free space each item
              claims.
            </li>
            <li>
              <strong>flex-shrink:</strong> how much an item gives up when the
              content overflows.
            </li>
            <li>
              <strong>flex-basis:</strong> the starting main size before growing
              or shrinking.
            </li>
            <li>
              <strong>align-items:</strong> controls the cross axis, and
              defaults to stretch.
            </li>
          </ul>
        </>
      ),
    },
  },
);
