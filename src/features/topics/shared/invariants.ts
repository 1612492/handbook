import { describe, expect, it } from "vitest";
import type { Example } from "./model";

/**
 * Shared invariants every curated example set must satisfy. Each topic's
 * `model.test.ts` calls this so the rules stay identical across topics.
 */
export function describeExampleInvariants<C extends string>(
  examples: Example<C>[],
  containers: readonly C[],
) {
  describe("example invariants", () => {
    for (const example of examples) {
      it(`${example.id} produces its expected output in order`, () => {
        const output: string[] = [];
        for (const step of example.steps) {
          if (step.outputAppend) output.push(step.outputAppend);
        }
        expect(output).toEqual(example.expectedOutput);
      });

      it(`${example.id} has at least one step`, () => {
        expect(example.steps.length).toBeGreaterThan(0);
      });

      it(`${example.id} focuses a known container on every step`, () => {
        for (const step of example.steps) {
          expect(step.focus === "none" || containers.includes(step.focus)).toBe(
            true,
          );
        }
      });

      it(`${example.id} has an entry for every container on every step`, () => {
        for (const step of example.steps) {
          for (const cid of containers) {
            expect(Array.isArray(step.containers[cid])).toBe(true);
          }
        }
      });
    }
  });
}
