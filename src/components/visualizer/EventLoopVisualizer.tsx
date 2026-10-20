import {
  ContainerStage,
  StepVisualizer,
  type ContainerDef,
  type StepVisualizerConfig,
} from "@/components/visualizer/step-visualizer";
import { examples, getExample } from "@/features/topics/event-loop/examples";
import {
  ALL_CONTAINERS,
  type ContainerId,
} from "@/features/topics/event-loop/model";
import { getNextDestination } from "@/features/topics/event-loop/quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  stack: {
    label: "Call Stack",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
  webApis: {
    label: "Web APIs",
    className: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    dotClassName: "bg-amber-500",
  },
  microtask: {
    label: "Microtask Queue",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
  task: {
    label: "Task Queue",
    className: "border-rose-500/40 bg-rose-500/5 dark:bg-rose-500/10",
    dotClassName: "bg-rose-500",
  },
};

const config: StepVisualizerConfig<ContainerId> = {
  containers: ALL_CONTAINERS,
  containerDefs: CONTAINER_DEFS,
  examples,
  getExample,
  getNextDestination,
  heading: "Event Loop Visualizer",
  subtitle:
    "Step through curated examples and watch items move between queues.",
  outputLabel: "Output",
  quizPrompt: "Predict: where does the next item go?",
  footer: {
    title: "What is the event loop?",
    body: (
      <>
        <p>
          The event loop is what allows JavaScript to perform non-blocking I/O
          operations despite being single-threaded. It monitors the call stack
          and the task queues, pushing queued callbacks onto the stack when it
          is empty.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Call stack:</strong> where function calls are pushed and
            popped (LIFO). Synchronous code runs to completion here.
          </li>
          <li>
            <strong>Web APIs:</strong> browser-provided APIs (setTimeout, fetch,
            DOM events) that handle async work off the stack.
          </li>
          <li>
            <strong>Microtask queue:</strong> high-priority queue for Promise
            callbacks and `queueMicrotask`. It is drained fully before the next
            macrotask.
          </li>
          <li>
            <strong>Task (macrotask) queue:</strong> setTimeout/setInterval
            callbacks, I/O, UI events. Only one task runs per loop turn.
          </li>
        </ul>
        <p>
          Key rule: once the call stack is empty, the event loop drains ALL
          microtasks, then runs ONE macrotask, then repeats (rendering in
          between). This is why microtasks always finish before the next
          macrotask.
        </p>
      </>
    ),
  },
  stage: ContainerStage,
};

export function EventLoopVisualizer() {
  return <StepVisualizer config={config} />;
}
