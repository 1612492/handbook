import { describe, expect, it } from "vitest";
import type { Example } from "./model";

/**
 * Shared quiz assertions. Each topic's `quiz.test.ts` calls this so every
 * topic is checked the same way.
 */
export function describeQuizBehaviour<C extends string>(
  examples: Example<C>[],
  containers: readonly C[],
  getNext: (example: Example<C>, fromIndex: number) => C | null,
) {
  describe("getNextDestination", () => {
    it("returns null at the last step", () => {
      for (const example of examples) {
        expect(getNext(example, example.steps.length - 1)).toBeNull();
      }
    });

    it("returns a known container for every transition", () => {
      for (const example of examples) {
        for (let index = 0; index < example.steps.length - 1; index++) {
          const destination = getNext(example, index);
          expect(destination).not.toBeNull();
          expect(containers).toContain(destination);
        }
      }
    });
  });
}
