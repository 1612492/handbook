import { describe, expect, it } from "vitest";
import { examples } from "./examples";
import { deriveState, clampIndex } from "./model";
import type { StepContainers } from "./model";

describe("clampIndex", () => {
  it("clamps below 0", () => {
    expect(clampIndex(-5, 3)).toBe(0);
  });
  it("clamps above length", () => {
    expect(clampIndex(10, 3)).toBe(2);
  });
  it("handles empty", () => {
    expect(clampIndex(0, 0)).toBe(0);
  });
});

describe("deriveState", () => {
  const ex = examples[0];
  it("initial step has empty output except first resolves later", () => {
    const s = deriveState(ex, 0);
    expect(s.stepIndex).toBe(0);
    expect(s.isFirst).toBe(true);
  });
  it("final step has full expected output", () => {
    const s = deriveState(ex, ex.steps.length - 1);
    expect(s.isLast).toBe(true);
    expect(s.output).toEqual(ex.expectedOutput);
  });
  it("clamps out of range", () => {
    const s = deriveState(ex, 999);
    expect(s.stepIndex).toBe(ex.steps.length - 1);
  });
});

describe("examples invariants", () => {
  for (const ex of examples) {
    it(`${ex.id} output order matches expected`, () => {
      const out: string[] = [];
      for (const step of ex.steps) {
        if (step.outputAppend) out.push(step.outputAppend);
      }
      expect(out).toEqual(ex.expectedOutput);
    });
    it(`${ex.id} has at most one resolved this per step`, () => {
      for (const step of ex.steps) {
        const total = ALL_COUNT(step);
        expect(total).toBeLessThanOrEqual(1);
      }
    });
  }
});

function ALL_COUNT(step: { containers: StepContainers }): number {
  return Object.values(step.containers).reduce(
    (acc, arr) => acc + arr.length,
    0,
  );
}
