import { AnimatePresence, motion } from "motion/react";
import type { ContainerId } from "@/features/topics/css-grid/model";
import { cn } from "@/lib/utils";
import type { StageProps } from "../step-visualizer/types";
import { StageChips, StageShell } from "./parts";

const CELL_LABELS = ["1", "2", "3", "4"];

/**
 * Renders a two-by-two grid, marking the cell the current placement targets.
 */
export function GridStage({
  step,
  containerDefs,
  reduced,
}: StageProps<ContainerId>) {
  const focus: ContainerId =
    step.focus === "none" ? "rows" : (step.focus as ContainerId);
  const chips = step.containers[focus].map((chip) => chip.label);
  const placement = step.containers.placement.map((chip) => chip.label);
  const highlighted = placement[0];

  return (
    <StageShell title="Grid tracks">
      <div className="rounded-xl border border-border/70 bg-background/60 p-3">
        <div className="grid grid-cols-2 gap-2">
          {CELL_LABELS.map((cell) => {
            const active =
              highlighted !== undefined && highlighted.endsWith(cell);
            return (
              <motion.div
                key={cell}
                layout={!reduced}
                className={cn(
                  "flex h-20 items-center justify-center rounded-lg border text-xs font-semibold",
                  active
                    ? "border-primary/70 bg-primary/15 ring-2 ring-primary/40"
                    : "border-border/70 bg-muted/20 opacity-70",
                )}
              >
                {active ? highlighted : `cell ${cell}`}
              </motion.div>
            );
          })}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
          <p>
            rows:{" "}
            {step.containers.rows.map((chip) => chip.label).join(", ") || "—"}
          </p>
          <p>
            columns:{" "}
            {step.containers.columns.map((chip) => chip.label).join(", ") ||
              "—"}
          </p>
          <p className="col-span-2">
            areas:{" "}
            {step.containers.areas.map((chip) => chip.label).join(", ") || "—"}
          </p>
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
