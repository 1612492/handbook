import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  capture: {
    label: "Capture phase",
    className: "border-violet-500/40 bg-violet-500/5 dark:bg-violet-500/10",
    dotClassName: "bg-violet-500",
  },
  target: {
    label: "Target phase",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
  bubble: {
    label: "Bubble phase",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
  document: {
    label: "Document",
    className: "border-slate-500/40 bg-slate-500/5 dark:bg-slate-500/10",
    dotClassName: "bg-slate-500",
  },
};

export const eventPropagationTopic = defineStepTopic<ContainerId>(
  {
    id: "event-propagation",
    category: "javascript",
    title: "Event Propagation",
    description:
      "Watch an event travel down the tree, hit its target, and bubble back up.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "Event Propagation Visualizer",
    subtitle:
      "Follow the capture, target and bubble phases, and see why delegation works.",
    outputLabel: "Event log",
    quizPrompt: "Predict: which phase does the event reach next?",
    footer: {
      title: "What is event delegation and bubbling?",
      body: (
        <>
          <p>
            When an event fires on an element, the browser first runs the
            capture listeners from the root down to the target, then the
            listeners on the target, then the bubble listeners back up to the
            root.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Delegation:</strong> one listener on a common parent
              handles events for many children, including children added later.
            </li>
            <li>
              <strong>event.target:</strong> the element the event started on;
              <code>event.currentTarget</code> is the element whose listener is
              running.
            </li>
            <li>
              <strong>stopPropagation():</strong> stops the event from
              continuing to the next phase or ancestor.
            </li>
          </ul>
        </>
      ),
    },
  },
);
