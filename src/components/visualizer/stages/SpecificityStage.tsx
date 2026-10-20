import { AnimatePresence, motion } from "motion/react";
import type { ContainerId } from "@/features/topics/css-specificity/model";
import { cn } from "@/lib/utils";
import type { StageProps } from "../step-visualizer/types";
import { StageChips, StageShell } from "./parts";

const COLUMNS: { id: ContainerId; letter: string; hint: string }[] = [
  { id: "inline", letter: "a", hint: "inline styles" },
  { id: "id", letter: "b", hint: "id selectors" },
  { id: "class", letter: "c", hint: "classes, attributes, pseudo-classes" },
  { id: "type", letter: "d", hint: "tags and pseudo-elements" },
];

/**
 * Renders the specificity matrix (a, b, c, d) and highlights the column the
 * current step is talking about.
 */
export function SpecificityStage({
  step,
  containerDefs,
  reduced,
}: StageProps<ContainerId>) {
  const focus: ContainerId =
    step.focus === "none" ? "id" : (step.focus as ContainerId);
  const chips = step.containers[focus].map((chip) => chip.label);

  return (
    <StageShell title="Specificity matrix">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {COLUMNS.map((column) => {
          const active = column.id === focus;
          return (
            <motion.div
              key={column.id}
              layout={!reduced}
              className={cn(
                "rounded-xl border p-3",
                active
                  ? "border-primary/70 bg-primary/5 ring-2 ring-primary/40"
                  : "border-border/70 bg-muted/20 opacity-70",
              )}
            >
              <p className="font-mono text-lg font-semibold">{column.letter}</p>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {column.hint}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {step.containers[column.id].map((chip) => (
                  <span
                    key={chip.id}
                    className="rounded border border-border/70 bg-background/80 px-1.5 py-0.5 text-xs"
                  >
                    {chip.label}
                  </span>
                ))}
              </div>
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
          className="mt-3"
        >
          <StageChips labels={chips} />
        </motion.div>
      </AnimatePresence>
      <p className="mt-3 text-xs text-muted-foreground">
        Compared column by column, left to right. Highlighting:{" "}
        <span className="font-medium text-foreground">
          {containerDefs[focus].label}
        </span>
      </p>
    </StageShell>
  );
}
