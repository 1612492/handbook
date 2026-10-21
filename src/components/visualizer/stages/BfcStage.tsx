import { AnimatePresence, motion } from "motion/react";
import type { ContainerId } from "@/features/topics/css-bfc/model";
import { cn } from "@/lib/utils";
import type { StageProps } from "../step-visualizer/types";
import { StageChips, StageShell } from "./parts";

/**
 * Renders a parent box with a floated child, showing how a block formatting
 * context contains the float.
 */
export function BfcStage({
  step,
  containerDefs,
  reduced,
}: StageProps<ContainerId>) {
  const focus: ContainerId =
    step.focus === "none" ? "flow" : (step.focus as ContainerId);
  const chips = step.containers[focus].map((chip) => chip.label);
  const contained = step.containers.bfc.length > 0;
  const floated = step.containers.float.length > 0;

  return (
    <StageShell title="Block formatting context">
      <div className="rounded-xl border border-border/70 bg-background/60 p-3">
        <div
          className={cn(
            "relative min-h-[9rem] rounded-lg border-2 p-3",
            contained
              ? "border-emerald-500/60 bg-emerald-500/5 dark:bg-emerald-500/5"
              : "border-dashed border-border/70 bg-muted/20",
          )}
        >
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            parent {contained ? "(establishes a BFC)" : "(no BFC)"}
          </p>
          {floated ? (
            <motion.div
              layout={!reduced}
              className="mt-2 float-left mr-2 h-12 w-20 rounded-lg border border-amber-500/60 bg-amber-500/15 dark:bg-amber-500/15 text-xs"
            >
              <span className="p-1">float</span>
            </motion.div>
          ) : null}
          <motion.div
            layout={!reduced}
            className={cn(
              "mt-2 h-16 rounded-lg border border-blue-500/50 bg-blue-500/10 dark:bg-blue-500/10 text-xs",
              contained ? "ml-24" : "ml-0",
            )}
          >
            <span className="p-1">content</span>
          </motion.div>
        </div>
        <AnimatePresence>
          <motion.div
            key="chips"
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3"
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
