import { AnimatePresence, motion } from "motion/react";
import type { ContainerId } from "@/features/topics/css-stacking/model";
import { cn } from "@/lib/utils";
import type { StageProps } from "../step-visualizer/types";
import { StageChips, StageShell } from "./parts";

/**
 * Renders overlapping layers inside a stacking context so the paint order and
 * the effect of z-index are visible.
 */
export function StackingStage({
  step,
  containerDefs,
  reduced,
}: StageProps<ContainerId>) {
  const focus: ContainerId =
    step.focus === "none" ? "context" : (step.focus as ContainerId);
  const chips = step.containers[focus].map((chip) => chip.label);
  const zIndexes = step.containers.zIndex.map((chip) => chip.label);

  return (
    <StageShell title="Stacking context">
      <div className="relative min-h-[13rem] rounded-xl border border-border/70 bg-background/60 p-3">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
          stacking context (root)
        </p>
        <div className="relative mt-2 h-32 w-full">
          {zIndexes.map((label, index) => {
            const active = label === focus;
            return (
              <motion.div
                key={label}
                layout={!reduced}
                className={cn(
                  "absolute flex h-20 w-32 items-center justify-center rounded-lg border text-xs font-semibold",
                  active
                    ? "border-primary/70 bg-primary/15 ring-2 ring-primary/40"
                    : "border-border/70 bg-muted/30 opacity-80",
                )}
                style={{ left: `${index * 2.5}rem`, top: `${index * 1.25}rem` }}
              >
                {label}
              </motion.div>
            );
          })}
        </div>
        <AnimatePresence>
          <motion.div
            key="chips"
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2"
          >
            <StageChips labels={chips} />
          </motion.div>
        </AnimatePresence>
        <p className="mt-3 text-xs text-muted-foreground">
          Highlighting:{" "}
          <span className="font-medium text-foreground">
            {containerDefs[focus].label}
          </span>
        </p>
      </div>
    </StageShell>
  );
}
