import { AnimatePresence, motion } from "motion/react";
import type { ContainerId } from "@/features/topics/css-flexbox/model";
import { cn } from "@/lib/utils";
import type { StageProps } from "../step-visualizer/types";
import { StageChips, StageShell } from "./parts";

const ITEM_SIZES: Record<string, string> = {
  "item-a": "flex-1",
  "item-b": "flex-2",
  "item-c": "w-16",
};

/**
 * Renders a flex container with items on a main axis, highlighting the axis or
 * sizing rule the current step is about.
 */
export function FlexboxStage({
  step,
  containerDefs,
  reduced,
}: StageProps<ContainerId>) {
  const focus: ContainerId =
    step.focus === "none" ? "main" : (step.focus as ContainerId);
  const chips = step.containers[focus].map((chip) => chip.label);
  const items = step.containers.main.map((chip) => chip.label);

  return (
    <StageShell title="Flex container">
      <div className="relative rounded-xl border border-border/70 bg-background/60 p-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
            main axis
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="mt-2 flex min-h-[7rem] items-stretch gap-2 rounded-lg border border-dashed border-border/70 p-2">
          {items.length === 0 ? (
            <p className="m-auto text-xs text-muted-foreground">no items yet</p>
          ) : (
            items.map((item) => (
              <motion.div
                key={item}
                layout={!reduced}
                className={cn(
                  "flex items-center justify-center rounded-lg border border-primary/50 bg-primary/10 px-2 text-xs font-semibold",
                  ITEM_SIZES[item] ?? "flex-1",
                )}
              >
                {item}
              </motion.div>
            ))
          )}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="h-8 w-px bg-border" />
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
            cross axis
          </span>
          <span className="h-px flex-1 bg-border" />
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
