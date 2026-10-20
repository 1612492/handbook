import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { StageProps } from "./types";

const CHIP_COLORS = [
  "border-blue-500/40 bg-blue-500/15 text-blue-700 dark:text-blue-300",
  "border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  "border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300",
  "border-rose-500/40 bg-rose-500/15 text-rose-700 dark:text-rose-300",
  "border-violet-500/40 bg-violet-500/15 text-violet-700 dark:text-violet-300",
  "border-cyan-500/40 bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",
];

export function chipColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return CHIP_COLORS[hash % CHIP_COLORS.length];
}

export function ContainerStage<C extends string>({
  step,
  containers,
  containerDefs,
  reduced,
  lastAction,
}: StageProps<C>) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3",
        containers.length > 4 && "sm:grid-cols-3",
      )}
    >
      {containers.map((cid) => {
        const def = containerDefs[cid];
        return (
          <div
            key={cid}
            className={cn(
              "flex min-h-[7rem] flex-col gap-2 rounded-2xl border p-3",
              def.className,
            )}
          >
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <span className={cn("size-2 rounded-full", def.dotClassName)} />
              {def.label}
            </p>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {step.containers[cid].map((chip) => (
                  <motion.div
                    key={chip.id}
                    layoutId={chip.id}
                    layout={!reduced}
                    initial={
                      reduced ? false : { opacity: 0, scale: 0.85, y: 6 }
                    }
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -6 }}
                    transition={
                      reduced || lastAction === "seek"
                        ? { duration: 0 }
                        : {
                            layout: {
                              type: "tween",
                              duration: 0.3,
                              ease: "easeInOut",
                            },
                            default: {
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                            },
                          }
                    }
                    className={cn(
                      "min-w-[4.5rem] rounded-lg border px-3 py-2 text-sm font-semibold shadow-sm",
                      chipColor(chip.id),
                    )}
                  >
                    {chip.label}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}
