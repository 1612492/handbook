import { describe, expect, it } from "vitest";
import {
  clampIndex,
  deriveState,
  emptyContainers,
  makeContainers,
  type Example,
} from "./model";

const CONTAINERS = ["a", "b", "c"] as const;
type C = (typeof CONTAINERS)[number];

const example: Example<C> = {
  id: "demo",
  title: "Demo",
  code: "line",
  expectedOutput: ["one", "two"],
  steps: [
    {
      id: "s1",
      activeLine: 1,
      narration: "first",
      containers: makeContainers(CONTAINERS, { a: ["x"] }),
      outputAppend: "one",
      focus: "a",
    },
    {
      id: "s2",
      activeLine: 1,
      narration: "second",
      containers: makeContainers(CONTAINERS, { a: ["x"], b: ["y"] }),
      outputAppend: "two",
      focus: "b",
    },
  ],
};

describe("clampIndex", () => {
  it("clamps below zero", () => {
    expect(clampIndex(-4, 3)).toBe(0);
  });
  it("clamps above the last index", () => {
    expect(clampIndex(10, 3)).toBe(2);
  });
  it("handles an empty collection", () => {
    expect(clampIndex(2, 0)).toBe(0);
  });
});

describe("deriveState", () => {
  it("reports the first step", () => {
    const state = deriveState(example, 0);
    expect(state.stepIndex).toBe(0);
    expect(state.isFirst).toBe(true);
    expect(state.output).toEqual(["one"]);
  });
  it("accumulates output through the final step", () => {
    const state = deriveState(example, example.steps.length - 1);
    expect(state.isLast).toBe(true);
    expect(state.output).toEqual(example.expectedOutput);
  });
  it("clamps an out-of-range index", () => {
    expect(deriveState(example, 99).stepIndex).toBe(example.steps.length - 1);
  });
});

describe("makeContainers", () => {
  it("creates an entry for every container", () => {
    const containers = makeContainers(CONTAINERS, { b: ["y"] });
    expect(containers.a).toEqual([]);
    expect(containers.b).toEqual([{ id: "y", label: "y" }]);
    expect(containers.c).toEqual([]);
  });
  it("emptyContainers returns all keys", () => {
    expect(Object.keys(emptyContainers(CONTAINERS))).toEqual([...CONTAINERS]);
  });
});
