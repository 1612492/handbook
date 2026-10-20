import type { Example } from "./model";

/**
 * Work out which container gains a chip between two consecutive steps. Falls
 * back to the next step's focus when no chip is added.
 */
export function getNextDestination<C extends string>(
  example: Example<C>,
  fromIndex: number,
  containers: readonly C[],
): C | null {
  if (fromIndex < 0 || fromIndex >= example.steps.length - 1) return null;
  const a = example.steps[fromIndex].containers;
  const b = example.steps[fromIndex + 1].containers;
  for (const cid of containers) {
    const before = new Set(a[cid].map((chip) => chip.id));
    for (const chip of b[cid]) {
      if (!before.has(chip.id)) return cid;
    }
  }
  const focus = example.steps[fromIndex + 1].focus;
  return focus !== "none" ? focus : null;
}
