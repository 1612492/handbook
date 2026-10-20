import { BoxModelStage } from "@/components/visualizer/stages/BoxModelStage";
import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  content: {
    label: "Content box",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
  padding: {
    label: "Padding box",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
  border: {
    label: "Border box",
    className: "border-rose-500/40 bg-rose-500/5 dark:bg-rose-500/10",
    dotClassName: "bg-rose-500",
  },
  margin: {
    label: "Margin box",
    className: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    dotClassName: "bg-amber-500",
  },
};

export const cssBoxModelTopic = defineStepTopic<ContainerId>(
  {
    id: "css-box-model",
    category: "css",
    title: "CSS Box Model",
    description:
      "See how content, padding, border and margin add up, and what box-sizing changes.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "CSS Box Model Visualizer",
    subtitle:
      "Watch each layer add to the element's final size, layer by layer.",
    outputLabel: "Size",
    quizPrompt: "Predict: which box layer comes next?",
    language: "css",
    stage: BoxModelStage,
    footer: {
      title: "What is the CSS box model?",
      body: (
        <>
          <p>
            Every element is drawn as a rectangular stack of boxes: the content,
            then padding, then the border, then the margin. Understanding the
            model explains most sizing surprises.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>content-box (default):</strong> width and height apply to
              the content area only, so padding and border are added on top.
            </li>
            <li>
              <strong>border-box:</strong> width and height include padding and
              border, which matches how designers think about sizes.
            </li>
            <li>
              <strong>Margin:</strong> always outside the border, and it never
              affects the element's own size, only the space around it.
            </li>
          </ul>
        </>
      ),
    },
  },
);
