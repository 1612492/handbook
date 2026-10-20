import { GridStage } from "@/components/visualizer/stages/GridStage";
import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  rows: {
    label: "Rows",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
  columns: {
    label: "Columns",
    className: "border-cyan-500/40 bg-cyan-500/5 dark:bg-cyan-500/10",
    dotClassName: "bg-cyan-500",
  },
  placement: {
    label: "Placement",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
  areas: {
    label: "Areas",
    className: "border-violet-500/40 bg-violet-500/5 dark:bg-violet-500/10",
    dotClassName: "bg-violet-500",
  },
};

export const cssGridTopic = defineStepTopic<ContainerId>(
  {
    id: "css-grid",
    category: "css",
    title: "CSS Grid",
    description:
      "See rows and columns form the grid, and how items are placed into it.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "CSS Grid Visualizer",
    subtitle:
      "Watch tracks form, items get placed, and named areas lay out the page.",
    outputLabel: "Layout",
    quizPrompt: "Predict: which grid concept comes next?",
    language: "css",
    stage: GridStage,
    footer: {
      title: "How does CSS Grid work?",
      body: (
        <>
          <p>
            Grid lays out items into rows and columns. The tracks are defined
            explicitly or inferred, and items are either auto placed or
            positioned by line numbers or named areas.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>fr:</strong> a flexible unit that shares the leftover
              space between tracks.
            </li>
            <li>
              <strong>grid-column / grid-row:</strong> place an item on a
              specific line.
            </li>
            <li>
              <strong>grid-template-areas:</strong> draw the layout as a text
              grid, which is readable and easy to change.
            </li>
          </ul>
        </>
      ),
    },
  },
);
