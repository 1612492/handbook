import {
  ContainerStage,
  StepVisualizer,
  type ContainerDef,
  type StepVisualizerConfig,
} from "@/components/visualizer/step-visualizer";
import { examples, getExample } from "@/features/topics/this-binding/examples";
import {
  ALL_CONTAINERS,
  type ContainerId,
} from "@/features/topics/this-binding/model";
import { getNextDestination } from "@/features/topics/this-binding/quiz";

const CONTAINER_DEFS: Record<ContainerId, ContainerDef> = {
  global: {
    label: "Global / undefined",
    className: "border-slate-500/40 bg-slate-500/5 dark:bg-slate-500/10",
    dotClassName: "bg-slate-500",
  },
  implicit: {
    label: "Implicit (base)",
    className: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    dotClassName: "bg-blue-500",
  },
  explicit: {
    label: "Explicit (bound)",
    className: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    dotClassName: "bg-emerald-500",
  },
  newInstance: {
    label: "new instance",
    className: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    dotClassName: "bg-amber-500",
  },
  lexical: {
    label: "Lexical (arrow)",
    className: "border-violet-500/40 bg-violet-500/5 dark:bg-violet-500/10",
    dotClassName: "bg-violet-500",
  },
};

const config: StepVisualizerConfig<ContainerId> = {
  containers: ALL_CONTAINERS,
  containerDefs: CONTAINER_DEFS,
  examples,
  getExample,
  getNextDestination,
  heading: "How `this` Works Visualizer",
  subtitle:
    "Step through curated examples and see which binding rule resolves `this`.",
  outputLabel: "Resolved `this`",
  quizPrompt: "Predict: which binding target resolves the next `this`?",
  footer: {
    title: "Explain how `this` works in JavaScript",
    body: (
      <>
        <p>
          There is no simple explanation for `this`; it is one of the most
          confusing concepts in JavaScript. A hand-wavey explanation is that the
          value of `this` depends on how the function is called. The following
          rules are applied (higher rules win):
        </p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>
            If the `new` keyword is used when calling the function, `this`
            inside the function is a brand new object.
          </li>
          <li>
            If `apply`, `call`, or `bind` are used to call/create a function,
            `this` inside the function is the object passed in as the argument.
          </li>
          <li>
            If a function is called as a method, such as `obj.method()`, `this`
            is the object that the function is a property of.
          </li>
          <li>
            If a function is invoked as a free function, `this` is the global
            object (or `undefined` in strict mode).
          </li>
          <li>If multiple of the above rules apply, the higher rule wins.</li>
          <li>
            If the function is an arrow function, it ignores all the rules above
            and receives the `this` value of its surrounding scope at the time
            it is created.
          </li>
        </ol>
      </>
    ),
  },
  stage: ContainerStage,
};

export function ThisBindingVisualizer() {
  return <StepVisualizer config={config} />;
}
