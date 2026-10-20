import { AnimatePresence, motion } from "motion/react";
import type { ContainerId } from "@/features/topics/css-positioning/model";
import { cn } from "@/lib/utils";
import type { StageProps } from "../step-visualizer/types";
import { StageChips, StageShell } from "./parts";

const CHILD_STYLE: Record<ContainerId, string> = {
  static: "left-8 top-8",
  relative: "left-16 top-16",
  absolute: "left-8 top-8",
  fixed: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
};

const CHILD_POSITION: Record<ContainerId, string> = {
  static: "static",
  relative: "relative",
  absolute: "absolute",
  fixed: "fixed",
};

/**
 * Renders a positioned parent and a child element, showing how the child's
 * placement changes between the four positioning schemes.
 */
export function PositioningStage({
  step,
  containerDefs,
  reduced,
}: StageProps<ContainerId>) {
  const focus: ContainerId =
    step.focus === "none" ? "static" : (step.focus as ContainerId);
  const chips = step.containers[focus].map((chip) => chip.label);

  return (
    <StageShell title="Positioning schemes">
      <div className="relative min-h-[16rem] overflow-hidden rounded-xl border border-border/70 bg-background/60 p-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          viewport
        </p>
        <div className="relative mt-2 h-40 w-full rounded-lg border border-dashed border-border/70 bg-muted/30">
          <p className="absolute left-2 top-1 text-[10px] uppercase tracking-wide text-muted-foreground">
            parent (position: relative)
          </p>
          <div className="absolute left-4 top-6 h-16 w-24 rounded-lg border border-border/70 bg-background/70" />
          <motion.div
            layout={!reduced}
            className={cn(
              "absolute flex size-16 items-center justify-center rounded-lg border border-primary/60 bg-primary/15 text-xs font-semibold",
              CHILD_STYLE[focus],
            )}
          >
            child
          </motion.div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded bg-muted px-1.5 py-0.5 font-mono">
            position: {CHILD_POSITION[focus]}
          </span>
          <span className="text-muted-foreground">
            {focus === "static" && "stays in the normal flow"}
            {focus === "relative" &&
              "offset from its own position, space is kept"}
            {focus === "absolute" &&
              "positioned against the nearest positioned ancestor"}
            {focus === "fixed" &&
              "positioned against the viewport, even when scrolled"}
          </span>
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
          Highlighted scheme:{" "}
          <span className="font-medium text-foreground">
            {containerDefs[focus].label}
          </span>
        </p>
      </div>
    </StageShell>
  );
}
