import { describe, expect, it } from "vitest";
import { makeContainers, type Example } from "./model";
import { getNextDestination } from "./quiz";

const CONTAINERS = ["a", "b", "c"] as const;
type C = (typeof CONTAINERS)[number];

const example: Example<C> = {
  id: "demo",
  title: "Demo",
  code: "line",
  expectedOutput: [],
  steps: [
    {
      id: "s1",
      activeLine: 1,
      narration: "first",
      containers: makeContainers(CONTAINERS, { a: ["x"] }),
      focus: "a",
    },
    {
      id: "s2",
      activeLine: 1,
      narration: "second",
      containers: makeContainers(CONTAINERS, { a: ["x"], c: ["z"] }),
      focus: "c",
    },
    {
      id: "s3",
      activeLine: 1,
      narration: "third",
      containers: makeContainers(CONTAINERS, { a: ["x"], c: ["z"] }),
      focus: "b",
    },
  ],
};

describe("getNextDestination", () => {
  it("finds the container that gained a chip", () => {
    expect(getNextDestination(example, 0, CONTAINERS)).toBe("c");
  });
  it("falls back to focus when no chip was added", () => {
    expect(getNextDestination(example, 1, CONTAINERS)).toBe("b");
  });
  it("returns null at the last step", () => {
    expect(getNextDestination(example, 2, CONTAINERS)).toBeNull();
  });
  it("returns null for an invalid index", () => {
    expect(getNextDestination(example, -1, CONTAINERS)).toBeNull();
  });
});
