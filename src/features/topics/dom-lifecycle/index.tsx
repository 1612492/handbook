import type { ContainerDef } from "@/components/visualizer/step-visualizer";
import { defineStepTopic } from "../shared/define-step-topic";
import { examples, getExample } from "./examples";
import { ALL_CONTAINERS, type ContainerId } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  parsing: {
    label: "Parsing",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
  domContentLoaded: {
    label: "DOMContentLoaded",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
  loadEvent: {
    label: "load event",
    className: "border-violet-500/40 bg-violet-500/5 dark:bg-violet-500/10",
    dotClassName: "bg-violet-500",
  },
  readyState: {
    label: "document.readyState",
    className: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    dotClassName: "bg-amber-500",
  },
};

export const domLifecycleTopic = defineStepTopic<ContainerId>(
  {
    id: "dom-lifecycle",
    category: "html",
    title: "Document Lifecycle",
    description:
      "See the document go from parsing to DOMContentLoaded to load, and how readyState changes.",
  },
  {
    containers: ALL_CONTAINERS,
    containerDefs: CONTAINER_DEFS,
    examples,
    getExample,
    getNextDestination,
    heading: "Document Lifecycle Visualizer",
    subtitle:
      "Follow the parser, the DOMContentLoaded event, the load event, and readyState.",
    outputLabel: "Event log",
    quizPrompt: "Predict: which lifecycle stage comes next?",
    footer: {
      title: "DOMContentLoaded vs load",
      body: (
        <>
          <p>
            <code>DOMContentLoaded</code> fires when the HTML has been parsed
            and deferred scripts have run. <code>load</code> fires later, once
            images, stylesheets and other subresources have finished.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>readyState:</strong> "loading" while parsing,
              "interactive" after the DOM is ready, "complete" after everything
              loads.
            </li>
            <li>
              <strong>defer:</strong> scripts run in order before
              DOMContentLoaded.
            </li>
            <li>
              <strong>async:</strong> scripts run as soon as they arrive, which
              can be before or after DOMContentLoaded.
            </li>
          </ul>
        </>
      ),
    },
  },
);
