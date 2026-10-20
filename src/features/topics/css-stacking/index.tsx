import { StackingStage } from "@/components/visualizer/stages/StackingStage";
import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  context: {
    label: "Stacking context",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
  zIndex: {
    label: "z-index",
    className: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    dotClassName: "bg-amber-500",
  },
  paint: {
    label: "Paint order",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
  composited: {
    label: "Composited layer",
    className: "border-violet-500/40 bg-violet-500/5 dark:bg-violet-500/10",
    dotClassName: "bg-violet-500",
  },
};

export const cssStackingTopic = defineStepTopic<ContainerId>(
  {
    id: "css-stacking",
    category: "css",
    title: "CSS Stacking Context",
    description:
      "See how stacking contexts trap z-index and decide which element paints on top.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "CSS Stacking Context Visualizer",
    subtitle:
      "Watch z-index get trapped inside a context and the paint order follow.",
    outputLabel: "Stacking",
    quizPrompt: "Predict: which stacking concept comes next?",
    language: "css",
    stage: StackingStage,
    footer: {
      title: "How does z-index and stacking work?",
      body: (
        <>
          <p>
            Elements are painted in layers. A stacking context groups those
            layers, and the z-index of a child is only meaningful inside its own
            context.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>z-index:</strong> only applies to positioned elements and
              flex or grid items.
            </li>
            <li>
              <strong>Creates a context:</strong> position with a z-index,
              transform, filter, opacity below 1, isolation, and more.
            </li>
            <li>
              <strong>Paint order:</strong> within a context, negative z-index
              children paint first, then the background, then the content, then
              positioned children by z-index.
            </li>
          </ul>
        </>
      ),
    },
  },
);
