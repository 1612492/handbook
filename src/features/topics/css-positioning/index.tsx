import { PositioningStage } from "@/components/visualizer/stages/PositioningStage";
import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  static: {
    label: "static",
    className: "border-slate-500/40 bg-slate-500/5 dark:bg-slate-500/10",
    dotClassName: "bg-slate-500",
  },
  relative: {
    label: "relative",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
  absolute: {
    label: "absolute",
    className: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    dotClassName: "bg-amber-500",
  },
  fixed: {
    label: "fixed",
    className: "border-violet-500/40 bg-violet-500/5 dark:bg-violet-500/10",
    dotClassName: "bg-violet-500",
  },
};

export const cssPositioningTopic = defineStepTopic<ContainerId>(
  {
    id: "css-positioning",
    category: "css",
    title: "CSS Positioning",
    description:
      "Compare static, relative, absolute and fixed placement, and what anchors each one.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "CSS Positioning Visualizer",
    subtitle:
      "See which element each scheme is placed against, and what happens to the flow.",
    outputLabel: "Scheme",
    quizPrompt: "Predict: which positioning scheme comes next?",
    language: "css",
    stage: PositioningStage,
    footer: {
      title: "What is the difference between relative, absolute and fixed?",
      body: (
        <>
          <p>
            The <code>position</code> property decides how an element is placed
            and what it is positioned against.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>static:</strong> the default. The element follows the
              normal flow and ignores top, left, right and bottom.
            </li>
            <li>
              <strong>relative:</strong> the element is offset from where it
              would have been, without affecting the layout around it.
            </li>
            <li>
              <strong>absolute:</strong> the element is removed from the flow
              and positioned against its nearest positioned ancestor.
            </li>
            <li>
              <strong>fixed:</strong> positioned against the viewport, so it
              does not move when the page scrolls.
            </li>
          </ul>
        </>
      ),
    },
  },
);
