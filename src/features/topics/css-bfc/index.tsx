import { BfcStage } from "@/components/visualizer/stages/BfcStage";
import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  flow: {
    label: "Normal flow",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
  float: {
    label: "Float",
    className: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    dotClassName: "bg-amber-500",
  },
  bfc: {
    label: "Block formatting context",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
  cleared: {
    label: "Cleared",
    className: "border-violet-500/40 bg-violet-500/5 dark:bg-violet-500/10",
    dotClassName: "bg-violet-500",
  },
};

export const cssBfcTopic = defineStepTopic<ContainerId>(
  {
    id: "css-bfc",
    category: "css",
    title: "Block Formatting Context",
    description:
      "See how floats escape their parent, and how a BFC contains them again.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "Block Formatting Context Visualizer",
    subtitle:
      "Watch floats leave the flow and see what a BFC and clear do about it.",
    outputLabel: "Layout",
    quizPrompt: "Predict: which formatting context comes next?",
    language: "css",
    stage: BfcStage,
    footer: {
      title: "What is a block formatting context?",
      body: (
        <>
          <p>
            A block formatting context is a region where block boxes are laid
            out independently of the outside, and where floats are contained and
            margins do not collapse through the boundary.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Creates a BFC:</strong> float, position absolute or fixed,
              display inline-block, display flow-root, overflow other than
              visible, and more.
            </li>
            <li>
              <strong>Contains floats:</strong> the parent finally wraps the
              floated child instead of collapsing.
            </li>
            <li>
              <strong>Stops margin collapsing:</strong> margins of children no
              longer collapse with the parent.
            </li>
            <li>
              <strong>display: flow-root:</strong> the modern,
              intention-revealing way to create a BFC.
            </li>
          </ul>
        </>
      ),
    },
  },
);
