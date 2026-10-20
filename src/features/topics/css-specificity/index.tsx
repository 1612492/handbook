import { SpecificityStage } from "@/components/visualizer/stages/SpecificityStage";
import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  inline: {
    label: "a — inline styles",
    className: "border-rose-500/40 bg-rose-500/5 dark:bg-rose-500/10",
    dotClassName: "bg-rose-500",
  },
  id: {
    label: "b — id selectors",
    className: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    dotClassName: "bg-amber-500",
  },
  class: {
    label: "c — classes and attributes",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
  type: {
    label: "d — types and pseudo-elements",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
};

export const cssSpecificityTopic = defineStepTopic<ContainerId>(
  {
    id: "css-specificity",
    category: "css",
    title: "CSS Specificity",
    description:
      "Score selectors with the a,b,c,d matrix and see which declaration wins.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "CSS Specificity Visualizer",
    subtitle:
      "Score each selector column by column and watch the cascade pick a winner.",
    outputLabel: "Specificity",
    quizPrompt: "Predict: which column does the next selector score in?",
    language: "css",
    stage: SpecificityStage,
    footer: {
      title: "How is specificity calculated?",
      body: (
        <>
          <p>
            Specificity is a four column matrix, compared from left to right.
            The first column that differs decides the winner.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>a:</strong> inline styles.
            </li>
            <li>
              <strong>b:</strong> id selectors.
            </li>
            <li>
              <strong>c:</strong> classes, attribute selectors and
              pseudo-classes.
            </li>
            <li>
              <strong>d:</strong> type selectors and pseudo-elements.
            </li>
            <li>
              <strong>Ties:</strong> when specificity is equal, the later rule
              in the stylesheet wins.
            </li>
          </ul>
        </>
      ),
    },
  },
);
