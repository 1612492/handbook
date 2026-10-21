import { AnimatePresence, motion } from "motion/react";
import type { ContainerId } from "@/features/topics/css-box-model/model";
import { cn } from "@/lib/utils";
import type { StageProps } from "../step-visualizer/types";
import { StageChips, StageShell } from "./parts";

const LAYER_ORDER: ContainerId[] = ["margin", "border", "padding", "content"];

const LAYER_STYLE: Record<ContainerId, string> = {
  margin:
    "border-dashed border-amber-500/60 bg-amber-500/5 dark:bg-amber-500/5",
  border:
    "border-solid border-2 border-rose-500/60 bg-rose-500/5 dark:bg-rose-500/5",
  padding:
    "border-solid border-2 border-emerald-500/60 bg-emerald-500/5 dark:bg-emerald-500/5",
  content:
    "border-solid border-2 border-blue-500/60 bg-blue-500/5 dark:bg-blue-500/5",
};

const LAYER_LABEL: Record<ContainerId, string> = {
  margin: "margin",
  border: "border",
  padding: "padding",
  content: "content",
};

/**
 * Renders the box model as nested layers. The focused layer is highlighted and
 * shows the values that belong to it.
 */
export function BoxModelStage({
  step,
  containerDefs,
  reduced,
}: StageProps<ContainerId>) {
  const focus: ContainerId =
    step.focus === "none" ? "content" : (step.focus as ContainerId);
  const chips = step.containers[focus].map((chip) => chip.label);

  const renderLayer = (id: ContainerId, children: React.ReactNode) => {
    const active = id === focus;
    return (
      <motion.div
        key={id}
        layout={!reduced}
        className={cn(
          "relative rounded-xl border p-3 transition-colors",
          LAYER_STYLE[id],
          active ? "ring-2 ring-primary/70" : "opacity-70",
        )}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {LAYER_LABEL[id]}
        </p>
        <AnimatePresence>
          {active ? (
            <motion.div
              key="chips"
              initial={reduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2"
            >
              <StageChips labels={chips} />
            </motion.div>
          ) : null}
        </AnimatePresence>
        {children}
      </motion.div>
    );
  };

  let nested: React.ReactNode = renderLayer("content", null);
  for (let index = LAYER_ORDER.length - 2; index >= 0; index--) {
    nested = renderLayer(LAYER_ORDER[index], nested);
  }

  return (
    <StageShell title="Box model layers">
      <div className="space-y-2">{nested}</div>
      <p className="mt-3 text-xs text-muted-foreground">
        Highlighted layer:{" "}
        <span className="font-medium text-foreground">
          {containerDefs[focus].label}
        </span>
      </p>
    </StageShell>
  );
}
